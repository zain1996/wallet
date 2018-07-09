<template>
  <div class="warp">
    <div class="header">
      <div class="row items-center" style="height: 2.75rem;position: relative;z-index: 2;background: #fff">
        <div @click="$router.back()" class="col-3" style="padding-left: 0.5rem; text-align: left">
          <icon name="co-ic_back" color="black" size="2.5rem"></icon>
        </div>
        <div class="col-6 flex flex-center">
          联系人
        </div>
        <div class="col-3 relative-position" style="padding-right: 1rem; text-align: right">
          <router-link class="link" to="/contacts/contacts-add">
            <icon name="co-Add-2" color="black" style="margin-right: 25px" size="1.3rem"></icon>
          </router-link>
          <icon name="co-saoma1" color="black" size="1.3rem"></icon>
        </div>
      </div>
      <div style="height: 2.75rem; width:90%; box-shadow: 0 1px 15px rgba(0,0,0,0.10); position: absolute; top:0; left:50%; margin-left:-45%;z-index: 1"></div>
    </div>
    <div class="main">
      <div class="search">
        <input placeholder="查找好友ID" type="text">
        <icon  name="co-suosou" style="color: #979797" size="1.5rem"></icon>
      </div>
      <router-link class="link" to="/contacts/contacts-detail">
        <div class="contact-list">
          <div class="list-content">
            <div class="img">
              <img src="statics/coins/ethereum.png" width="32px"/>
            </div>
            <div class="info">
              <div class="name">wodemingzi</div>
              <icon class="icon" name="co-ic_arrow_right" size="1.5rem" style="color: #D8D8D8;"></icon>
            </div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
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
      visible: true
    }
  },
  mounted () {
  }
}
</script>
<style scoped lang="sass">
  .link
    text-decoration: none
  .search
    display: flex
    align-items: center
    padding: 0 20px
    margin: 24px auto 0
    width: 90%
    height: 40px
    background: rgba(244,246,250,1)
    border-radius: 30px
    input
      border: 0
      flex: 1
      background: #F4F6FA
      color: #D7D7D7
      font-size: 16px
    input::-webkit-input-placeholder
      color: #D7D7D7
      font-size: 16px
  .contact-list
    padding: 0 25px
    margin-top: 30px
    .list-content
      display: flex
      align-items: center
      padding: 16px 0
      border-bottom: 1px solid #F5F5F5
      .img
        display: flex
        align-items: center
        justify-content: center
        width: 40px
        height: 40px
        border: 7px solid #F4F6FA
        border-radius: 100%
        margin-right: 20px
      .info
        display: flex
        flex: 1
        align-items: center
        justify-content: space-between
        font-size: 16px
        .name
          color: #000000
</style>
