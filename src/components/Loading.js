import { Loading, QSpinnerOval } from 'quasar'

export default {
  show (delay) {
    Loading.show({
      delay: delay !== undefined ? delay : 200,
      spinner: QSpinnerOval,
      spinnerSize: 32,
      spinnerColor: '#4466B3',
      customClass: 'text-primary'
    })
  },

  hide (delay) {
    if (delay === undefined) Loading.hide()
    else {
      setTimeout(() => {
        Loading.hide()
      }, delay)
    }
  }
}
