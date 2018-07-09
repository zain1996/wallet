<template>
  <q-layout class="back-layout">
    <q-layout-header>
      <q-toolbar>
        <q-btn flat round dense icon="fas fa-angle-left" @click="$router.back()"></q-btn>
        <q-toolbar-title>
          {{ $t(title) }}
          <span slot="subtitle" v-if="subtitle">{{ $t(subtitle) }}</span>
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <q-page-container>
      <slot></slot>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'BackLayout',

  props: {
    title: String,
    subtitle: String
  }
}
</script>

<style lang="sass">
  .back-layout
    .q-toolbar
      background: #fefefe !important
      color: #7b7b7b !important
</style>
