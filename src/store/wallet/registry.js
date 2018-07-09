import bitcoin from 'lib/bitcoin'
import eos from 'lib/eos/service'

class Registry {
  serviceMap = {}

  register (coin, service) {
    this.serviceMap[coin] = service
  }

  get (coin) {
    return this.serviceMap[coin]
  }
}

const registry = new Registry()

registry.register('BTC', bitcoin)
registry.register('BCH', bitcoin)
registry.register('EOS', eos)

export default registry
