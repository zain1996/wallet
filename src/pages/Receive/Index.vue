<template>
  <q-layout>
    <div class="warp">
      <div class="header">
        <div class="row items-center" style="height: 2.75rem;position: relative;z-index: 2;background: #fff">
          <div @click="$router.back()" class="col-2" style="padding-left: 0.5rem; text-align: left">
            <icon name="co-ic_back" color="black" size="2.5rem"></icon>
          </div>
          <div class="col-8 flex flex-center">
            收款
          </div>
        </div>
        <div style="height: 2.75rem; width:90%; box-shadow: 0 1px 15px rgba(0,0,0,0.10); position: absolute; top:0; left:50%; margin-left:-45%;z-index: 1"></div>
      </div>
      <div class="main">
        <div class="item-wallet-change" @click="drawer = !drawer">
          <div class="item-list">
            <div class="img">
              <img src="statics/coins/ethereum.png" width="32px"/>
              <span class="name">EOS</span>
            </div>
            <div class="icon">
              <icon name="co-Right_arrow" style="color: #D8D8D8"></icon>
            </div>
          </div>
        </div>
        <div class="address">
          12312o3kpdkpoqwkdpoqwkdpk1233
        </div>
        <div class="code">
          <img src="http://t.cn/RBNSVhJ" alt="">
        </div>
        <div class="set-amount">
          <a href="">设置金额</a>
        </div>
      </div>
      <q-layout-drawer v-model="drawer" side="right" content-class="drawer">
        <div class="item-drawer">
          <div class="item-drawer-list">
            <div class="visible">
              <div class="img">
                <img src="statics/coins/ethereum.png" width="32px"/>
              </div>
              <div class="content">
                <div class="name">Btc</div>
                <icon class="icon" :name="!visible ? 'co-unfold' : 'co-packup'"></icon>
              </div>
            </div>
            <div class="visible-no">
              <div class="visible-no-content">
                <div class="img">
                  <img src="statics/coins/ethereum.png" width="32px"/>
                </div>
                <div class="content">
                  <div class="name">Btc</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-layout-drawer>
    </div>
  </q-layout>
</template>
<script>
import NavLayout from 'layouts/NavLayout'
import Icon from 'components/Icon'
export default {
  name: 'Index',
  components: {
    NavLayout,
    Icon
  },
  data () {
    return {
      visible: true,
      drawer: false
    }
  },
  mounted () {
  }
}
</script>
<style scoped lang="sass">
  .item-wallet-change
    padding: 0 30px
    margin-top: 24px
    .img
      display: flex
      align-items: center
      .name
        color: #000000
        font-size: 16px
    .item-list
      display: flex
      align-items: center
      justify-content: space-between
      padding: 10px 0
      border-bottom: 1px solid #F5F5F5
  .address
    text-align: center
    margin: 40px 0 30px 0
  .code
    width: 215px
    height: 219px
    margin: 0 auto
    img
      width: 100%
      height: 100%
  .set-amount
    text-align: center
    margin-top: 30px
    a
      color: #3E82FE
      font-size: 16px
  .item-drawer
    padding: 0 20px
    margin-top: 30px
    .item-drawer-list
      .visible,.visible-no-content
        display: flex
        align-items: center
        border-bottom: 1px solid #F5F5F5
        .content
          display: flex
          flex: 1
          justify-content: space-between
          align-items: center
          padding: 16px 0
          font-size: 16px
          color: #080808
          .icon
            color: #D6D6D6
      .visible-no
        padding-left: 25px
</style>
