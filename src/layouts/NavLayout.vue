<template>
  <q-layout view="hHh LpR fff" class="nav">
    <slot name="header"></slot>

    <q-layout-footer>
      <q-tabs position="bottom">
        <q-route-tab slot="title" icon="" to="/" replace>
          <icon name="co-ic_wallet-" size="1.5rem"/>{{$t('nav.home')}}
        </q-route-tab>
        <!--<q-route-tab slot="title" icon="attach_money" to="/market" replace :label="$t('nav.market')" />-->
        <!--<q-route-tab slot="title" icon="explore" to="/discovery" replace :label="$t('nav.discovery')" />-->
        <q-route-tab slot="title"  to="/profile" replace>
          <icon name="co-ic_friends" size="1.5rem"/>{{$t('nav.profile')}}
        </q-route-tab>
      </q-tabs>
    </q-layout-footer>

    <slot name="drawer"></slot>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import Icon from '../components/Icon'
export default {
  name: 'NavLayout',

  components: {
    Icon
  },

  data () {
    return {
      leftDrawer: true
    }
  }
}
</script>

<style lang="sass">
  .nav
    .q-tabs-head
      background: #fefefe !important
      color: #7b7b7b !important

      .active
        color: #3e82fe

      .q-tab
        font-size: 0.6rem
        .q-tab-icon
          font-size: 1.4rem
  .q-layout-footer
    position: fixed
    bottom: 0
</style>
