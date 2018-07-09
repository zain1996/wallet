<template>
  <div class="warp">
    <div class="header">
      <div class="row items-center" style="height: 2.75rem;position: relative;z-index: 2;background: #fff">
        <div @click="$router.back()" class="col-2" style="padding-left: 0.5rem; text-align: left">
          <icon name="co-ic_back" color="black" size="2.5rem"></icon>
        </div>
        <div class="col-8 flex flex-center">
          语言选择
        </div>
      </div>
      <div style="height: 2.75rem; width:90%; box-shadow: 0 1px 15px rgba(0,0,0,0.10); position: absolute; top:0; left:50%; margin-left:-45%;z-index: 1"></div>
    </div>
    <q-list  no-border style="padding: 0 0 0 16px">
      <q-item style="border-bottom: 1px solid #EDEDED;padding: 20px 0"  tag="label" v-for="item in languages" :key="item.lang">
        <q-item-main >
          <q-item-tile style="height:22px;line-height: 22px" title :text-color="lang === item.lang ? 'primary' : ''">{{ item.name }}</q-item-tile>
        </q-item-main>
        <q-item-side right style="margin-right: 16px">
          <q-radio v-model="lang" :val="item.lang" @input="change"/>
        </q-item-side>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { setLanguage } from 'plugins/i18n'
import Icon from 'components/Icon'
export default {
  name: 'Language',

  components: {
    Icon
  },

  data () {
    return {
      languages: [
        { lang: 'en', name: 'English' },
        { lang: 'zh-CN', name: '简体中文' }
      ],
      lang: 'en'
    }
  },

  watch: {
    async lang (v) {
      await setLanguage(v)
      this.$store.dispatch('setting/updateSetting', { language: v })
    }
  },

  methods: {
    change () {
      this.$nextTick(() => {
        // this.$router.back()
      })
    }
  },

  async created () {
    this.lang = this.$store.state.setting.language
  }
}
</script>
<style lang="sass">
</style>
