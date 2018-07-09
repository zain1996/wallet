import throttle from 'lodash/throttle'
import bwc from './bwc'
import event from 'lib/event'
import log from 'lib/log'

class Bitcoin {
  throttledHandleBwcEvent

  constructor () {
    this.throttledHandleBwcEvent = throttle((notification, wallet) => {
      this._handleBwcEvent(notification, wallet)
    }, 10000)
  }

  async createWallet (opts) {
    const wallet = this.seedWallet(opts)

    await new Promise((resolve, reject) => {
      wallet.createWallet(opts.walletName, opts.myName, opts.m, opts.n, {
        network: opts.network || 'livenet',
        singleAddress: false,
        walletPrivKey: opts.walletPrivKey, // TODO
        coin: opts.coin
      }, (err, secret) => {
        if (err) return reject(err)
        else return resolve()
      })
    })

    return wallet
  }

  seedWallet (opts) {
    const wallet = bwc.getClient()

    const network = opts.network || 'livenet'
    const account = opts.account || 0
    const derivationStrategy = opts.derivationStrategy || 'BIP44'

    if (opts.mnemonic) {
      opts.mnemonic = this._normalizeMnemonic(opts.mnemonic)
      wallet.seedFromMnemonic(opts.mnemonic, {
        network,
        account,
        derivationStrategy,
        passphrase: opts.passphrase,
        coin: opts.coin
      })
    } else if (opts.extendedPrivateKey) {
      wallet.seedFromExtendedPrivateKey(opts.extendedPrivateKey, {
        network,
        account,
        derivationStrategy,
        coin: opts.coin
      })
    } else if (opts.extendedPublicKey) {
      wallet.seedFromExtendedPublicKey(opts.extendedPublicKey, opts.externalSource, opts.entropySource, {
        account,
        derivationStrategy,
        coin: opts.coin
      })
      wallet.credentials.hwInfo = opts.hwInfo
    } else {
      wallet.seedFromRandomWithMnemonic({
        network,
        account,
        passphrase: opts.passphrase,
        coin: opts.coin,
        language: bwc.lang
      })
    }

    return wallet
  }

  _normalizeMnemonic (mnemonic) {
    const isJA = mnemonic.indexOf('\u3000') > -1
    const wordList = mnemonic.split(/[\u3000\s]+/)
    return wordList.join(isJA ? '\u3000' : ' ')
  }

  async bindWallet (wallet, walletCallback) {
    const walletID = wallet.credentials.walletId

    this._updateWalletSettings(wallet)

    wallet.removeAllListeners()

    wallet.on('notification', notification => {
      log.debug('BWC Notification:', notification)
    })

    wallet.on('walletCompleted', () => {
      log.debug('Wallet completed')
      walletCallback(wallet)
      event.emit('statusUpdated') // TODO
    })

    // Initialize notification
    await new Promise((resolve, reject) => {
      wallet.initialize({
        notificationIncludeOwn: true,
        notificationIntervalSeconds: 15
      }, resolve)
    })

    wallet.openWallet(err => {
      if (err) log.error('Wallet open:', err)
      if (wallet.status !== true) log.debug(`Wallet ${walletID} status: ${wallet.status}`)
    })

    event.on('walletUpdated', id => {
      if (id === walletID) {
        log.debug(`Wallet ${walletID} settings updated`)
        this._updateWalletSettings(wallet)
      }
    })
  }

  _handleBwcEvent (notification, wallet) {
    if (wallet.cachedStatus) wallet.cachedStatus.isValid = false
    if (wallet.completeHistory) wallet.completeHistory.isValid = false
    if (wallet.cachedActivity) wallet.cachedActivity.isValid = false
    if (wallet.cachedTxps) wallet.cachedTxps.isValid = false

    event.publish('bwsEvent', wallet.id, notification.type, notification)
  }

  _updateWalletSettings (wallet) {
    // TODO
  }
}

export default new Bitcoin()
