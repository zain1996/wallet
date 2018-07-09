import path from '../path'

class File {
  fileEntry

  constructor (fileEntry) {
    this.fileEntry = fileEntry
  }

  static async create (dir, filename = null) {
    if (!filename) { // if `dir` is actually a file path
      dir = path.dirname(dir)
      filename = path.basename(dir)
    }
    return new Promise((resolve, reject) => {
      window.resolveLocalFileSystemURL(dir, dirEntry => {
        console.log('local file path:', dirEntry.toURL)

        dirEntry.getFile(filename, {create: true, exclusive: false}, fileEntry => {
          resolve(new File(fileEntry))
        }, err => {
          console.log('could not create local file:', filename, ', err:', err)
          reject(err)
        })
      }, err => {
        console.log('could not resolve local file url:', dir, ', err:', err)
        reject(err)
      })
    })
  }

  static async remove (dir, filename = null) {
    if (!filename) { // if `dir` is actually a file path
      dir = path.dirname(dir)
      filename = path.basename(dir)
    }
    return new Promise((resolve, reject) => {
      window.resolveLocalFileSystemURL(dir, dirEntry => {
        dirEntry.getFile(filename, { create: false }, fileEntry => {
          fileEntry.remove(
            // The file has been removed succesfully
            resolve,
            // Error deleting the file
            reject,
            // The file doesn't exist
            resolve
          )
        }, reject)
      })
    })
  }

  async read () {
    return new Promise((resolve, reject) => {
      this.fileEntry.file(file => {
        const reader = new FileReader()

        reader.onloadend = function () {
          resolve(this.result)
        }
        reader.onerror = reject

        reader.readAsText(file)
      }, reject)
    })
  }

  async write (data, append = true) {
    return new Promise((resolve, reject) => {
      this.fileEntry.createWriter(fileWriter => {
        if (append) fileWriter.seek(fileWriter.length)

        fileWriter.onwriteend = resolve
        fileWriter.onerror = reject

        fileWriter.write(data)
      }, reject)
    })
  }

  async truncate (size) {
    return new Promise((resolve, reject) => {
      this.fileEntry.createWriter(fileWriter => {
        fileWriter.onwriteend = resolve
        fileWriter.onerror = reject

        fileWriter.truncate(size)
      })
    })
  }
}

export default File
