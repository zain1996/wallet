class Dir {
  dirEntry

  constructor (dirEntry) {
    this.dirEntry = dirEntry
  }

  static async create (dir) {
    return new Promise((resolve, reject) => {
      window.resolveLocalFileSystemURL(dir, dirEntry => {
        resolve(new Dir(dirEntry))
      }, reject)
    })
  }

  async listEntries () {
    return new Promise((resolve, reject) => {
      this.dirEntry.readEntries(entries => {
        const result = entries.map(entry => ({
          name: entry.name,
          isDirectory: entry.isDirectory
        }))
        resolve(result)
      }, reject)
    })
  }
}

export default Dir
