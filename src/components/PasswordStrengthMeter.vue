<template>
  <div class="row no-wrap justify-end items-end" style="padding-bottom: 0.5rem">
    <div class="password-strength-desc text-grey">
      {{ description }}
    </div>
    <div class="password-strength-meter">
      <div v-for="index in 7" :key="index" :class="meterClass(index, strength)">
      </div>
    </div>
  </div>
</template>

<script>
const scores = [
  'scoreTooGuessable',
  'scoreVeryGuessable',
  'scoreSomewhatGuessable',
  'scoreSafelyUnguessable',
  'scoreVeryUnguessable'
]

export default {
  name: 'PasswordStrengthMeter',

  props: {
    strength: Number
  },

  computed: {
    description () {
      return this.$t(`zxcvbn.${scores[this.strength]}`)
    }
  },

  methods: {
    meterClass (index, strength) {
      if (!(index % 2)) return ''
      if (strength === 0) return 'bg-grey-4'
      const reverse = Math.trunc(4 - index / 2)
      if (reverse <= strength - 1) {
        return strength > 1 ? 'bg-secondary' : 'bg-red'
      } else {
        return 'bg-grey-4'
      }
    }
  }
}
</script>

<style lang="sass">
  .password-strength-desc
    width: 4rem
    font-size: 0.875rem
    text-align: right

  .password-strength-meter
    width: 0.6rem
    margin-left: 0.4rem

    *:nth-child(odd)
      height: 4px
    *:nth-child(even)
      height: 2px
</style>
