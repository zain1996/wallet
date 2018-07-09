<template>
  <div>
    <q-tabs v-model="selectedTab" no-pane-border>
      <q-tab slot="title" name="mnemonic" :label="$t('mnemonic')" />
      <q-tab slot="title" name="privkey" :label="$t('privateKey')" />
      <q-tab slot="title" name="observer" :label="$t('observer')" />

      <q-tab-pane name="mnemonic">
        <import-mnemonic></import-mnemonic>
      </q-tab-pane>
      <q-tab-pane name="privkey" style="text-align: center">{{ $t('comingSoon') }}</q-tab-pane>
      <q-tab-pane name="observer" style="text-align: center">{{ $t('comingSoon') }}</q-tab-pane>
    </q-tabs>

    <div style="margin: 0 0.75rem">
      <q-field class="q-mx-md q-my-lg">
        <div class="row no-wrap items-center" style="font-size: 0.875rem">
          <q-toggle class="text-grey" v-model="agree" :label="$t('readAndAgree')"/>
          <a href="" class="text-secondary" style="margin-left: 0.5rem; text-decoration: none;">{{
            $t('termsOfServiceAndPrivacyPolicy') }}</a>
        </div>
      </q-field>
    </div>

    <div style="margin: 0 1.75rem">
      <q-btn color="primary" class="full-width" :label="$t('import')" to="/wallet/create" />
    </div>
  </div>
</template>

<script>
import ImportMnemonic from './ImportMnemonic'

export default {
  name: 'ImportWallet',

  components: {
    ImportMnemonic
  },

  data () {
    return {
      selectedTab: 'mnemonic',
      agree: false
    }
  }
}
</script>

<style>
</style>
