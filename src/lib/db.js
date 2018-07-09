import PouchDB from 'pouchdb'
import PouchDBUpsert from 'pouchdb-upsert'
import PouchDBFind from 'pouchdb-find'
import { Platform } from 'quasar'
import merge from 'lodash/merge'
import log from 'lib/log'

PouchDB.plugin(PouchDBUpsert)
PouchDB.plugin(PouchDBFind)

const options = {
  revs_limit: 1,
  auto_compaction: true
}

if (Platform.is.cordova) {
  options.adapter = 'cordova-sqlite' // SQLite for Cordova
} else {
  // IndexedDB for Browser, LevelDB for Electron
}

PouchDB.defaults(options)

PouchDB.plugin({
  async printInfo () {
    this.info().then(info => {
      log.info('db info', info)
    })
  },

  async save (doc) {
    if (doc._id) {
      await this.upsert(doc._id, d => {
        merge(d, doc)
        return d
      })
    } else {
      await this.post(doc)
    }
  }
})

export default PouchDB

export const walletDB = new PouchDB('wallet')
export const keystoreDB = new PouchDB('keystore')

walletDB.printInfo()
keystoreDB.printInfo()
