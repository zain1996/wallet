<template>
  <q-page class="bg-grey-1 home" style="padding: 0.7rem 1rem 0">
    <div class="row justify-between text-primary card-shadow" style="margin: 0 0 0.7rem; padding: 0.6rem 0.5rem 0.2rem">
      <div v-for="(item, i) in actions" :key="i">
        <q-btn :to="item.action">
          <div>
          <icon :name="item.icon" size="2rem"></icon>
          <div style="margin: 0.5rem 0; text-align: center">
            {{ $t(item.title) }}
          </div>
          </div>
        </q-btn>
      </div>
    </div>

    <div class="home-total-assets" style="background-image: url(statics/wallet-overview.png)">
      <div class="home-total-assets-inner flex flex-center content-center text-white">
        <div>
          {{ $t('totalAssets') }} ({{ $t('currencySymbol') }})
        </div>
        <div class="full-width flex flex-center" style="margin-top: 0.75rem">
          <div class="col-3"></div>
          <div class="col-6" style="text-align: center" :style="{'font-size': totalAssets.length < 10 ? '2rem' : '1.5rem'}">
            <span v-if="visible">{{ totalAssets }}</span>
            <icon v-else v-for="i in 6" :key="i" name="co-asterisk"></icon>
          </div>
          <div class="col-3">
            <q-btn @click="visible = !visible">
              <icon :name="!visible ? 'co-yanjing' : 'co-yanjing1'" size="1.5rem"></icon>
            </q-btn>
          </div>
        </div>
      </div>
    </div>

    <!--钱包其他功能-->
    <div class="home-wallet-other">
      <span style="margin-right: 20px"><icon name="co-addwallet" size="1.5rem"></icon>添加钱包</span>
      <span @click="dragOptions.disabled = !dragOptions.disabled; isGoDetail = !isGoDetail"><icon  name="co-paixu" size="1.5rem"></icon>{{dragOptions.disabled ? '排序' : '取消排序' }}</span>
    </div>
    <!--钱包列表-->
    <div class="home-wallet-list">
      <draggable v-model="list" :options="dragOptions">
        <transition-group tag="div">
          <div @click="goDetail" class="item"  v-for="(item,key) in list" :key="key">
            <div  class="item-content">
              <div class="item-content-left">
                <img src="statics/coins/ethereum.png" width="32px"/>
                <h3>
                  EOS<b>{{item.name}}</b>
                </h3>
              </div>
              <div class="item-content-right">
                <p>435.9945</p>
                <p>¥337777.1</p>
              </div>
              <div @click.stop="openMore(item)" class="jiantou">
                <icon :name="!item.visible ? 'co-unfold' : 'co-packup'"></icon>
              </div>
            </div>
            <div class="item-more" v-if="item.visible">
              <div v-for="(item2,key2) in item.child" :key="key2">
                <div class="item-more-content">
                  <div class="content-left">
                    <img src="statics/coins/ethereum.png" width="32px"/>
                    <h3>
                      EOS<b>.test</b>
                    </h3>
                  </div>
                  <div class="content-right">
                    <p>435.9945</p>
                    <p>¥337777.1</p>
                  </div>
                </div>
                <div class="line" v-if="key2 !== item.child.length - 1"></div>
              </div>
            </div>
          </div>
        </transition-group>
      </draggable>
    </div>

  </q-page>
</template>

<script>
import Icon from 'components/Icon'
import draggable from 'vuedraggable'

export default {
  name: 'Home',

  components: {
    Icon,
    draggable
  },

  data () {
    return {
      actions: [
        { icon: 'co-saoma1', title: 'scan', action: '' },
        { icon: 'co-zhuanzhang1', title: 'send', action: '/send' },
        { icon: 'co-erweima1', title: 'receive', action: '/receive' }
      ],
      visible: false,
      dragOptions: {
        animation: 120,
        scroll: true,
        ghostClass: 'ghost-style',
        fallbackClass: 'item-style',
        disabled: true
      },
      drag: false,
      totalAssets: '1043357592.98',
      list: [
        {
          name: 'q',
          child: [1, 2]
        },
        {
          name: 's',
          child: [1, 2]
        }
      ],
      isGoDetail: true
    }
  },

  computed: {
    wallets () {
      return this.$store.state.wallet.wallets
    }
  },

  methods: {
    // 打开更多
    openMore (val) {
      this.$set(val, 'visible', !val.visible)
    },
    // 跳转到详情
    goDetail () {
      if (!this.isGoDetail) {
        return false
      }
      this.$router.push('/wallet/detail')
    }
  }
}
</script>

<style scoped lang="sass">
  .link
    text-decoration: none
  .home
    .card-shadow
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1)
      border-radius: 6px
  .home-wallet-other
    display: flex
    justify-content: flex-end
    font-size: 11px
    color: #9B9B9B
    margin: 5px 0

    span
      display: flex
      align-items: center
  .home-total-assets
    width: 100%
    height: 0
    overflow: hidden
    padding-top: 300px / 688px * 100% // refer to: https://css-tricks.com/aspect-ratio-boxes/
    position: relative
    background-size: cover

    &-inner
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
  .home-wallet-list
    width: 100%
    background: #fff
    overflow: hidden
    border-radius: 6px
    box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.08)
    .item:last-child
      .item-content
        border: 0
    .item
      padding: 0 20px
      background: #fff
      .item-content
        display: flex
        position: relative
        justify-content: space-between
        align-items: center
        padding-bottom: 5px
        border-bottom: 1px solid #F5F5F5
        .item-content-left
          display: flex
          align-items: center

          h3
            font-size: 16px
            color: #313B64
            margin-left: 10px
            b
              font-size: 14px
              color: #9B9B9B

        .item-content-right
          p
            margin: 0
            text-align: right
          p:nth-child(1)
            font-size: 16px
            color: #313B64
          p:nth-child(2)
            margin-top: 5px
            font-size: 12px
            color: #999999
        .jiantou
          position: absolute
          text-align: right
          bottom: 5px
          width: 100%
          color: #D6D6D6
      .item-more
        border-bottom: 1px solid #F5F5F5
        padding-left: 30px
        .item-more-content
          display: flex
          justify-content: space-between
          align-items: center
          .content-left
            display: flex
            align-items: center

            h3
              font-size: 16px
              color: #313B64
              margin-left: 10px
              b
                font-size: 14px
                color: #9B9B9B

          .content-right
            p
              margin: 0
              text-align: right
            p:nth-child(1)
              font-size: 16px
              color: #313B64
            p:nth-child(2)
              margin-top: 5px
              font-size: 12px
              color: #999999
  .line
    height: 1px
    background: #F5F5F5
  .ghost-style
    opacity: 0
  .item-style
    box-shadow: 0 0 15px 0 rgba(0, 0, 0,0.15)
</style>
