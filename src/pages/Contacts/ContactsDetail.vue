<template>
  <div class="warp">
    <div class="header">
      <div class="row items-center" style="height: 2.75rem;position: relative;z-index: 2;background: #fff">
        <div @click="$router.back()" class="col-2" style="padding-left: 0.5rem; text-align: left">
          <icon name="co-ic_back" color="black" size="2.5rem"></icon>
        </div>
        <div class="col-8 flex flex-center">
          联系人
        </div>
        <div @click="popupMore = !popupMore" class="col-2 relative-position" style="padding-right: 1rem; text-align: right">
          <icon name="co-Add-2" color="black" size="1.3rem"></icon>
        </div>
      </div>
      <div style="height: 2.75rem; width:90%; box-shadow: 0 1px 15px rgba(0,0,0,0.10); position: absolute; top:0; left:50%; margin-left:-45%;z-index: 1"></div>
      <div v-if="popupMore" class="popup-more">
        <div class="item-list">
          <span class="name">扫码添加地址</span>
          <div class="line"></div>
        </div>
        <div class="item-list">
          <router-link class="link" to="/contacts/contacts-add">
            <span class="name">手动添加地址</span>
          </router-link>
        </div>
        <div class="icon"></div>
        <div class="icon-2"></div>
      </div>
    </div>
    <div class="main">
      <div class="content-top">
        <div class="profile">
          <img src="statics/coins/ethereum.png" width="32px"/>
        </div>
        <div class="name">
          wodemingzi
        </div>
      </div>
      <div class="contact-list">
        <div class="list-content">
          <div class="title">
            钱包ID
          </div>
          <div class="info">
            <div class="name">wodemingzi</div>
          </div>
        </div>
        <div class="list-content">
          <div class="title">
            备注
          </div>
          <div class="info">
            <div class="remark">欠了三个btc</div>
          </div>
        </div>
        <div class="list-content">
          <router-link class="link" to="/contacts/set-amount">
            <div class="title">
              BTC
            </div>
            <div class="info">
              <div class="address">qwdqwdqwdqwdqwdqwdqw</div>
              <icon class="icon" name="co-youjiantou" size="0.1rem" style="color: #7FA0ED;"></icon>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NavLayout from 'layouts/NavLayout'
import Icon from 'components/Icon'
export default {
  name: 'ContactsDetail',
  components: {
    NavLayout,
    Icon
  },
  data () {
    return {
      visible: true,
      popupMore: false
    }
  },
  mounted () {
  }
}
</script>
<style scoped lang="sass">
  .link
    text-decoration: none
    color: #000000
  .header
    position: relative
  .popup-more
    background: #ffffff
    position: absolute
    top: 60px
    right: 10px
    width: 145px
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.08)
    .item-list
      text-align: center
      padding: 0 12px
      .name
        padding: 20px 0
        display: inline-block
      .line
        background: #EDEDED
        height: 1px
    .icon
      position: absolute
      top: -5px
      right: 7px
      z-index: -1
      background: #ffffff
      box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.08)
      width: 20px
      height: 15px
      transform: rotate(135deg)
    .icon-2
      position: absolute
      top: -5px
      right: 7px
      z-index: 1
      background: #ffffff
      width: 20px
      height: 15px
      transform: rotate(135deg)
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
  .contact-list
    padding: 0 38px
    margin-top: 20px
    .list-content
      padding: 16px 0
      border-bottom: 1px solid #F5F5F5
      font-size: 14px
      .info
        display: flex
        flex: 1
        align-items: center
        justify-content: space-between
        margin-top: 10px
        font-size: 16px
        .remark,.address
          color: #3E82FE
</style>
