import scrypt from 'scrypt-async'
import nacl from 'tweetnacl'
import bitcore from 'bitcore-lib'
import Mnemonic from 'bitcore-mnemonic'
import Transaction from 'ethereumjs-tx'
import util from 'ethereumjs-util'
import { ec as EC } from 'elliptic'
import CryptoJS from 'crypto-js'

import signing from './signing'

const Random = bitcore.crypto.Random
const Hash = bitcore.crypto.Hash

const ec = new EC('secp256k1')

function strip0x (input) {
  if (input.length >= 2 && input.startsWith('0x')) return input.slice(2)
  return input
}

function add0x (input) {
  if (input.length < 2 || !input.startsWith('0x')) return '0x' + input
  return input
}

function encodeHex (uint8Array) {
  const base64 = nacl.util.encodeBase64(uint8Array)
  return Buffer.from(base64, 'base64').toString('hex')
}

function decodeHex (hex) {
  const base64 = Buffer.from(hex, 'hex').toString('base64')
  return nacl.util.decodeBase64(base64)
}

function concatAndSha256 (entropyBuf0, entropyBuf1) {
  const totalEnt = Buffer.concat([entropyBuf0, entropyBuf1])
  if (totalEnt.length !== entropyBuf0.length + entropyBuf1.length) throw new Error('concatenation of entropy sources failed')
  return Hash.sha256(totalEnt)
}

function generateSalt (byteCount) {
  return bitcore.crypto.Random.getRandomBuffer(byteCount || 32).toString('base64')
}

function encryptString (str, derivedKey) {
  const nonce = nacl.randomBytes(nacl.secretbox.nonceLength)
  const encObj = nacl.secretbox(nacl.util.decodeUTF8(str), nonce, derivedKey)
  return {
    'encStr': nacl.util.encodeBase64(encObj),
    'nonce': nacl.util.encodeBase64(nonce)
  }
}

function decryptString (encryptedStr, derivedKey) {
  const secretbox = nacl.util.decodeBase64(encryptedStr.encStr)
  const nonce = nacl.util.decodeBase64(encryptedStr.nonce)

  const decryptedStr = nacl.secretbox.open(secretbox, nonce, derivedKey)
  if (decryptedStr === undefined) throw new Error('decryption failed')

  return nacl.util.encodeUTF8(decryptedStr)
}

function encryptKey (privKey, derivedKey) {
  const privKeyArray = decodeHex(privKey)

  const nonce = nacl.randomBytes(nacl.secretbox.nonceLength)
  const encKey = nacl.secretbox(privKeyArray, nonce, derivedKey)

  return {
    'key': nacl.util.encodeBase64(encKey),
    'nonce': nacl.util.encodeBase64(nonce)
  }
}

function decryptKey (encryptedKey, pwDerivedKey) {
  const secretbox = nacl.util.decodeBase64(encryptedKey.key)
  const nonce = nacl.util.decodeBase64(encryptedKey.nonce)

  const decryptedKey = nacl.secretbox.open(secretbox, nonce, pwDerivedKey)
  if (decryptedKey === undefined) throw new Error('decryption failed')

  return encodeHex(decryptedKey)
}

class KeyStore {
  static HDPATH = {
    ETH: "m/44'/60'/0'/0"
  }

  encSeed
  encHdRootPriv
  encPrivKeys
  addresses
  hdPathString
  salt
  hdIndex
  version

  constructor () {
  }

  static passwordProvider () {
    return prompt('Enter password to continue', 'Enter password')
  }

  hasAddress (address) {
    return strip0x(address) in this.encPrivKeys
  }

  // like `web3.eth.accounts.signTransaction`
  async signTransaction (txParams, password) {
    const ethjsTxParams = {
      from: add0x(txParams.from),
      to: add0x(txParams.to),
      gasLimit: add0x(txParams.gas),
      gasPrice: add0x(txParams.gasPrice),
      nonce: add0x(txParams.nonce),
      value: add0x(txParams.value),
      data: add0x(txParams.data),
      chainId: txParams.chainId // EIP 155 chainId: mainnet: 1, ropsten: 3
    }

    const signingAddress = strip0x(txParams.from)

    const tx = new Transaction(ethjsTxParams)

    if (!password) password = this.passwordProvider()

    const privKey = await this.exportPrivateKey(signingAddress, password)

    tx.sign(new Buffer(privKey, 'hex'))

    const signedTx = tx.serialize().toString('hex')
    return add0x(signedTx)
  }

  // like `web3.eth.accounts.hashMessage`
  static hashMessage (message) {
    return util.hashPersonalMessage(message)
  }

  // like `web3.eth.accounts.sign`
  async sign (message, address, password) {
    const privKey = await this.exportPrivateKey(address, password)
    const messageHash = KeyStore.hashMessage(message)
    return {
      message,
      messageHash,
      ...util.ecsign(msgHash, privKey)
    }
  }

  validateDerivedKey (derivedKey) {
    try {
      const paddedSeed = decryptString(this.encSeed, derivedKey)
      return paddedSeed.length > 0
    } catch {
      return false
    }
  }

  async validatePassword (password) {
    const derivedKey = await this.keyFromPassword(password)
    return this.validateDerivedKey(derivedKey)
  }

  async generateNewAddress (password, n = 1) {
    const derivedKey = await this.keyFromPassword(password)

    if (!this.validateDerivedKey(derivedKey)) throw new Error('wrong password')

    const hdRoot = decryptString(this.encHdRootPriv, derivedKey)
    if (!hdRoot) throw new Error('wrong password')

    for (let i = 0; i < n; ++i) {
      const hdprivkey = new bitcore.HDPrivateKey(hdRoot).derive(this.hdIndex++)
      const privkeyBuf = hdprivkey.privateKey.toBuffer()
      let privkeyHex = privkeyBuf.toString('hex')
      if (privkeyBuf.length < 16) {
        throw new Error('private key suspiciously small: < 16 bytes')
      } else if (privkeyBuf.length < 32) {
        // Pad private key if too short
        // bitcore has a bug where it sometimes returns
        // truncated keys
        privkeyHex = privkeyBuf.toString('hex').padStart(64, '0')
      } else if (privkeyBuf.length > 32) {
        throw new Error('private key larger than 32 bytes')
      }

      const encPrivKey = encryptKey(privkeyHex, derivedKey)
      const address = KeyStore.computeAddressFromPrivKey(privkeyHex)

      this.encPrivKeys[address] = encPrivKey
      this.addresses.push(address)
    }
  }

  async getSeed (password) {
    const derivedKey = await this.keyFromPassword(password)
    const paddedSeed = decryptString(this.encSeed, derivedKey)
    return paddedSeed.trim()
  }

  getAddresses () {
    return this.addresses.map(addr => add0x(addr))
  }

  async exportPrivateKey (address, password) {
    const derivedKey = await this.keyFromPassword(password)

    if (!this.validateDerivedKey(derivedKey)) throw new Error('wrong password')

    address = strip0x(address).toLowerCase()
    const encPrivKey = this.encPrivKeys[address]
    if (!encPrivKey) throw new Error('address not found in keystore')
    return decryptKey(encPrivKey, derivedKey)
  }

  async keyFromPassword (password) {
    return KeyStore.deriveKeyFromPasswordAndSalt(password, this.salt)
  }

  serialize () {
    return JSON.stringify({
      'encSeed': this.encSeed,
      'encHdRootPriv': this.encHdRootPriv,
      'encPrivKeys': this.encPrivKeys,
      'addresses': this.addresses,
      'hdPathString': this.hdPathString,
      'salt': this.salt,
      'hdIndex': this.hdIndex,
      'version': this.version
    })
  }

  deserialize (keystore) {
    const ks = JSON.parse(keystore)
    if (ks.version !== 3) throw new Error('only version 3 keystore is supported')

    this.encSeed = ks.encSeed
    this.encHdRootPriv = ks.encHdRootPriv
    this.encPrivKeys = ks.encPrivKeys
    this.addresses = ks.addresses
    this.hdPathString = ks.hdPathString
    this.salt = ks.salt
    this.hdIndex = ks.hdIndex
    this.version = ks.version

    return this
  }

  static from (keystore) {
    return new KeyStore().deserialize(keystore)
  }

  static async createVault ({ password, mnemonic, salt, hdPath }) {
    if (!password) throw new Error('password must be set')
    if (!hdPath) throw new Error('hdPath must be set')

    if (!mnemonic) mnemonic = KeyStore.generateRandomSeed()

    const words = mnemonic.split(' ')
    if (!Mnemonic.isValid(mnemonic, Mnemonic.Words.ENGLISH) || words.length !== 12) throw new Error('invalid mnemonic')

    if (!salt) salt = generateSalt(32)

    const derivedKey = await KeyStore.deriveKeyFromPasswordAndSalt(password, salt)

    const ks = new KeyStore()
    ks.salt = salt
    ks.hdPathString = hdPath
    ks.version = 3
    ks.hdIndex = 0

    const paddedSeed = mnemonic.padStart(120, ' ')
    ks.encSeed = encryptString(paddedSeed, derivedKey)

    const hdRoot = new Mnemonic(mnemonic).toHDPrivateKey().xprivkey
    const hdRootKey = new bitcore.HDPrivateKey(hdRoot)
    const hdPathKey = hdRootKey.derive(hdPath).xprivkey
    ks.encHdRootPriv = encryptString(hdPathKey, derivedKey)

    ks.encPrivKeys = {}
    ks.addresses = []

    return ks
  }

  static generateRandomSeed (extraEntropy) {
    if (extraEntropy === undefined) {
      return new Mnemonic(Mnemonic.Words.ENGLISH).toString()
    } else if (typeof extraEntropy === 'string') {
      const entBuf = Buffer.from(extraEntropy)
      const randBuf = Random.getRandomBuffer(256 / 8)
      const hashedEnt = concatAndSha256(randBuf, entBuf).slice(0, 128 / 8)
      return new Mnemonic(hashedEnt, Mnemonic.Words.ENGLISH).toString()
    } else {
      throw new Error('extraEntropy is set but not a string')
    }
  }

  static async deriveKeyFromPasswordAndSalt (password, salt) {
    return new Promise(resolve => {
      scrypt(password, salt, {
        N: 16384,
        r: 8,
        p: 1,
        dkLen: 32,
        interruptStep: 200,
        encoding: 'binary' // result will be a Uint8Array
      }, resolve)
    })
  }

  static computeAddressFromPrivKey (privKey) {
    const keyPair = ec.genKeyPair()
    keyPair._importPrivate(privKey, 'hex')
    const compact = false
    const pubKey = keyPair.getPublic(compact, 'hex').slice(2)
    const pubKeyWordArray = CryptoJS.enc.Hex.parse(pubKey)
    const hash = CryptoJS.SHA3(pubKeyWordArray, { outputLength: 256 })
    return hash.toString(CryptoJS.enc.Hex).slice(24)
  }
}

export default KeyStore
