import Web3 from 'web3'
import Signer from 'ethjs-signer'
import BN from 'bignumber.js'

export Spores {
  getProvider: function () {
    var LoomProviderInstance = function () {}
    var remoteLoomProvider = new Web3.providers.HttpProvider('http://localhost:8081')
    var web3Remote = new Web3(remoteLoomProvider)
    var wallet = '0x5f5258aa56b7345f44a5663ae68fea488523184d'
    var privateKey = '0x6dff7c93ad57a8486f9967dcd21e2526ab3786284f38e69227674c359305bd60'

    LoomProviderInstance.prototype.prepareRequest = function (async) {
      return remoteLoomProvider.prepareRequest(async)
    }
    LoomProviderInstance.prototype.send = function (payload) {
      console.log(JSON.stringify(payload))

      var method = payload.method
      if (method === 'eth_accounts') {
        var res = payload
        delete res.params
        res.result = [wallet]
        console.log(res)
        return res
      } else {
        console.log(JSON.stringify(payload))
        return remoteLoomProvider.send(payload)
      }
    }
    LoomProviderInstance.prototype.sendAsync = function (payload, callback) {
      console.log(JSON.stringify(payload))
      console.log(callback)

      var method = payload.method
      if (method === 'eth_accounts') {
        var res = payload
        delete res.params
        res.result = [wallet]
        console.log(res)
        callback(null, res)
      } else if (method === 'eth_sendTransaction') {
        const sign = Signer.sign
        const eth = web3Remote.eth

        let [rawTx, tag] = payload.params

        console.log(rawTx)
        console.log(tag)

        eth.getTransactionCount(wallet, (err, res) => {
          console.log(err)
          var nonce = res
          var completeTx = {
            to: rawTx.to,
            value: rawTx.value,
            gas: new BN('100000'),
            data: rawTx.data,
            gasPrice: new BN('1000000000000'),
            nonce: nonce
          }

          console.log('complete tx', completeTx)
          console.log('signedtx', sign(completeTx, privateKey))
          eth.sendRawTransaction(sign(completeTx, privateKey), (error, txHash) => {
            callback(error, {
              'id': payload.id,
              'jsonrpc': '2.0',
              'result': txHash
            })
          })
        })
      } else {
        remoteLoomProvider.sendAsync(payload, function (err, res) {
          console.log(JSON.stringify(payload))
          callback(err, res)
        })
      }
    }
    LoomProviderInstance.prototype.isConnected = function () {
      return true
    }

    return new LoomProviderInstance()
  }
}
