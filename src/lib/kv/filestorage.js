import File from '../cordova/file'
import Dir from '../cordova/dir'
import path from '../path'
import config from '../../config'

class FileStorageKV {
  dir

  constructor (name) {
    this.dir = path.join(config.cordova.kvPath, name)
  }

  async set (key, value) {
    const file = await File.create(this.dir, key)
    await file.truncate(0)
    await file.write(JSON.stringify(value))
  }

  async get (key) {
    const file = await File.create(this.dir, key)
    const value = await file.read()
    if (!value) {
      await this.remove(key)
      return null
    }
    return JSON.parse(value)
  }

  async remove (key) {
    await File.remove(this.dir, key)
  }

  async keys () {
    const entries = await Dir.create(this.dir).listEntries()
    const keys = []
    for (const entry of entries) {
      if (!entry.isDirectory) keys.push(entry.name)
    }
    return keys
  }

  async clear () {
    for (const key of this.keys()) {
      await this.remove(key)
    }
  }
}

export default FileStorageKV
