export default {
  debug: process.env.NODE_ENV !== 'production',
  chainsURL: 'https://api.wallet.cochain.io',
  bwsURL: 'https://bws.bitpay.com/bws/api',
  cordova: {
    kvPath: 'cdvfile://localhost/persistent/kv',
    logPath: 'cdvfile://localhost/persistent/log.txt'
  },
  exchangeRateUpdateInterval: 60000, // 60s
  eos: {
    chainID: '',
    infoUpdateInterval: 1000, // 1s
    txExpiration: 60000 // 60s
  }
}
