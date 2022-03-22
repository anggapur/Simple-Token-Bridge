import { config as dotEnvConfig } from 'dotenv';
import { HardhatUserConfig } from 'hardhat/types';

import '@nomiclabs/hardhat-waffle';
import '@typechain/hardhat';
import '@nomiclabs/hardhat-etherscan';
import '@nomiclabs/hardhat-ethers';
import 'hardhat-deploy';
import 'hardhat-gas-reporter';
import '@tenderly/hardhat-tenderly';
import '@asheliahut/hardhat-react';
// TODO: reenable solidity-coverage when it works
// import "solidity-coverage";
import './hardhat-tasks';

dotEnvConfig({ path: '../../.env' });

const {
  ALCHEMY_MUMBAI_API_KEY = 'YlCA4sGdtil3H7jyOsL4gVCyM6uejcEe',
  ALCHEMY_GOERLI_API_KEY = 'zVtcdA-h6cbJ0ejMFEbFKlV7warrV_Mx',
  MUMBAI_PRIVATE_KEY_0 = 'd65239b99b6e0e1b3a4fd942223e7ba541e78893144760ed414a720bc726e76f', //0x8370853B2986A04A03CA60cc3B94B99Ecc70fC4b
  GOERLI_PRIVATE_KEY_0 = 'd65239b99b6e0e1b3a4fd942223e7ba541e78893144760ed414a720bc726e76f', //0x8370853B2986A04A03CA60cc3B94B99Ecc70fC4b
  // ETHERSCAN_API_KEY = 'CSUPTC9JXMGRJCCI1SS2V17BQC1QXI26NB',
  POLYGONSCAN_API_KEY = 'B2YTWDDDV5W383MGNSRM8IXJIBX5SPMEQC',
} = process.env;

const { OPTIMIZER_DISABLED = false, OPTIMIZER_RUNS = '200' } = process.env;

const solcSettings = {
  optimizer: {
    enabled: !OPTIMIZER_DISABLED,
    runs: +OPTIMIZER_RUNS,
  },
  outputSelection: {
    '*': {
      '*': ['storageLayout'],
    },
  },
};

const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  solidity: {
    compilers: [
      {
        version: '0.8.2',
        settings: solcSettings,
      },
    ],
  },
  networks: {
    hardhat: {
      tags: ['test', 'local'],
      chainId: 80001,
      forking: {
        // url: `https://speedy-nodes-nyc.moralis.io/${SPEEDY_NODES_API_KEY}/polygon/mumbai/archive`,
        url: `https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_MUMBAI_API_KEY}`,
        blockNumber: 17077993, // See: https://mumbai.polygonscan.com/block/16638089
        // network: 'mumbai',
      },
    },
    localhost: {
      tags: ['local'],
      timeout: 60_000,
    },
    mumbai: {
      tags: ['mumbai'],
      url: `https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_MUMBAI_API_KEY}`,
      // url: `https://polygon-mumbai.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [MUMBAI_PRIVATE_KEY_0],
    },
    goerli: {
      tags: ['goerli'],
      url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_GOERLI_API_KEY}`,
      // url: `https://polygon-mumbai.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [GOERLI_PRIVATE_KEY_0],
    },
    coverage: {
      url: 'http://127.0.0.1:8555', // Coverage launches its own ganache-cli client
    },
  },
  mocha: {
    timeout: 60_000,
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/ or https://polygonscan.com/
    apiKey: POLYGONSCAN_API_KEY,
  },
  paths: {
    deployments: './deployments',
    react: '../react-app/src/generated',
  },
  typechain: {
    target: 'ethers-v5',
    outDir: '../react-app/src/generated/typechain',
    externalArtifacts: ['../deployments/external/*.json'],
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
  react: {
    providerPriority: ['web3modal', 'mumbai', 'hardhat'],
    fallbackProvider: 'mumbai',
  },
};

export default config;
