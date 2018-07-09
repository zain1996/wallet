import { Dialog } from 'quasar'
import { i18n } from 'plugins/i18n'

export default async function () {
  return Dialog.create({
    title: i18n.t('inputPassword'),
    prompt: {
      model: '',
      type: 'password'
    },
    cancel: true,
    color: 'primary'
  })
}
