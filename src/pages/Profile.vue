<template>
  <nav-layout>
    <div slot="header" class="warp-profile">
      <div class="item profile">
        <div class="img">
          <img src="statics/coins/ethereum.png" width="32px"/>
        </div>
        <div class="name">
          wodemingzi
        </div>
      </div>
      <div class="item" v-for="(v, k) in project" :key="k" :class="v.class" :style="v.style">
        <router-link class="link" :to="v.link ? v.link : ''">
          <div class="item-list">
            <div class="item-list-icon">
              <icon :name="v.icon" size="1.2rem"></icon>
            </div>
            <div class="item-list-info">
              <div class="name">
                {{v.name}}
              </div>
              <div class="icon">
                <icon name="co-Right_arrow"></icon>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </nav-layout>
</template>

<script>
import Icon from 'components/Icon'
import NavLayout from 'layouts/NavLayout'
export default {
  name: 'Profile',
  components: {
    Icon,
    NavLayout
  },
  data () {
    return {
      project: [
        {
          name: '交易记录',
          icon: 'co-Personal-Transaction_history',
          link: '/record',
          style: {
            marginTop: '10px'
          }
        },
        {
          name: '联系人',
          icon: 'co-Personal-Contact',
          link: '/contacts',
          class: 'border-no'
        },
        {
          name: '设置',
          icon: 'co-Personal-settings',
          link: '/Settings',
          style: {
            marginTop: '10px'
          }
        },
        {
          name: '帮助中心',
          icon: 'co-Personal-Help_Center'
        },
        {
          name: '关于我们',
          icon: 'co-Personal-About_Us'
        },
        {
          name: '意见反馈',
          icon: 'co-Personal-Feedback',
          class: 'border-no'
        },
        {
          name: '退出登录',
          icon: 'co-Personal-Logout',
          style: {
            marginTop: '10px'
          },
          class: 'border-no'
        }
      ]
    }
  }
}
</script>

<style lang="sass">
.warp-profile
  position: absolute
  top: 0
  bottom: 0
  left: 0
  right: 0
  background: #F5F5F5
  overflow: hidden
  .q-tabs-head
    background: #fefefe !important
    color: #7b7b7b !important

    .active
      color: #3e82fe

    .q-tab
      font-size: 0.6rem
      .q-tab-icon
        font-size: 1.4rem
  .link
    text-decoration: none
  .item
    background: #ffffff
    padding: 0 24px
  .item-list
    display: flex
    align-items: center
    padding: 12px 0
    border-bottom: 1px solid #EDEDED
  .item-list-icon
    color: #7B7B7B
  .item-list-info
    display: flex
    justify-content: space-between
    align-items: center
    flex: 1
    .name
      margin-left: 20px
      color: #080808
    .icon
      .co-Right_arrow
        color: #9B9B9B
  .profile
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    padding: 20px 0 25px 0
    margin-top: 0
    .img
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
  .border-no
    .item-list
      border: 0
</style>
