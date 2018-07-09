import { i18n } from 'plugins/i18n'

function getMnemonicLang (lang) {
  const mnemonicLang = { // TODO: support more mnemonic languages?
    'en': 'english',
    'zh-CN': 'chinese',
    'fr': 'french',
    'it': 'italian',
    'ja': 'japanese',
    'es': 'spanish'
  }[lang]
  return mnemonicLang || 'english'
}

export default {
  name: 'MnemonicLangSelectMixin',

  data () {
    return {
      mnemonicLang: '',
      mnemonicLangs: []
    }
  },

  created () {
    const mnemonicLangs = i18n.vm.messages[i18n.locale].mnemonicLanguages // TODO: fallback locale?
    for (const lang of Object.keys(mnemonicLangs)) {
      this.mnemonicLangs.push({
        label: this.$t('mnemonicLanguages.' + lang),
        value: lang
      })
    }
    this.mnemonicLang = getMnemonicLang(this.$store.state.setting.language)
  }
}
