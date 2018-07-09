<template>
  <div class="create-wallet-guide">
    <div class="title row justify-center items-center">
      <div style="text-align: center; color: white;">
        <div style="margin-top: 3rem">
          <icon name="co-hebingxingzhuang" size="2rem"></icon>
          <div style="display: inline-block; width: 1rem;"></div>
          <icon name="co-logo" size="2rem"></icon>
        </div>
        <p v-html="$t('createWalletGuideTitle')" style="margin-top: 1rem; line-height: 150%; font-size: 1.2rem;"></p>
      </div>
    </div>

    <div style="margin: 2rem 2rem 0">
      <q-btn outline rounded color="white" class="full-width" :label="$t('createWallet')" to="/wallet/create" />
    </div>
    <div style="margin: 2rem 2rem 0">
      <q-btn flat rounded color="white" class="full-width" :label="$t('importWallet')" />
    </div>
  </div>
</template>

<script>
import Icon from 'components/Icon'

export default {
  name: 'CreateWalletGuide',

  components: {
    Icon
  }
}
</script>

<style lang="sass">
  .create-wallet-guide
    width: 100%
    height: 100vh
    background: linear-gradient(to bottom, #1CB5E0, #000046)

    .title
      height: 50vh

    .q-btn
      padding: 0.75rem 1rem
      font-size: 1rem
</style>
