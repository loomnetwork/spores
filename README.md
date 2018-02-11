# EthDeploy Spores - An all-in-one package to connect your client to your DApp on EthDeploy.

Warning: EthDeploy infrastructure is only lightly maintained as we're lacking in development resources.

Loom Spores is a self-contained web3, wallet, and JsonRPC provider to connect your client-side code with your DApp.

Installation can't be simpler:

Using NPM:
```bash
npm i --save https://github.com/loomnetwork/spores.git
```

Then in your app
```js
import {default as Spores} from 'ethdeploy-spores'

//...in your application initalizer:

Spores.init(providerHandlerFunc, '/_loom/accounts', callback) // call init and pass in any function to handle the resulting provider.
```

Spores will automatically include `web3.js` and also setup the correct JsonRPC provider. If you are having any issues, make sure nothing is overriding `web3`. Like Metamask, Spores will soon to be upgraded to using providers and allow for multiple instances of `web3` to exist at once.

## Sample implementation

```js

import axios from 'axios' //lightweight ajax library

import {default as Spores} from 'ethdeploy-spores'
import {default as contract} from 'truffle-contract'

var SampleContract = contract(contractJson)

var recurringNetworkCheck = function (callback, router) {
  axios.get('/_loom/network')
  .then(function (res) {
    var defaultNetwork = res.data.network

    if (defaultNetwork === 'loom') {
      Spores.init(SampleContract.setProvider, '/_loom/accounts', initApp)

      return true
    } else {
      if (window.web3 && window.web3.currentProvider) {
        providerHandlerFunc(window.web3.currentProvider)
        return true
      } else {
        router.push({path: '/error_install_meta_mask'})
      }
    }
  })
  .catch(function (error) {
    console.log(error)
  })
}

var initApp = function () {
  window.web3.eth.getAccounts(function (err, accs) {
    if (err != null) {
      alert('There was an error fetching your accounts.')
      return
    }

    if (accs.length === 0) {
      alert('Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.')
      return
    }

    Spores.getContracts('/_loom/contracts').then(function (contracts) {
      window.contractAddress = contracts[0]['Address']
      SampleContract.at(contracts[0]['Address']).then(function (instance) {
        window.SampleContractInstasnce = instance // debugging
        // todo would be nice to find out how large the list is in advance
        for (var i = 0; i < 20; i++) {
          window.SampleContractInstasnce.sshPublicKeys.call(i).then(function (v) {
            alert(v.toString())
          })
        }
      })
    })
  })
}

setTimeout(function () { recurringNetworkCheck(self, self.$router) }, 3000)

```
