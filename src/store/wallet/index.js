import registry from './registry'
import wallet from './wallet'
import log from 'lib/log'

async function createWallet ({ commit, state }, opts) {
  log.info(`creating wallet '${opts.name}'`)
  log.debug('creating wallet opts', opts)

  opts.sortNo = state.wallets.length

  const service = registry.get(opts.coin)
  const { wallet, mnemonic } = await service.createWallet(opts)

  commit('addWallet', wallet)
  commit('setMnemonic', mnemonic)

  log.info(`created wallet '${wallet.name}'`)
  return wallet
}

async function loadWallets ({ commit }) {
  const wallets = await wallet.loadAll()
  commit('loadWallets', wallets)
}

export default {
  namespaced: true,
  state: {
    wallets: [],
    mnemonic: '' // temporarily
  },
  getters: {
  },
  mutations: {
    loadWallets (state, wallets) {
      state.wallets = wallets
    },
    addWallet (state, wallet) {
      state.wallets.push(wallet)
    },
    setMnemonic (state, mnemonic) {
      state.mnemonic = mnemonic
    },
    clearMnemonic (state) {
      state.mnemonic = ''
    }
  },
  actions: {
    createWallet,
    loadWallets
  }
}
