<template>
  <back-layout title="backupWallet" class="backup-wallet-guide">
    <div class="q-ma-xl row justify-center">
      <icon name="co-zichananquan" size="4rem" color="grey-5"></icon>
    </div>

    <p v-html="$t('backupWalletHint')" style="margin: 2rem 1rem 0"></p>

    <div class="fixed-bottom">
      <q-btn color="primary" class="full-width" :label="$t('backupMnemonic')" to="/wallet/backup-mnemonic" replace />
    </div>
  </back-layout>
</template>

<script>
import BackLayout from 'components/BackLayout'
import Icon from 'components/Icon'

export default {
  name: 'BackupWalletGuide',

  components: {
    BackLayout,
    Icon
  }
}
</script>

<style lang="sass">
  .backup-wallet-guide
    .q-btn
      padding: 0.75rem 1rem
      font-size: 1rem
</style>
