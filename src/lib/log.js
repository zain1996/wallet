import { Platform } from 'quasar'
import File from './cordova/file'
import config from '../config'

class Logger {
  queue = []
  ongoing = false
  file
  level = 0

  DEBUG = 0
  INFO = 1
  WARN = 2
  ERROR = 3

  setLevel (level) {
    this.level = level
  }

  debug (...args) {
    if (this.level > this.DEBUG) return
    this.log('DEBUG', ...args)
  }

  info (...args) {
    if (this.level > this.INFO) return
    this.log('INFO', ...args)
  }

  warn (...args) {
    if (this.level > this.WARN) return
    this.log('WARN', ...args)
  }

  error (...args) {
    if (this.level > this.ERROR) return
    this.log('ERROR', ...args)
  }

  log (level, ...args) {
    console.log(...args) // always log to console

    const timestamp = new Date().toLocaleString()

    const msg = args.map(arg => {
      try {
        arg = JSON.stringify(arg)
        if (arg === undefined) arg = 'undefined'
      } catch (e) {
        console.log('Error occurred when log:', e)
        arg = 'undefined'
      }
      return arg
    }).join(' ')

    const entry = `[${timestamp}] ${level}: ${msg}`
    this.queue.push(entry)

    if (!this.ongoing) this._persist()
  }

  _persist () {
    if (!this.queue.length) {
      this.ongoing = false
      return
    }

    this.ongoing = true

    const msg = this.queue.shift()

    setTimeout(() => {
      this._write(msg).catch(() => {
        // swallow
      }).then(() => {
        setTimeout(() => {
          this._persist()
        }, 0)
      })
    }, 0)
  }

  async _write (msg) {
    if (Platform.is.cordova) {
      if (!this.file) this.file = await File.create(config.cordova.logPath)
      await this.file._write(msg)
    } else if (Platform.is.electron) {
      // TODO
    }
  }
}

export default new Logger()
