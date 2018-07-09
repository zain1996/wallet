import { Notify } from 'quasar'
import error from 'lib/error'

export default {
  notify (msg, type = 'negative') {
    Notify.create({
      type: type,
      message: msg,
      timeout: 2000,
      position: 'top'
    })
  },

  remote (e) {
    console.log(e)
    return this.notify(error((e && e.response && e.response.data && e.response.data.code) || 0))
  }
}
