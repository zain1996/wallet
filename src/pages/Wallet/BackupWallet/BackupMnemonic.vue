<template>
  <back-layout title="backupMnemonic" class="backup-mnemonic">
    <div class="q-ma-xl row justify-center">
      <icon name="co-tianxiexinxi" size="4rem" color="grey-5"></icon>
    </div>

    <p style="margin: 2rem 1rem 1rem">{{ $t('backupMnemonicHint') }}</p>

    <div class="q-pa-md bg-grey-3">
      <div class="overflow-hidden row gutter-xs" style="font-weight: bold; user-select: none;">
        <div v-for="(m, i) in mnemonic" :key="i">{{ m }}</div>
      </div>
    </div>

    <div class="fixed-bottom">
      <q-btn color="primary" class="full-width" :label="$t('nextStep')" to="/wallet/validate-mnemonic" replace />
    </div>

    <q-dialog v-model="showDialog">
      <span slot="title">
        <div>
          <icon name="co-jinzhipaizhao" size="2rem" color="grey-5"></icon>
        </div>
        <div style="font-weight: bold">{{ $t('doNotPrintScreen')}}</div>
      </span>

      <span slot="message">
        <p style="text-align: left">{{ $t('doNotPrintScreenHint') }}</p>
      </span>

      <template slot="buttons" slot-scope="props">
        <q-btn color="red" :label="$t('gotIt')" @click="props.ok"/>
      </template>
    </q-dialog>
  </back-layout>
</template>

<script>
import BackLayout from 'components/BackLayout'
import Icon from 'components/Icon'

export default {
  name: 'BackupMnemonic',

  components: {
    BackLayout,
    Icon
  },

  data () {
    return {
      showDialog: false
    }
  },

  computed: {
    mnemonic () {
      return this.$store.state.wallet.mnemonic.split(' ')
    }
  },

  mounted () {
    if (this.$route.query.hint) {
      this.$nextTick(() => {
        this.showDialog = true
      })
    }
  }
}
</script>

<style lang="sass">
  .backup-mnemonic
    .q-btn
      padding: 0.75rem 1rem
      font-size: 1rem
</style>
