import ByteBuffer from 'bytebuffer'
import assert from 'assert'
import Eos from 'eosjs'
import chainsAPI from 'lib/api/chains'
import config from 'config'

/*
class PermissionLevel {
  actor
  permission

  toJSON () {
    return JSON.stringify({
      actor: this.actor,
      permission: this.permission
    })
  }
}

class Action {
  account
  name
  authorization // array of PermissionLevel
  data
  hex_data // eslint-disable-line

  toJSON () {
    return JSON.stringify({
      account: this.account,
      name: this.name,
      authorization: this.authorization,
      data: this.data,
      hex_data: this.hex_data
    })
  }
}
*/

let info = null
let lastTime = null

// refer to: eosjs-api/lib/exported-helpers.js
async function createTransaction (expireInSeconds, callback) {
  try {
    if (!lastTime || Date.now() - lastTime > config.eos.infoUpdateInterval) {
      await chainsAPI.get('/v1/eos/info').then(rep => {
        info = rep.data
        lastTime = Date.now()

        if (info.chain_id !== config.eos.chainID) callback(new Error('invalid chain id'))
      })
    }

    const chainDate = new Date(info.head_block_time) // here time string has the suffix 'Z'
    const expiration = new Date(chainDate.getTime() + expireInSeconds * 1000)

    const refBlockNum = ByteBuffer.fromHex(info.head_block_id.slice(0, 8),
      ByteBuffer.BIG_ENDIAN)
    assert(refBlockNum === info.head_block_num)
    const refBlockPrefix = ByteBuffer.fromHex(info.head_block_id.slice(16, 32),
      ByteBuffer.LITTLE_ENDIAN)

    const headers = {
      expiration: expiration.toISOString().split('.')[0],
      ref_block_num: refBlockNum,
      ref_block_prefix: refBlockPrefix,
      net_usage_words: 0,
      max_cpu_usage_ms: 0,
      delay_sec: 0,
      context_free_actions: [],
      actions: [],
      signatures: [],
      transaction_extensions: []
    }
    callback(null, headers)
  } catch (e) {
    callback(e)
  }
}

// refer to: https://github.com/EOSIO/eosjs
export default function client (privateKeys) {
  return Eos({
    chainId: config.eos.chainID,
    keyProvider: privateKeys,
    httpEndpoint: null, // offline, won't directly call nodeos api
    expireInSeconds: config.txExpiration / 1000,
    broadcast: false, // use false to obtain a fully signed transaction
    debug: config.debug,
    sign: true,
    transactionHeaders: createTransaction
  })
}

// quantity: e.g., '10.0000 SYS'
export async function transfer ({ from, to, quantity, memo = '', privateKeys, contract = 'eosio.token' }) {
  const eos = client(privateKeys)
  const r = await eos.transaction(contract, contract => {
    contract.transfer(from, to, quantity, memo)
  })
  /*
   { transaction_id: '0ef1ba8e0d3f22d378baa34278ccdbac9a140cdddbc3a8e44be6a1c7cfd3a518',
     broadcast: false,
     transaction:
     { compression: 'none',
       transaction:
        { expiration: '2018-06-14T18:16:10',
          ref_block_num: 1,
          ref_block_prefix: 452435776,
          net_usage_words: 0,
          max_cpu_usage_ms: 0,
          delay_sec: 0,
          context_free_actions: [],
          actions: [Array],
          transaction_extensions: [] },
       signatures:
        [ 'SIG_K1_KcNDmKexbbZHLauSX9RAeZPH6cvwx3yvkMMRZqPsLNuKo7ShcopDXnzPGjYzumRNWBGU54oA14kFJBeLCM22CqQCrHXGSs' ]
     }
   }
   */
  return r.transaction
}
