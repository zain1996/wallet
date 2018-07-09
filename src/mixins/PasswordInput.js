import zxcvbn from 'zxcvbn'
import { zxcvbnKey, zxcvbnKeys } from 'lib/zxcvbn-convert'
import { required, sameAs } from 'vuelidate/lib/validators'
import PasswordStrengthMeter from 'components/PasswordStrengthMeter'

export default {
  name: 'PasswordInputMixin',

  components: {
    PasswordStrengthMeter
  },

  data () {
    return {
      form: {
        password: '',
        repeatPassword: '',
        passwordHint: ''
      },
      passwordScore: 0,
      passwordWarning: ''
    }
  },

  validations: {
    form: {
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
      repeatPassword: { sameAsPassword: sameAs('password') }
    }
  }
}
