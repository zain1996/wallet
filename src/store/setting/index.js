import Vue from 'vue'
import storage from 'lib/storage'
import log from 'lib/log'
import merge from 'lodash/merge'
import cloneDeep from 'lodash/cloneDeep'
import isPlainObject from 'lodash/isPlainObject'

const defaultSetting = {
  language: '',
  currencyUnit: '',

  wallet: {
    totalCopayersLimit: 6
  }
}

async function loadSetting ({ commit }) {
  storage.load()

  const setting = (await storage.getConfig()) || {}
  commit('updateSetting', setting)
  log.info('Setting loaded')
}

async function updateSetting ({ commit, state }, opts) {
  const setting = cloneDeep(state)
  merge(setting, opts)
  await storage.setConfig(setting)

  commit('updateSetting', opts)
  log.info('Setting updated')
}

export default {
  namespaced: true,
  state: {
    ...defaultSetting
  },
  getters: {
  },
  mutations: {
    updateSetting (state, setting) {
      Object.keys(setting).forEach(k => {
        if (isPlainObject(state[k])) {
          const v = cloneDeep(state[k])
          merge(v, setting[k])
          Vue.set(state, k, v)
        } else {
          Vue.set(state, k, setting[k])
        }
      })
    }
  },
  actions: {
    loadSetting,
    updateSetting
  }
}
