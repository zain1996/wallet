<template>
  <div class="warp-send">
    <div class="header">
      <div class="row items-center" style="height: 2.75rem;position: relative;z-index: 2;background: #fff">
        <div @click="$router.back()" class="col-2" style="padding-left: 0.5rem; text-align: left">
          <icon name="co-ic_back" color="black" size="2.5rem"></icon>
        </div>
        <div class="col-8 flex flex-center">
          转账
        </div>
        <div class="col-2 relative-position" style="padding-right: 1rem; text-align: right">
          <icon name="co-saoma1" color="black" size="1.3rem"></icon>
        </div>
      </div>
      <div style="height: 2.75rem; width:90%; box-shadow: 0 1px 15px rgba(0,0,0,0.10); position: absolute; top:0; left:50%; margin-left:-45%;z-index: 1"></div>
    </div>
    <div class="main">
      <div class="item-input-address">
        <div class="input-address-title">
          收款钱包地址
        </div>
        <q-input v-model="text" style="padding-bottom: 10px">
          <icon class="icon" name="co-saoma1"></icon>
        </q-input>
      </div>
      <div class="item-wallet-change">
        <div class="item-title">
          钱包
        </div>
        <div class="item-list">
          <div class="item-icon">
            <icon name="co-ic_wallet-" size="1.5rem"></icon>
          </div>
          <div class="info">
            <div class="info-name">选择钱包</div>
            <div class="info-icon">
              <icon name="co-Right_arrow" style="color: #D8D8D8"></icon>
            </div>
          </div>
        </div>
      </div>
      <div class="item-input-money">
        <div class="input-money-title">
          转账金额
        </div>
        <div class="input">
          <q-input placeholder="0.00" class="q-input" v-model="text" type="number" suffix="EOS" />
        </div>
        <div class="input">
          <q-input placeholder="0.00" class="q-input" v-model="text" type="number" suffix="CYN" />
        </div>
      </div>
      <div class="item-input-remark">
        <div class="input-remark-title">
          备注
        </div>
        <div class="input">
          <q-input placeholder="请输入" class="q-input" v-model="text"/>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="btn-next">确定</div>
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
      text: ''
    }
  },
  mounted () {
  }
}
</script>

<style scoped lang="sass">
  .main
    padding: 0 36px
  .item-input-address
    margin-top: 30px
    .input-address-title
      font-size: 14px
      color: #000000
      margin-bottom: 5px
  .item-wallet-change
    margin-top: 24px
    .item-title
      font-size: 14px
    .item-list
      display: flex
      align-items: center
      padding: 10px 0
      border-bottom: 1px solid #F5F5F5
      .item-icon
        display: flex
        justify-content: center
        align-items: center
        width: 40px
        height: 40px
        color: #FFFFFF
        background: #3E82FE
        border-radius: 100%
      .info
        display: flex
        align-items: center
        flex: 1
        justify-content: space-between
        .info-name
          color: #313B64
          margin-left: 10px
  .item-input-money
    margin-top: 24px
    .input-money-title
      font-size: 14px
      margin-bottom: 5px
    .input
      margin-bottom: 12px
      .q-input
        padding-bottom: 14px
  .item-input-remark
    margin-top: 24px
    .input-remark-title
      font-size: 14px
      margin-bottom: 5px
    .input
      margin-bottom: 12px
      .q-input
        padding-bottom: 14px
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
</style>
