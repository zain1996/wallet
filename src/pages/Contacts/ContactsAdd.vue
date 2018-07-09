<template>
  <q-layout>
    <div class="warp">
      <div class="header">
        <div class="row items-center" style="height: 2.75rem;position: relative;z-index: 2;background: #fff">
          <div @click="$router.back()" class="col-2" style="padding-left: 0.5rem; text-align: left">
            <icon name="co-ic_back" color="black" size="2.5rem"></icon>
          </div>
          <div class="col-8 flex flex-center">
            添加联系人
          </div>
          <div class="col-2 relative-position" style="padding-right: 1rem; text-align: right">
            <icon name="co-saoma1" color="black" size="1.3rem"></icon>
          </div>
        </div>
        <div style="height: 2.75rem; width:90%; box-shadow: 0 1px 15px rgba(0,0,0,0.10); position: absolute; top:0; left:50%; margin-left:-45%;z-index: 1"></div>
      </div>
      <div class="main">
        <div class="form">
          <div class="input">
            <q-input v-model="text" stack-label="姓名" />
          </div>
          <div class="input">
            <q-input v-model="text" stack-label="联系地址" />
          </div>
          <div class="input">
            <q-input v-model="text" stack-label="备注" />
          </div>
        </div>
        <div class="item-title">
          币种
        </div>
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
      </div>
      <div class="footer">
        <div class="btn-next">添加</div>
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
  name: 'ContactsAdd',
  components: {
    NavLayout,
    Icon
  },
  data () {
    return {
      drawer: false,
      visible: true,
      text: ''
    }
  },
  mounted () {
  }
}
</script>
<style scoped lang="sass">
  .form
    margin-top: 30px
    padding: 0 40px
    .input
      margin-top: 24px
  .item-title
    padding-left: 40px
    margin-top: 30px
    font-size: 14px
  .item-wallet-change
    padding: 0 30px
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
  .item-more
    font-size: 14px
    color: #D5D5D5
    margin: 20px 0 0 48px
  .footer
    position: fixed
    width: 100%
    bottom: 0
    .btn-next
      text-align: center
      color: #fff
      font-size: 18px
      background: #3E82FE
      line-height: 50px
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
