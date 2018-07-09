<template>
  <div>
  </div>
</template>

<script>
import PasswordInputDialog from 'components/PasswordInputDialog'

export default {
  name: 'WalletSetting',

  mounted () { // TODO: just test
    PasswordInputDialog().then(password => {
      console.log(password)
    }).catch(() => {
      console.log('canceled')
    })
  }
}
</script>
