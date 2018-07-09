import scrypt from 'scrypt-async'
import nacl from 'tweetnacl'
nacl.util = require('tweetnacl-util')
import bitcore from 'bitcore-lib'
import Mnemonic from 'bitcore-mnemonic'
import { keystoreDB } from 'lib/db'

function generateSalt (byteCount) {
  return bitcore.crypto.Random.getRandomBuffer(byteCount || 32).toString('base64')
}

function encodeHex (uint8Array) {
  const base64 = nacl.util.encodeBase64(uint8Array)
  return Buffer.from(base64, 'base64').toString('hex')
}

function decodeHex (hex) {
  const base64 = Buffer.from(hex, 'hex').toString('base64')
  return nacl.util.decodeBase64(base64)
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

export function decryptKey (encryptedKey, pwDerivedKey) {
  const secretbox = nacl.util.decodeBase64(encryptedKey.key)
  const nonce = nacl.util.decodeBase64(encryptedKey.nonce)

  const decryptedKey = nacl.secretbox.open(secretbox, nonce, pwDerivedKey)
  if (decryptedKey === undefined) throw new Error('decryption failed')

  return encodeHex(decryptedKey)
}

class KeyStore {
  _id
  version = 0
  salt
  hdPath
  encryptedMnemonic
  encryptedHDKey
  encryptedKeys = {}

  async save () {
    await keystoreDB.save(this)
  }

  static async load (id) {
    const doc = await keystoreDB.get(id)
    const ks = new KeyStore()
    ks._id = doc._id
    ks.version = doc.version
    ks.salt = doc.salt
    ks.hdPath = doc.hdPath
    ks.encryptedMnemonic = doc.encryptedMnemonic
    ks.encryptedHDKey = doc.encryptedHDKey
    ks.encryptedKeys = doc.encryptedKeys
    return ks
  }

  serialize () {
    return JSON.stringify({
      _id: this._id,
      version: this.version,
      salt: this.salt,
      hdPath: this.hdPath,
      encryptedMnemonic: this.encryptedMnemonic,
      encryptedHDKey: this.encryptedHDKey,
      encryptedKeys: this.encryptedKeys
    })
  }

  static deserialize (keystore) {
    const k = JSON.parse(keystore)
    if (k.version !== 0) throw new Error('only version 0 keystore is supported')

    const ks = new KeyStore()
    ks._id = k._id
    ks.version = k.version
    ks.salt = k.salt
    ks.hdPath = k.hdPath
    ks.encryptedMnemonic = k.encryptedMnemonic
    ks.encryptedHDKey = k.encryptedHDKey
    ks.encryptedKeys = k.encryptedKeys
    return ks
  }

  static async from ({ password, mnemonic, salt, hdPath, mnemonicLanguage }) {
    if (!password) throw new Error('password must be set')
    if (!hdPath) throw new Error('hdPath must be set')

    if (mnemonic) {
      mnemonic = new Mnemonic(mnemonic)
    } else {
      mnemonicLanguage = mnemonicLanguage.toUpperCase()
      mnemonic = new Mnemonic(Mnemonic.Words[mnemonicLanguage] || Mnemonic.Words.ENGLISH)
    }

    if (!salt) salt = generateSalt(32)

    const ks = new KeyStore()
    ks.salt = salt
    ks.hdPath = hdPath

    const derivedKey = await KeyStore.deriveKeyFromPasswordAndSalt(password, salt)

    const paddedMnemonic = mnemonic.toString().padStart(120, ' ')
    ks.encryptedMnemonic = encryptString(paddedMnemonic, derivedKey)

    const hdMasterKey = mnemonic.toHDPrivateKey()
    const hdKey = hdMasterKey.derive(hdPath).xprivkey
    ks.encryptedHDKey = encryptString(hdKey, derivedKey)

    return ks
  }

  async deriveKey (password, segments) {
    if (!segments.length) throw new Error('empty derivation path')

    const derivedKey = await this.keyFromPassword(password)
    if (!this.validateDerivedKey(derivedKey)) throw new Error('wrong password')

    let hdKey = decryptString(this.encryptedHDKey, derivedKey)
    if (!hdKey) throw new Error('wrong password')

    hdKey = new bitcore.HDPrivateKey(hdKey)
    for (let segment of segments) {
      hdKey = hdKey.derive(segment)
    }

    this.encryptedKeys[hdKey.publicKey.toString()] = encryptKey(hdKey.privateKey.toString(), derivedKey)

    return hdKey
  }

  async getMnemonic (password) {
    const derivedKey = await this.keyFromPassword(password)
    const paddedMnemonic = decryptString(this.encryptedMnemonic, derivedKey)
    return paddedMnemonic.trim()
  }

  async keyFromPassword (password) {
    return KeyStore.deriveKeyFromPasswordAndSalt(password, this.salt)
  }

  validateDerivedKey (derivedKey) {
    try {
      const paddedMnemonic = decryptString(this.encryptedMnemonic, derivedKey)
      return paddedMnemonic.length > 0
    } catch (e) {
      return false
    }
  }

  async validatePassword (password) {
    const derivedKey = await this.keyFromPassword(password)
    return this.validateDerivedKey(derivedKey)
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
}

export default KeyStore
