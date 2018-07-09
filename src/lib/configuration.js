import storage from './storage'
import isEmpty from 'lodash/isEmpty'
import cloneDeep from 'lodash/cloneDeep'
import merge from 'lodash/merge'
import log from './log'

class Configuration {
  loaded = false
  cfg = {}

  async load () {
    if (this.loaded) return
    this.loaded = true

    storage.load()

    this.cfg = cloneDeep(configDefault)

    const cfg = await storage.getConfig()
    if (!isEmpty(cfg)) {
      merge(this.cfg, cfg)
      this._backwardCompatibility()
    }

    log.info('Configuration loaded')
  }

  async save (newOpts) {
    if (newOpts) merge(this.cfg, newOpts)
    await storage.setConfig(this.cfg)

    log.info('Configuration saved')
  }

  get () {
    return this.cfg
  }

  _backwardCompatibility () {
  }
}

const configDefault = {
  setting: {
    language: '',
    currencyUnit: ''
  },

  limit: {
    totalCopayers: 6,
    mPlusN: 100
  },

  // wallet default config
  wallet: {
    useLegacyAddress: false,
    requiredCopayers: 2,
    totalCopayers: 3,
    totalCopayersLimit: 6,
    spendUnconfirmed: false,
    reconnectDelay: 5000,
    idleDurationMin: 4,
    settings: {
      unitName: 'BTC',
      unitToSatoshi: 100000000,
      unitDecimals: 8,
      unitCode: 'btc',
      alternativeName: 'US Dollar',
      alternativeIsoCode: 'USD',
      feeLevel: 'normal'
    }
  },

  lock: {
    method: null,
    value: null,
    bannedUntil: null
  },

  // External services
  recentTransactions: {
    enabled: true
  },

  showIntegration: {
    coinbase: true,
    glidera: true,
    debitcard: true,
    amazon: true,
    mercadolibre: true,
    shapeshift: true
  },

  rates: {
    url: 'https://insight.bitpay.com:443/api/rates'
  },

  release: {
    url: 'https://api.github.com/repos/bitpay/copay/releases/latest'
  },

  pushNotificationsEnabled: true,

  confirmedTxsNotifications: {
    enabled: true
  },

  emailNotifications: {
    enabled: false,
    email: ''
  },

  log: {
    weight: 3
  }
}

export default new Configuration()
