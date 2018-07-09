<template>
  <q-modal v-model="opened" :content-css="{minWidth: '80vw', minHeight: '80vh'}" class="select-coin-modal">
    <q-modal-layout>
      <q-toolbar slot="header">
        <q-btn flat round dense icon="fas fa-angle-left" @click="close" />
        <q-toolbar-title>
          {{ $t('selectCoin') }}
        </q-toolbar-title>
      </q-toolbar>

      <div class="layout-padding">
        <q-list inset-separator no-border>
          <q-item tag="label" v-for="item in coins" :key="item.coin">
            <q-item-main>
              <q-item-tile title :text-color="value === item.coin ? 'primary' : ''">{{ item.coin }}</q-item-tile>
            </q-item-main>
            <q-item-side right>
              <q-radio :value="value" :val="item.coin" @input="selectCoin(item.coin)" />
            </q-item-side>
          </q-item>
        </q-list>
      </div>
    </q-modal-layout>
  </q-modal>
</template>

<script>
import coins from 'lib/coins'

export default {
  name: 'SelectCoinModal',

  props: {
    value: String
  },

  data () {
    return {
      opened: false,
      coins: coins,
      selectedCoin: ''
    }
  },

  watch: {
    value: {
      handler (value) {
        this.selectedCoin = value
      },
      immediate: true
    }
  },

  methods: {
    open () {
      this.opened = true
    },

    close () {
      this.opened = false
    },

    selectCoin (coin) {
      this.$emit('input', coin)
      this.close()
    }
  }
}
</script>

<style lang="sass">
  .select-coin-modal
    .q-toolbar
      background: #fefefe !important
      color: #7b7b7b !important
</style>
