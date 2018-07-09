import axios from 'axios'
import config from 'config'

const toLocalURL = 'https://ticker.coinomi.net/simple/to-local/'
const toCryptoURL = 'https://ticker.coinomi.net/simple/to-crypto/'

class CoinomiRates {
  // rates cache
  toLocal = {}
  toCrypto = {}
  toLocalLastUpdated = {}
  toCryptoLastUpdated = {}

  toLocalAPI = axios.create({
    baseURL: toLocalURL,
    timeout: 10000
  })
  toCryptoAPI = axios.create({
    baseURL: toCryptoURL,
    timeout: 10000
  })

  async coinToFiat (coin, fiat = null) {
    const now = Date.now()
    const has = (coin in this.toLocal) && (now - this.toLocalLastUpdated[coin] < config.exchangeRateUpdateInterval)
    if (!has) {
      await this.toLocalAPI.get(coin).then(r => {
        this.toLocal[coin] = CoinomiRates._normalizeRates(r.data)
        this.toLocalLastUpdated[coin] = now
      })
    }
    const rateDict = this.toLocal[coin]
    return fiat ? rateDict[fiat] : rateDict
  }

  async fiatToCoin (fiat, coin = null) {
    const now = Date.now()
    const has = (fiat in this.toCrypto) && (now - this.toCryptoLastUpdated[fiat] < config.exchangeRateUpdateInterval)
    if (!has) {
      await this.toCryptoAPI.get(fiat).then(r => {
        this.toCrypto[fiat] = CoinomiRates._normalizeRates(r.data)
        this.toCryptoLastUpdated[fiat] = now
      })
    }
    const rateDict = this.toCrypto[fiat]
    return coin ? rateDict[coin] : rateDict
  }

  static _normalizeRates (rateDict) {
    delete rateDict.extras
    Object.keys(rateDict).forEach(key => {
      rateDict[key] = +rateDict[key]
    })
    return rateDict
  }
}

export default CoinomiRates
