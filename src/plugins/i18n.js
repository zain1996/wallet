import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { default as Quasar, Platform } from 'quasar'
import axios from 'axios'
import en from 'i18n/en'
import store from 'store'
import bwc from 'lib/bitcoin/bwc'

Vue.use(VueI18n)

export const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: { en }
})

export default ({ app }) => {
  app.i18n = i18n
}

const loadedLanguages = ['en']

async function setI18nLanguage (lang) {
  i18n.locale = lang
  axios.defaults.headers.common['Accept-Language'] = lang
  document.querySelector('html').setAttribute('lang', lang)

  const qlang = {
    'en': 'en-us',
    'zh-CN': 'zh-hans'
  }[lang]
  import(`quasar-framework/i18n/${qlang}`).then(lang => {
    Quasar.i18n.set(lang.default)
  }) // ignore quasar lang nonexistence
  return lang
}

export async function setLanguage (lang) {
  if (i18n.locale !== lang) {
    if (!loadedLanguages.includes(lang)) {
      return import(/* webpackChunkName: "lang-[request]" */ `i18n/${lang}`).then(msgs => {
        i18n.setLocaleMessage(lang, msgs.default)
        loadedLanguages.push(lang)
        return setI18nLanguage(lang)
      })
    }
    return Promise.resolve(setI18nLanguage(lang))
  }
  return Promise.resolve(lang)
}

async function loadLanguage () {
  await store.dispatch('setting/loadSetting')
  let lang = store.state.setting.language
  if (!lang) {
    for (lang of navigator.languages) {
      bwc.setLanguage(lang) // TODO: remove

      if (lang === 'zh') lang = 'zh-CN'

      try {
        await setLanguage(lang)
        await store.dispatch('setting/updateSetting', { language: lang })
        break
      } catch (e) {
      }
    }
    if (!lang) {
      console.log('') // TODO
    }
  } else {
    await setLanguage(lang)
  }
}

if (Platform.is.cordova) {
  document.addEventListener('deviceready', async () => {
    await loadLanguage()
  }, false)
} else {
  loadLanguage()
}
