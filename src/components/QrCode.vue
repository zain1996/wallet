<template>
  <div ref="qrcode">
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'

export default {
  name: 'QrCode',

  props: {
    width: {
      type: Number,
      default: 120
    },
    height: {
      type: Number,
      default: 120
    },
    code: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      qrcode: null
    }
  },

  watch: {
    code (code) {
      if (!this.qrcode) return
      this.qrcode.clear()
      this.qrcode.makeCode(code)
    }
  },

  mounted () {
    this.qrcode = new QRCode(this.$refs.qrcode, {
      text: this.code,
      width: this.width,
      height: this.height,
      colorDark: '#000000',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.H
    })
  }
}
</script>

<style>
</style>
