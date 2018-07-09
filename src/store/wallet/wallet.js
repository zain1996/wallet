import { walletDB } from 'lib/db'
import log from 'lib/log'

export default class Wallet {
  _id

  sortNo

  name
  coin
  publicKey

  // for multi-sig wallet
  m
  n
  cosigners

  extra = {}
  createdAt

  async save () {
    await walletDB.save(this)
  }

  static async loadAll () {
    const rep = await walletDB.find({
      selector: {
        sortNo: {$gte: null}
      },
      sort: [{sortNo: 'desc'}]
    })
    return rep.docs
  }
}

walletDB.createIndex({
  index: { fields: ['sortNo'] }
}).then(rep => {
  log.info('wallet db create index', rep)
})
