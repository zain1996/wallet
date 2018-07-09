import BWC from 'bitcore-wallet-client'
import config from '../../config'

export default {
  buildTx: BWC.buildTx,
  parseSecret: BWC.parseSecret,
  Bitcore: BWC.Bitcore,
  BitcoreCash: BWC.BitcoreCash,
  errors: BWC.errors,
  sjcl: BWC.sjcl,
  utils: BWC.Utils,

  lang: 'en',

  setLanguage (lang) {
    const mnemonicLanguages = ['en', 'es', 'ja', 'zh', 'fr', 'it']
    if (mnemonicLanguages.includes(lang)) {
      this.lang = lang
      return
    }
    for (const l of mnemonicLanguages) {
      if (lang.startsWith(l)) {
        this.lang = l
        return
      }
    }
  },

  getClient (credentials = null) {
    const bwc = new BWC({
      baseUrl: config.bwsURL,
      timeout: 100000,
      logLevel: '' // 'debug', 'info', 'log', 'warn', 'error', 'fatal'
    })

    if (credentials) bwc.import(credentials)

    return bwc
  }
}
