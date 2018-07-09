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
      <div class="main-head">
        <div class="img">
          <icon name="co-finish" size="4rem"></icon>
        </div>
        <div class="desc">
          <span class="num">565</span>
          <span>EOS</span>
        </div>
      </div>
      <div class="info">
        <div class="info-title">
          发款方
        </div>
        <div class="info-content">
          qwdqjwdjqwidjqowjdoqwjodji
        </div>
      </div>
      <div class="info">
        <div class="info-title">
          收款方
        </div>
        <div class="info-content">
          12312312kpkpkpoqkdpoqkwpdpk
        </div>
      </div>
      <div class="info">
        <div class="info-title">
          备注
        </div>
        <div class="info-content">
          我的名字投资
        </div>
      </div>
      <div class="info position-relative">
        <div class="info-title">
          交易号
        </div>
        <div class="color-1 info-content">
          dqwkdqwkd...123
        </div>
        <div class="code">
          <div class="img">
            <img src="http://t.cn/RBNSVhJ" alt="">
          </div>
          <div class="copy">复制URL</div>
        </div>
      </div>
      <div class="info">
        <div class="info-title">
          区块
        </div>
        <div class="info-content">
          48888
        </div>
      </div>
      <div class="info">
        <div class="info-title">
          交易时间
        </div>
        <div class="info-content">
          01/09/2018 22:32:23 +0800
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Icon from 'components/Icon'
export default {
  name: 'detail',
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
  .main
    padding: 0 32px
  .main-head
    margin-top: 22px
    .img
      display: flex
      justify-content: center
      color: #3E82FE
    .desc
      padding: 10px 0 20px 0
      display: flex
      justify-content: center
      align-items: center
      font-size: 14px
      color: #313B64
      border-bottom: 1px solid #F5F5F5
      .num
        margin-right: 6px
        font-size: 30px
  .info
    margin-top: 20px
  .info-title
    font-size: 14px
    color: #9B9B9B
    margin-bottom: 6px
  .info-content
    font-size: 14px
    color: #000000
  .color-1
    color: #3175F2
  .position-relative
    position: relative
  .code
    position: absolute
    top: -10px
    right: 0
    display: flex
    flex-direction: column
    align-items: center
    .img
      width: 120px
      height: 120px
      img
        width: 100%
        height: 100%
    .copy
      margin-top: 5px
      font-size: 14px
      color: #FFFFFF
      background: #7FA0ED
      border-radius: 4px
      width: 75px
      text-align: center
</style>
