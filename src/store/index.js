import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

import wallet from './wallet'
import setting from './setting'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  modules: {
    wallet,
    setting
  },

  strict: debug,
  plugins: debug ? [createLogger()] : []
})

export default store
