<template>
  <div class="warp">
    <div class="header">
      <div class="row items-center" style="height: 2.75rem;position: relative;z-index: 2;background: #fff">
        <div @click="$router.back()" class="col-2" style="padding-left: 0.5rem; text-align: left">
          <icon name="co-ic_back" color="black" size="2.5rem"></icon>
        </div>
        <div class="col-8 flex flex-center">
          EOS
        </div>
        <div class="col-2 relative-position" style="padding-right: 0.5rem; text-align: right">
          <icon name="co-gengduo" color="black" size="2.5rem"></icon>
        </div>
      </div>
      <div style="height: 2.75rem; width:90%; box-shadow: 0 1px 15px rgba(0,0,0,0.10); position: absolute; top:0; left:50%; margin-left:-45%;z-index: 1"></div>
    </div>
    <div class="main">
      <div class="money">
        <span id="balance">
          0.04444<em id="conversion">≈ &nbsp;¥334.1</em>
        </span>
      </div>
      <div id="myChart" :style="{marginTop: '30px',width: '100%', height: '200px'}"></div>
      <div class="item">
        <q-btn class="btn-zhuanzhang">
          <icon style="margin: 0 5px 0 0" size="1.5rem" name="co-zhuanchu"></icon>
          <span>转帐</span>
        </q-btn>
        <q-btn class="btn-shouru">
          <icon style="margin: 2px 5px 0 0" size="1.5rem" name="co-shouru"></icon>
          <span>收款</span>
        </q-btn>
      </div>
      <div  class="item" style="padding: 0 16px">
        <div class="record">
          <div @click="visible = !visible" class="record-header">
            <span >交易记录</span>
            <icon :name="!visible ? 'co-packup' : 'co-unfold'"></icon>
          </div>
          <div class="record-list">
            <div class="img">
              <img src="http://img.alicdn.com/tps/TB1ld1GNFXXXXXLapXXXXXXXXXX-200-200.png" alt="">
            </div>
            <div class="info">
              <div class="info-top">
                <span class="name">qweqdqwqwd</span>
                <span class="ether-reduce">-0.06578 ether</span>
              </div>
              <div class="info-bottom">
                <span>1秒前</span>
              </div>
            </div>
          </div>
          <div class="record-list">
            <div class="img">
              <img src="http://img.alicdn.com/tps/TB1ld1GNFXXXXXLapXXXXXXXXXX-200-200.png" alt="">
            </div>
            <div class="info">
              <div class="info-top">
                <span class="name">qweqdqwqwd</span>
                <span class="ether-plus">-0.06578 ether</span>
              </div>
              <div class="info-bottom">
                <span>1秒前</span>
              </div>
            </div>
          </div>
          <div class="record-list" v-if="visible">
            <div class="img">
              <img src="http://img.alicdn.com/tps/TB1ld1GNFXXXXXLapXXXXXXXXXX-200-200.png" alt="">
            </div>
            <div class="info">
              <div class="info-top">
                <span class="name">qweqdqwqwd</span>
                <span class="ether-plus">-0.06578 ether</span>
              </div>
              <div class="info-bottom">
                <span>1秒前</span>
              </div>
            </div>
          </div>
          <div class="record-list" v-if="visible">
            <div class="img">
              <img src="http://img.alicdn.com/tps/TB1ld1GNFXXXXXLapXXXXXXXXXX-200-200.png" alt="">
            </div>
            <div class="info">
              <div class="info-top">
                <span class="name">qweqdqwqwd</span>
                <span class="ether-plus">-0.06578 ether</span>
              </div>
              <div class="info-bottom">
                <span>1秒前</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="dapp">
        <h3>DAPP</h3>
        <div class="item-warp">
          <div class="item-dapp">
            <div class="img">
              <img src="http://img.alicdn.com/tps/TB1ld1GNFXXXXXLapXXXXXXXXXX-200-200.png"/>
            </div>
            <p>美食</p>
          </div>
          <div class="item-dapp">
            <div class="img">
              <img src="http://img.alicdn.com/tps/TB1ld1GNFXXXXXLapXXXXXXXXXX-200-200.png"/>
            </div>
            <p>美食</p>
          </div>
          <div class="item-dapp">
            <div class="img">
              <img src="http://img.alicdn.com/tps/TB1ld1GNFXXXXXLapXXXXXXXXXX-200-200.png"/>
            </div>
            <p>美食</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NavLayout from 'layouts/NavLayout'
import Icon from 'components/Icon'

export default {
  name: 'Detail',

  components: {
    NavLayout,
    Icon
  },
  data () {
    return {
      openDrawer: false,
      visible: true
    }
  },
  mounted () {
    this.drawLine()
  },
  methods: {
    drawLine () {
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption(
        {
          textStyle: {
            color: '#999999'
          },
          grid: {
            left: 20,
            right: 20,
            top: 32,
            bottom: 0,
            containLabel: true
          },
          legend: {
            data: ['资产', '数量']
          },
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            splitLine: {
              show: true,
              lineStyle: {
                color: '#eeeeee'
              }
            },
            axisLine: {
              lineStyle: {
                color: '#CCCCCC'
              }
            },
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: [
            {
              splitLine: {
                show: false
              },
              axisLine: {
                lineStyle: {
                  color: '#CCCCCC'
                }
              },
              name: '资产',
              type: 'value'
            },
            {
              splitLine: {
                show: false
              },
              axisLine: {
                lineStyle: {
                  color: '#CCCCCC'
                }
              },
              name: '数量',
              type: 'value'
            }
          ],
          series: [
            {
              color: '#0086E0',
              name: '资产',
              data: [820, 932, 901, 934, 1290, 1330, 1320],
              type: 'line',
              smooth: true
            },
            {
              color: '#1FC5EA',
              name: '数量',
              yAxisIndex: 1,
              data: [10, 20, 30, 40, 50, 1, 0],
              type: 'line',
              smooth: true
            }
          ]
        }
      )
      window.onresize = myChart.resize
    }
  }
}
</script>
<style scoped lang="sass">
  .money
    margin: 20px 0 0 0
    text-align: center
    #balance
      position: relative
      font-size: 26px
      color: #313B64
      #conversion
        position: absolute
        color: #9B9B9B
        font-size: 14px
        left: 0
        bottom: -20px
        font-style: normal
  .item
    margin-top: 20px
    text-align: center
  .btn-zhuanzhang
    width: 156px
    height: 42px
    background: #2DA3E7
    border-radius: 100px
    color: #FFFFFF
    font-size: 16px
    margin-right: 23px
    box-shadow: 0 2px 4px 0 rgba(45,163,231,0.35);
  .btn-shouru
    width: 156px
    height: 42px
    background: #3E82FE
    border-radius: 100px
    color: #FFFFFF
    font-size: 16px
    box-shadow: 0 2px 4px 0 rgba(62,130,254,0.25);
  .record
    border: 1px solid #F5F5F5
    padding: 0 16px
    .record-header
      display: flex
      justify-content: space-between
      font-size: 12px
      color: #999999
      padding: 12px 0
      border-bottom: 1px solid #f5f5f5
    .record-list
      display: flex
      align-items: center
      padding: 13px 0
      .img
        width: 30px
        height: 30px
        border-radius: 100%
        overflow: hidden
        margin-right: 8px
        img
          width: 100%
      .info
        flex: 1
        .info-top
          display: flex
          justify-content: space-between
          color: #313B64
          font-size: 14px
          .ether-reduce
            color: #F23131
          .ether-plus
            color: #3175F2
        .info-bottom
          text-align: left
          color: #999999
          font-size: 12px
  .dapp
    padding: 0 16px 10px 16px
    h3
      margin: 12px 0
      color: #999999
      font-size: 12px
      line-height: 1
      padding: 0 16px
    .item-warp
      display: flex
      justify-content: space-between
      .item-dapp
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        width: 105px
        height: 105px
        border-radius: 6px
        box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.1)
        .img
          width: 40px
          height: 40px
          border-radius: 100%
          overflow: hidden
          img
            width: 100%
        p
          margin: 8px 0 0 0
          color: #080808
          font-size: 12px
</style>
