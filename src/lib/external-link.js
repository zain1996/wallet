import { Platform } from 'quasar'

export default {
  open (url) {
    if (Platform.is.electron) {
      return import('electron').then(({ shell }) => {
        shell.openExternal(url)
      })
    } else if (Platform.is.cordova) {
      return Promise.resolve(window.open(url, '_system'))
    } else {
      return Promise.resolve(window.open(url, '_blank'))
    }
  }
}
