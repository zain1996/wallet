import CoinomiRates from './coinomi'

// TODO: should consider more exchange rates sources, not only coinomi
class ExchangeRates extends CoinomiRates {
  async toFiat (coinAmount, coin, fiat) {
    return coinAmount * await super.coinToFiat(coin, fiat)
  }

  async toCoin (fiatAmount, fiat, coin) {
    return fiatAmount * await super.fiatToCoin(fiat, coin)
  }
}

export default new ExchangeRates()
