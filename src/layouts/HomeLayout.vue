<template>
  <nav-layout>
    <q-layout-header style="border:0;" slot="header">
      <div class="row items-center" style="height: 2.75rem;position: relative;z-index: 2;background: #fff">
        <div class="col-2"></div>
        <div class="col-8 flex flex-center">
          <icon name="co-logo" color="primary" size="1.25rem"></icon>
        </div>
        <div class="col-2 relative-position" style="padding-right: 1rem; text-align: right">
          <icon name="co-ic_memo" color="primary"></icon>
        </div>
      </div>
      <div style="height: 2.75rem; width:90%; box-shadow: 0 1px 15px rgba(0,0,0,0.10); position: absolute; top:0; left:50%; margin-left:-45%;z-index: 1"></div>
    </q-layout-header>
    <q-layout-drawer slot="drawer" side="right" overlay behavior="desktop" class="home-drawer" v-model="openDrawer">
      <q-scroll-area class="fit q-pa-sm">
      </q-scroll-area>
    </q-layout-drawer>
  </nav-layout>
</template>

<script>
import NavLayout from 'layouts/NavLayout'
import Icon from 'components/Icon'

export default {
  name: 'HomeLayout',

  components: {
    NavLayout,
    Icon
  },

  data () {
    return {
      openDrawer: false
    }
  }
}
</script>

<style lang="sass">
  .home-drawer
    .q-layout-drawer-right
      width: 200px
</style>
