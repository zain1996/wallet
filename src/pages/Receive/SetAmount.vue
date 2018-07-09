<template>
  <div class="warp">
    <div class="header">
      <div class="row items-center" style="height: 2.75rem;position: relative;z-index: 2;background: #fff">
        <div class="col-2" style="padding-left: 0.5rem; text-align: left">
          <icon name="co-ic_back" color="black" size="2.5rem"></icon>
        </div>
        <div class="col-8 flex flex-center">
          接收金额
        </div>
      </div>
      <div style="height: 2.75rem; width:90%; box-shadow: 0 1px 15px rgba(0,0,0,0.10); position: absolute; top:0; left:50%; margin-left:-45%;z-index: 1"></div>
    </div>
    <div class="main">
      <div class="item">
        <q-input id="money" type="number" suffix="EOS" />
        <q-input id="conversion" type="number" suffix="CYN" />
      </div>
    </div>
    <div class="footer">
      <div class="btn-next">下一步</div>
    </div>
  </div>
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
    }
  },
  mounted () {
  }
}
</script>
<style scoped lang="sass">
  .item
    margin-top: 36px
    padding: 0 36px
    #conversion
      margin-top: 23px
      color: #fff
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
