import Vue from 'vue'

// Use a Vue instance as the global event bus
class EventBus {
  vue = new Vue()

  emit (event, ...args) {
    this.vue.$emit(event, ...args)
  }

  on (event, callback) {
    this.vue.$on(event, callback)
  }

  once (event, callback) {
    this.vue.$once(event, callback)
  }

  off (event, callback) {
    this.vue.$off(event, callback)
  }
}

export default new EventBus()
