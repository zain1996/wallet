import { Platform } from 'quasar'
import FileKV from './kv/filestorage'
import LocalKV from './kv/localstorage'
// import log from './log'

const CONFIG = 'config'
const PROFILE = 'profile'

class Storage {
  loaded = false
  kv

  load () {
    if (this.loaded) return
    this.loaded = true

    const name = 'persistence'

    if (Platform.is.cordova) {
      this.kv = new FileKV(name)
    } else {
      this.kv = new LocalKV(name)
    }
  }

  async getConfig () {
    return this.kv.get(CONFIG)
  }

  async setConfig (config) {
    await this.kv.set(CONFIG, config)
  }

  async clearConfig () {
    await this.kv.remove(CONFIG)
  }

  async getProfile () {
    return this.kv.get(PROFILE)
  }

  async setProfile (profile) {
    await this.kv.set(PROFILE, profile)
  }
}

export default new Storage()
