<template>
  <i :class="classes" :style="{ 'font-size': size, 'vertical-align': 'middle' }" aria-hidden>
    <slot></slot>
  </i>
</template>

<script>
export default {
  name: 'Icon',

  props: {
    name: String,
    color: String,
    size: String
  },

  computed: {
    classes () {
      return [
        'iconfont',
        this.name,
        {
          [`text-${this.color}`]: this.color
        }
      ]
    }
  }
}
</script>

<style lang="sass">
  @import "/statics/iconfont/iconfont.css"
</style>
