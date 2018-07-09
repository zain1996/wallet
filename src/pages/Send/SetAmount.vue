<template>
  <q-layout>
    <div class="warp">
      <div class="header">
        <div class="row items-center" style="height: 2.75rem;position: relative;z-index: 2;background: #fff">
          <div @click="$router.back()" class="col-2" style="padding-left: 0.5rem; text-align: left">
            <icon name="co-ic_back" color="black" size="2.5rem"></icon>
          </div>
          <div class="col-8 flex flex-center">
            设置金额
          </div>
        </div>
        <div style="height: 2.75rem; width:90%; box-shadow: 0 1px 15px rgba(0,0,0,0.10); position: absolute; top:0; left:50%; margin-left:-45%;z-index: 1"></div>
      </div>
      <div class="main">
        <div class="content-top">
          <div class="profile">
            <img src="statics/coins/ethereum.png" width="32px"/>
          </div>
          <div class="address">
            qwdqwdqwdqwdqwdqwdqwdqwdqwdqwdqwdqw
          </div>
        </div>
        <div class="item-title">
          钱包
        </div>
        <div class="item">
          <div class="item-list" @click="drawer = !drawer">
            <div class="icon">
              <icon size="1.7rem" name="co-ic_wallet"></icon>
            </div>
            <div class="info">
              <div class="content">
                <div class="name">
                  BTC<b>.wodemingzi</b>
                </div>
                <div class="total">0.01btc</div>
              </div>
              <div class="icon-right">
                <icon name="co-ic_arrow_right"></icon>
              </div>
            </div>
          </div>
        </div>
        <div class="item-title">
          转账金额
        </div>
        <div class="item">
          <div class="input">
            <q-input class="q-input" id="money" v-model="money" type="number" suffix="EOS" />
          </div>
          <div class="input">
            <q-input class="q-input" id="conversion" v-model="conversion" type="number" suffix="CYN" />
          </div>
        </div>
        <div class="item-title">
          备注
        </div>
        <div class="item">
          <div class="input">
            <q-input class="q-input" placeholder="请输入" v-model="conversion" />
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="btn-next">确定</div>
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
                <icon class="icon" :name="!visible ? 'co-packup' : 'co-unfold'"></icon>
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
  name: 'SetAmount',
  components: {
    NavLayout,
    Icon
  },
  data () {
    return {
      drawer: false,
      visible: true,
      conversion: '',
      money: ''
    }
  },
  mounted () {
  }
}
</script>

<style scoped lang="sass">
  .main
    overflow: hidden
    padding-bottom: 50px
  .item-title
    padding-left: 36px
    margin-top: 30px
    font-size: 14px
  .item
    margin-top: 10px
    padding: 0 36px
    .q-input
      padding-bottom: 14px
    .item-list
      display: flex
      align-items: center
      border-bottom: 1px solid #F5F5F5
      padding-bottom: 12px
      .info
        display: flex
        flex: 1
        justify-content: space-between
        align-items: center
        .content
          margin-left: 12px
          .name
            color: #313B64
            font-size: 16px
            b
              font-weight: normal
              color: #9B9B9B
              font-size: 14px
          .total
            color: #9B9B9B
            font-size: 12px
            margin-top: 5px
        .icon-right
          color: #9B9B9B
    .icon
      width: 40px
      height: 40px
      display: flex
      justify-content: center
      align-items: center
      color: #ffffff
      background: #3E82FE
      border-radius: 100%
    .input
      margin-bottom: 24px
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
  .content-top
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    margin-top: 20px
    .profile
      display: flex
      align-items: center
      justify-content: center
      width: 66px
      height: 66px
      border: 10px solid #F4F6FA
      border-radius: 100%
    .name
      display: flex
      align-items: center
      height: 28px
      font-size: 20px
      color: #313B64
    .address
      font-size: 14px
      color: #9B9B9B
      margin-top: 6px
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
