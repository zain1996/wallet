<template>
  <div class="warp">
    <div class="header">
      <div class="row items-center" style="height: 2.75rem;position: relative;z-index: 2;background: #fff">
        <div @click="$router.back()" class="col-2" style="padding-left: 0.5rem; text-align: left">
          <icon name="co-ic_back" color="black" size="2.5rem"></icon>
        </div>
        <div class="col-8 flex flex-center">
          交易记录
        </div>
      </div>
      <div style="height: 2.75rem; width:90%; box-shadow: 0 1px 15px rgba(0,0,0,0.10); position: absolute; top:0; left:50%; margin-left:-45%;z-index: 1"></div>
    </div>
    <div class="main">
      <div class="item">
        <router-link class="link" to="/record/detail">
          <div class="item-list">
            <div class="item-list-img"></div>
            <div class="item-list-info">
              <div class="info-left">
                <p class="name">qdqwdqwdq</p>
                <p class="time">一秒前</p>
              </div>
              <div class="info-right">
                <span class="increase">+54.3353btc</span>
              </div>
            </div>
          </div>
        </router-link>
        <router-link class="link" to="/record/detail">
          <div class="item-list">
            <div class="item-list-img"></div>
            <div class="item-list-info">
              <div class="info-left">
                <p class="name">qdqwdqwdq</p>
                <p class="time">一秒前</p>
              </div>
              <div class="info-right">
                <span class="reduce">-54.3353btc</span>
              </div>
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
  data () {
    return {
    }
  },
  mounted () {
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
    align-items: center
    padding: 16px 0
    border-bottom: 1px solid #EDEDED
  .item-list-img
    width: 40px
    height: 40px
    background: #9B9B9B
    border-radius: 100%
  .item-list-info
    display: flex
    flex: 1
    padding-right: 16px
    justify-content: space-between
    margin-left: 12px
    align-items: center
    .info-left
      .name
        margin: 0
        color: #313B64
        font-size: 16px
      .time
        margin: 3px 0 0 0
        color: #999999
        font-size: 14px
    .info-right
      font-size: 14px
      .reduce
        color: #F23131
      .increase
        color: #3175F2
</style>
