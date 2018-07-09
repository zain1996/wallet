<template>
  <back-layout :title="walletName">
    <q-page>
      <div>
        <div>
          {{ $t('inviteCopayers.shareInvitationWithYourCopayers') }}
        </div>
        <qr-code width="" @click="copyCode"></qr-code>
        <div @click="copyCode">
          {{ code }}
        </div>
        <div @click="cancelInvitation">{{ $t('inviteCopayers.cancelInvitation')</div>
      </div>

      <div>
        <div>
          <div>{{ $t('inviteCopayers.waitingForCopayers') }}</div>
          <div>[ {{ walletMN }} ]</div>
        </div>
        <q-list inset-separator>
          <q-item v-for="(item, i) in copayers" :key="i">
            <q-item-side :icon="item.icon" />
            <q-item-main :label="item.name" />
          </q-item>
        </q-list>
      </div>
    </q-page>
  </back-layout>
</template>

<script>
import BackLayout from 'components/BackLayout'
import QrCode from 'components/QRCode'
import copy from 'lib/copy-text-to-clipboard'

export default {
  name: 'InviteCopayers',

  components: {
    BackLayout,
    QrCode
  },

  props: {
    walletID: String
  },

  data () {
    return {
      walletName: '',
      code: '',
      walletMN: '',
      copayers: []
    }
  },

  methods: {
    copyCode () {
      copy(this.code)
      this.$q.notify({
        message: this.$t('copied'),
        color: 'tertiary'
      })
    }
  },

  created () {
  }
}
</script>

<style>
</style>
