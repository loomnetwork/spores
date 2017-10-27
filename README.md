# Loom Spores - An all-in-one package to connect your client to your DApp on Loom Network.

Loom Spores is a self-contained web3, wallet, and JsonRPC provider to connect your client-side code with your DApp.

Installation can't be simpler:

Using NPM:
```bash
npm i --save https://github.com/loomnetwork/spores.git
```

Then in your app
```js
import {default as Spores} from 'loom-spores'

//...in your application initalizer:

Spores.init(callback) //pass in any callback to be fired after spores initializes.
```

Spores will automatically include `web3.js` and also setup the correct JsonRPC provider. If you are having any issues, make sure nothing is overriding `web3`. Like Metamask, Spores will soon to be upgraded to using providers and allow for multiple instances of `web3` to exist at once.
