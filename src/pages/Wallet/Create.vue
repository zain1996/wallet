<template>
  <back-layout :title="title" class="create-wallet">
    <q-page>
      <div style="padding: 0.5rem">
      <q-field :error="$v.form.walletName.$error" :error-label="$t('error.emptyWalletName')" class="q-ma-md">
        <q-input v-model.trim="form.walletName" @blur="$v.form.walletName.$touch" :float-label="$t('walletName')" maxlength="40" />
      </q-field>

      <template v-if="isShared">
        <q-field :error="$v.form.myName.$error" :error-label="$t('error.emptyMyName')" class="q-ma-md">
          <q-input v-model.trim="form.myName" @blur="$v.form.myName.$touch" :float-label="$t('myName')" maxlength="40" />
        </q-field>
      </template>

        <q-field class="q-ma-md">
          <q-select v-model="mnemonicLang" :options="mnemonicLangs" :float-label="$t('mnemonicLanguage')"></q-select>
        </q-field>

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

      <template v-if="isShared">
        <q-field class="q-ma-md">
          <q-select v-model="totalCopayers" :options="totalCopayersOptions" :float-label="$t('totalCopayers')"></q-select>
        </q-field>
        <q-field class="q-ma-md">
          <q-select v-model="requiredCopayers" :options="requiredCopayersOptions" :float-label="$t('requiredCopayers')"></q-select>
        </q-field>
      </template>

      <q-field class="q-ma-md">
        <q-input v-model="coin" readonly :float-label="$t('coin')"
                 :after="[{icon: 'fas fa-caret-right', handler () {}}]"
                 @click="selectCoin">
        </q-input>
      </q-field>

      <q-field class="q-mx-md q-my-lg">
        <div class="row no-wrap items-center">
          <q-toggle class="text-grey ellipsis" v-model="agree" :label="$t('readAndAgree')" />
          <a href="" class="text-secondary ellipsis" style="margin-left: 0.5rem; text-decoration: none;">{{ $t('termsOfServiceAndPrivacyPolicy') }}</a>
        </div>
      </q-field>

      <div class="q-ma-md q-mt-xl">
      <q-btn color="primary" style="width: 100%; padding: 1rem" :disable="!agree"
             @click="create">{{ $t('createPersonalWallet') }}
      </q-btn>
        <q-btn flat class="text-secondary" style="width: 100%; padding: 1rem; margin-top: 1rem"
               @click="create">{{ $t('importWallet') }}
        </q-btn>
      </div>

      <select-coin-modal ref="selectCoinModal" v-model="coin"></select-coin-modal>
      </div>
    </q-page>
  </back-layout>
</template>

<script>
import range from 'lodash/range'
import { required, sameAs } from 'vuelidate/lib/validators'
import zxcvbn from 'zxcvbn'
import { zxcvbnKey, zxcvbnKeys } from 'lib/zxcvbn-convert'
import BackLayout from 'components/BackLayout'
import SelectCoinModal from 'components/SelectCoinModal'
import PasswordStrengthMeter from 'components/PasswordStrengthMeter'
import MnemonicLangSelectMixin from 'mixins/MnemonicLangSelect'
import Loading from 'components/Loading'
import Notify from 'components/Notify'
import log from 'lib/log'

// For compressed keys, m*73 + n*34 <= 496
const copayerPairLimists = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 4,
  6: 4,
  7: 3,
  8: 3,
  9: 2,
  10: 2,
  11: 1,
  12: 1
}

export default {
  name: 'CreateWallet',

  mixins: [
    MnemonicLangSelectMixin
  ],

  components: {
    BackLayout,
    SelectCoinModal,
    PasswordStrengthMeter
  },

  data () {
    return {
      form: {
        walletName: '',

        password: '',
        repeatPassword: '',
        passwordHint: '',

        // for shared wallet
        myName: ''

        // keyOption: 'Random',
        // recoveryPhrase: '',
        // derivationPath: '',
        // testnetEnabled: '',
        // singleAddress: ''
      },

      isShared: false,

      passwordScore: 0,
      passwordWarning: '',

      // for shared wallet
      totalCopayersOptions: [],
      requiredCopayersOptions: [],

      // for shared wallet
      totalCopayers: 2,
      requiredCopayers: 1,

      coin: 'EOS',

      agree: false
    }
  },

  computed: {
    title () {
      return !this.isShared ? 'createPersonalWallet' : 'createSharedWallet'
    }
  },

  validations: {
    form: {
      walletName: { required },

      password: {
        required,
        zxcvbnPassword (password) {
          const result = zxcvbn(password)

          this.passwordScore = result.score

          const warning = result.feedback.warning ? this.$t(`zxcvbn.${zxcvbnKey(result.feedback.warning)}`) : ''
          const suggestion = zxcvbnKeys(result.feedback.suggestions).map(k => this.$t(`zxcvbn.${k}`)).join('; ')
          if (suggestion && warning) this.passwordWarning = warning + ': ' + suggestion
          else this.passwordWarning = warning || suggestion || ''

          console.log('score:', result.score)
          console.log('warning:', this.passwordWarning)
          return result.score > 1
        }
      },
      repeatPassword: { sameAsPassword: sameAs('password') },

      myName: {
        requiredWhenShared (n) {
          return !this.isShared || n
        }
      }
    }
  },

  watch: {
    totalCopayers: {
      handler (tc) {
        const rcMax = copayerPairLimists[tc]
        this.requiredCopayersOptions = range(1, rcMax + 1).map(r => ({ label: r + '', value: r }))
        this.requiredCopayers = Math.min(Math.trunc(tc / 2 + 1), rcMax)
      },
      immediate: true
    }
  },

  methods: {
    create () {
      this.$v.form.$touch()
      if (this.$v.form.$error) return

      Loading.show()

      this.$store.dispatch('wallet/createWallet', {
        name: this.form.walletName,
        coin: this.coin,
        mnemonicLanguage: this.mnemonicLang,
        password: this.form.password,
        passwordHint: this.form.passwordHint,
        isShared: this.isShared,
        m: this.requiredCopayers,
        n: this.totalCopayers,
        myName: this.form.myName
      }).then(() => {
        Loading.hide()
        this.$router.replace('/wallet/backup-guide')
      }).catch(e => {
        log.error('create wallet error', e)
        Notify.remote(e)
        Loading.hide()
      })
    },

    selectCoin () {
      this.$refs.selectCoinModal.open()
    }
  },

  created () {
    this.isShared = this.$route.query.shared

    if (this.isShared) {
      this.totalCopayersOptions = range(2, this.$store.state.setting.wallet.totalCopayersLimit + 1).map(n => {
        return { label: n + '', value: n }
      })
    }
  }
}
</script>

<style lang="sass">
  .create-wallet
    .q-toggle .q-option-label
      text-overflow: ellipsis
      white-space: nowrap
      overflow: hidden
</style>
