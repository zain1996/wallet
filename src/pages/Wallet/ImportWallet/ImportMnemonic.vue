<template>
  <div>
    <q-field class="q-ma-md">
      <q-select v-model="mnemonicLang" :options="mnemonicLangs" :float-label="$t('mnemonicLanguage')"></q-select>
    </q-field>
    <q-field class="q-ma-md">
    <q-chips-input v-model="form.mnemonic" :placeholder="$t('importMnemonicHint')" :stack-label="$t('mnemonic')">
      <q-autocomplete :debounce="0" @search="search" />
    </q-chips-input>
    </q-field>

    <div style="margin: 2.5rem 0 0 1rem" class="row items-center">
      <div style="display: inline-block; margin-right: 1rem;">{{ $t('setPassword') }}</div>
      <q-icon name="far fa-question-circle"></q-icon>
    </div>

    <q-field :error="$v.form.password.$error" :error-label="passwordWarning" class="q-ma-md">
      <div class="row no-wrap">
        <q-input class="col-9" type="password" v-model.trim="form.password" :float-label="$t('password')" @input="$v.form.password.$touch" maxlength="64" />
        <password-strength-meter class="col-3" :strength="passwordScore" v-show="form.password"></password-strength-meter>
      </div>
    </q-field>
    <q-field :error="$v.form.repeatPassword.$error" :error-label="$t('error.inconsistentPassword')" class="q-ma-md">
      <div class="row no-wrap">
        <q-input class="col-9" type="password" v-model.trim="form.repeatPassword" :float-label="$t('repeatPassword')" @blur="$v.form.repeatPassword.$touch" maxlength="64" />
      </div>
    </q-field>
    <q-field class="q-ma-md">
      <q-input v-model.trim="form.passwordHint" :float-label="$t('passwordHint')" maxlength="64" />
    </q-field>
  </div>
</template>

<script>
import words from 'bitcore-mnemonic/lib/words'
import PasswordInputMixin from 'mixins/PasswordInput'
import MnemonicLangSelectMixin from 'mixins/MnemonicLangSelect'

export default {
  name: 'ImportMnemonic',

  mixins: [
    PasswordInputMixin,
    MnemonicLangSelectMixin
  ],

  data () {
    return {
      dict: [],
      form: {
        mnemonic: []
      }
    }
  },

  watch: {
    mnemonicLang (val) {
      this.setDict(val)
    }
  },

  methods: {
    search (terms, done) {
      const token = terms.toLowerCase()
      const list = this.dict.filter(item => {
        return item.startsWith(token)
      })
      done(list.map(item => {
        return {
          label: item,
          value: item
        }
      }))
    },

    setDict (mnemonicLang) {
      console.log(mnemonicLang)
      this.dict = words[mnemonicLang.toUpperCase()]
    }
  },

  created () {
    this.setDict(this.mnemonicLang)
  }
}
</script>

<style lang="sass">
</style>
