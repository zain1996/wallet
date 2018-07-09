<template>
  <div class="warp">
    <div class="header">
      <div class="row items-center" style="height: 2.75rem;position: relative;z-index: 2;background: #fff">
        <div @click="$router.back()" class="col-2" style="padding-left: 0.5rem; text-align: left">
          <icon name="co-ic_back" color="black" size="2.5rem"></icon>
        </div>
        <div class="col-8 flex flex-center">
          设置
        </div>
      </div>
      <div style="height: 2.75rem; width:90%; box-shadow: 0 1px 15px rgba(0,0,0,0.10); position: absolute; top:0; left:50%; margin-left:-45%;z-index: 1"></div>
    </div>
    <div class="main">
      <div class="item">
        <router-link class="link" to="/settings/language">
          <div class="item-list">
            <div class="item-list-title">
              选择语言
            </div>
            <div class="item-list-content">
              <span class="name">简体中文</span>
              <icon name="co-Right_arrow"></icon>
            </div>
          </div>
        </router-link>
        <router-link class="link" to="/settings/currency-unit">
          <div class="item-list">
            <div class="item-list-title">
              货币单位
            </div>
            <div class="item-list-content">
              <span class="name">人民币</span>
              <icon name="co-Right_arrow"></icon>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from 'components/Icon'
export default {
  name: 'Index',
  components: {
    Icon
  },
  methods: {
  }
}
</script>
<style scoped lang="sass">
.link
  text-decoration: none
.item
  padding-left: 16px
.item-list
  display: flex
  padding: 20px 15px 20px 0
  justify-content: space-between
  border-bottom: 1px solid #EDEDED
.item-list-title
  color: #080808
  font-size: 16px
.item-list-content
  display: flex
  align-items: center
  .name
    width: 100px
    text-align: right
    font-size: 14px
    color: #9B9B9B
  .co-Right_arrow
    color: #9B9B9B
</style>
