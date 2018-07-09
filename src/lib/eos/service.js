import eosecc from 'eosjs-ecc'
import Wallet from 'store/wallet/wallet'
import KeyStore from 'lib/keystore'
import chainsAPI from 'lib/api/chains'
import log from 'lib/log'

const hdPath = "m/44'/194'/0'"

class Service {
  async createWallet (opts) {
    const { mnemonicLanguage, password } = opts
    const ks = await KeyStore.from({ mnemonicLanguage, password, hdPath })

    const ownerPrivKey = await ks.deriveKey(password, [0, 0])
    const activePrivKey = await ks.deriveKey(password, [1, 0])
    const ownerPubKey = eosecc.PublicKey.fromHex(ownerPrivKey.publicKey.toString()).toString()
    const activePubKey = eosecc.PublicKey.fromHex(activePrivKey.publicKey.toString()).toString()

    let req = {
      name: opts.name,
      coin: 'EOS'
    }

    if (!opts.isShared) {
      req = {
        ...req,
        public_key: activePubKey,
        extra: {
          owner_public_key: ownerPubKey,
          password_hint: opts.passwordHint
        }
      }
    } else {
      req = {
        ...req,
        m: opts.m,
        n: opts.n,
        cosigners: {
          name: opts.myName,
          public_key: activePubKey,
          extra: {
            owner_public_key: ownerPubKey,
            password_hint: opts.passwordHint
          }
        }
      }
    }

    log.debug('create wallet: request', req)
    let rep = await chainsAPI.post('/v1/wallets', req)
    rep = rep.data
    log.debug('create wallet: response', rep)

    await ks.save()

    const w = new Wallet()
    w._id = rep.id
    w.name = rep.name
    w.coin = rep.coin
    w.publicKey = rep.public_key
    w.m = rep.m
    w.n = rep.n
    w.cosigners = rep.cosigners.map(item => {
      return {
        id: item.id,
        walletID: item.wallet_id,
        name: item.name,
        publicKey: item.public_key,
        extra: item.extra,
        createdAt: item.created_at
      }
    })
    w.extra = rep.extra
    w.createdAt = rep.created_at

    w.sortNo = opts.sortNo

    await w.save()

    return {
      wallet: w,
      mnemonic: await ks.getMnemonic(password)
    }
  }

  async transfer (opts) {
  }
}

export default new Service()
