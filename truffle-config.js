const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();
const alchemyKey = fs.readFileSync(".alchemy").toString().trim();

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
      gas: 6700000,
      gasPrice: 5000000000
    },
    mumbai: {
      provider: function() {
        return new HDWalletProvider(mnemonic, `https://polygon-mumbai.g.alchemy.com/v2/${alchemyKey}`)
      },
      network_id: 80001,
      networkCheckTimeout: 1000000,
      //confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
      gas: 20000000,
      gasPrice: 5000000000
    }    
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.6.6",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    },
  },
};
