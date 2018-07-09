class LocalStorageKV {
  prefix

  constructor (name) {
    if (window.localStorage === undefined) throw new Error('localstorage not available')
    if (!name) throw new Error('kv storage empty name')
    this.prefix = name + '-'
  }

  _getKey (key) {
    return this.prefix + key
  }

  set (key, value) {
    localStorage.setItem(this._getKey(key), JSON.stringify(value))
  }

  get (key) {
    return JSON.parse(localStorage.getItem(this._getKey(key))) // even if not found, json parse null to null
  }

  remove (key) {
    localStorage.removeItem(this._getKey(key))
  }

  keys () {
    const allKeys = Object.keys(localStorage)
    const keys = []
    for (const k of allKeys) {
      if (k.startsWith(this.prefix)) keys.push(k.substr(this.prefix.length))
    }
    return keys
  }

  clear () {
    this.keys().forEach(k => {
      this.remove(k)
    })
  }
}

export default LocalStorageKV
