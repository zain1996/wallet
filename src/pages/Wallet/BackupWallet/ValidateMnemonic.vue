<template>
  <back-layout title="validateMnemonic" class="validate-mnemonic">
    <div class="q-ma-xl row justify-center">
      <icon name="co-iconset0124" size="4rem" color="grey-5"></icon>
    </div>

    <p style="margin: 2rem 1rem 1rem; text-align: center;">{{ $t('validateMnemonicHint') }}</p>
    <p style="margin: 1rem 1rem; text-align: center; color: red;" v-show="!validated">{{ $t('validateMnemonicError') }}</p>

    <div class="q-pa-md bg-grey-3" style="min-height: 5rem">
      <div class="overflow-hidden row gutter-xs">
        <div v-for="(m, i) in input" :key="i">
          <q-btn outline rounded dense color="black" :label="m" class="word" @click="cancelWord(i, m)" />
        </div>
      </div>
    </div>

    <div class="q-pa-md">
      <div class="overflow-hidden row gutter-xs">
        <div v-for="(m, i) in shuffledMnemonic" :key="i">
          <q-btn outline rounded dense color="black" :label="m" class="word" @click="selectWord(i, m)" />
        </div>
      </div>
    </div>

    <div class="fixed-bottom">
      <q-btn color="primary" class="full-width" :label="$t('ok')" @click="confirm" />
    </div>
  </back-layout>
</template>

<script>
import BackLayout from 'components/BackLayout'
import Icon from 'components/Icon'
import shuffle from 'lodash/shuffle'

export default {
  name: 'ValidateMnemonic',

  components: {
    BackLayout,
    Icon
  },

  data () {
    return {
      input: []
    }
  },

  computed: {
    mnemonic () {
      return this.$store.state.wallet.mnemonic.split(' ')
    },
    shuffledMnemonic () {
      return shuffle(this.mnemonic)
    },
    validated () {
      for (let i = 0; i < this.input.length; ++i) {
        if (this.input[i] !== this.mnemonic[i]) return false
      }
      return true
    }
  },

  methods: {
    selectWord (index, word) {
      this.shuffledMnemonic.splice(index, 1)
      this.input.push(word)
    },

    cancelWord (index, word) {
      this.input.splice(index, 1)
      this.shuffledMnemonic.push(word)
    },

    confirm () {
      if (!this.validated) {
        this.$q.dialog({
          title: this.$t('backupFailed'),
          message: this.$t('backupFailedHint'),
          ok: this.$t('ok'),
          preventClose: true
        })
      } else {
        this.$q.dialog({
          title: this.$t('backupSucceeded'),
          message: this.$t('backupSucceededHint'),
          ok: this.$t('ok'),
          cancel: this.$t('cancel'),
          preventClose: true
        }).then(() => {
          // TODO: go to wallet detail page
        }).catch(() => {
          // TODO: go to wallet home, display the wallet item with hint 'need backup'
          this.$router.replace('/')
        })
      }
    }
  }
}
</script>

<style lang="sass">
  .validate-mnemonic
    .q-btn
      padding: 0.875rem 1rem
      font-size: 1rem

    .word
      padding: 0.4rem
      border-color: #ddd
      border-radius: 0.2rem
      background-color: white !important
</style>
