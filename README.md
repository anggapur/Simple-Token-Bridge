This project was bootstrapped with [Create Eth App](https://github.com/paulrberg/create-eth-app).

## Project Structure

The default template is a monorepo created with [Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/).

Workspaces makes it possible to setup multiple packages in such a way that we only need to run `yarn install` once to install all of them in
a single pass. Dependencies are hoisted at the root.

```
my-eth-app
├── README.md
├── node_modules
├── package.json
├── .gitignore
└── packages
    ├── contracts
    │   ├── README.json
    │   ├── package.json
    │   └── src
    │       ├── abis
    │       │   ├── erc20.json
    │       │   └── ownable.json
    │       ├── addresses.js
    │       └── index.js
    ├── react-app
    │   ├── README.md
    │   ├── node_modules
    │   ├── package.json
    │   ├── public
    │   │   ├── favicon.ico
    │   │   ├── index.html
    │   │   ├── logo192.png
    │   │   ├── logo512.png
    │   │   ├── manifest.json
    │   │   └── robots.txt
    │   └── src
    │       ├── App.css
    │       ├── App.js
    │       ├── App.test.js
    │       ├── ethereumLogo.svg
    │       ├── index.css
    │       ├── index.js
    │       ├── serviceWorker.js
    │       └── setupTests.js
    └── subgraph
        ├── README.md
        ├── abis
        │   └── erc20.json
        ├── package.json
        ├── schema.graphql
        ├── src
        │   └── mappings
        │       ├── tokens.ts
        │       └── transfers.ts
        └── subgraph.yaml
```

Owing to this dependency on Yarn Workspaces, Create Eth App can't be used with npm.

## Available Scripts

In the project directory, you can run:

### React App

#### `yarn react-app:start`

Runs the React app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will automatically reload if you make changes to the code.<br>
You will see the build errors and lint warnings in the console.

#### `yarn react-app:test`

Runs the React test watcher in an interactive mode.<br>
By default, runs tests related to files changed since the last commit.

[Read more about testing React.](https://facebook.github.io/create-react-app/docs/running-tests)

#### `yarn react-app:build`

Builds the React app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the React documentation on [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `yarn react-app:eject`

**Note: this is a one-way operation. Once you `react-app:eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` the React app at any time. This command will
remove the single build dependency from your React package.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right
into the `react-app` package so you have full control over them. All of the commands except `react-app:eject` will still work,
but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `react-app:eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Subgraph

The Graph is a tool for for indexing events emitted on the Ethereum blockchain. It provides you with an easy-to-use GraphQL API. <br/>

To learn more, check out the [The Graph documentation](https://thegraph.com/docs).

#### `yarn subgraph:codegen`

Generates AssemblyScript types for smart contract ABIs and the subgraph schema.

#### `yarn subgraph:build`

Compiles the subgraph to WebAssembly.

#### `yarn subgraph:auth`

Before deploying your subgraph, you need to sign up on the
[Graph Explorer](https://thegraph.com/explorer/). There, you will be given an access token. Drop it in the command
below:

```sh
GRAPH_ACCESS_TOKEN=your-access-token-here yarn subgraph:auth
```

#### `yarn subgraph:deploy`

Deploys the subgraph to the official Graph Node.<br/>

Replace `paulrberg/create-eth-app` in the package.json script with your subgraph's name.

You may also want to [read more about the hosted service](https://thegraph.com/docs/quick-start#hosted-service).

---

## Step by Step running INFI dAPP

### Instalation

Clone Repository

```
git clone git@github.com:Itsavirus-com/infi.git
```

Install Depedencies

```
yarn install
```

### Setup Hardhat & Compile Contracts

Setup hardhat-config.ts, change value of **config.networks.hardhat.forking.url** to JSON RPC URL that connect to Mumbai Network

Compile Solidity Contracts

```
yarn solidity compile
```

If you wanna running the Tests, run this script

```
yarn solidity test
```

### Start the Local Node

Start the local node, this script will automatically deploy all the Contracts and do the forking from mumbai testnet

```
yarn solidity start
```

### Setup Frontend

We need to setup couple config files on frontend to pointing to local network.
Open **packages/contracts/src/addresses.ts** file, and change the import section to this list. We're comment out some ABI json that pointing to mumbai network and replace it to ABI json foles that pointing to local network.

```
import { address as goerliDAI } from '../deployments/goerli/DAI.json';
import { address as goerliUSDC } from '../deployments/goerli/FiatTokenProxyUSDC.json';
import { address as goerliINFI } from '../deployments/goerli/INFI.json';
import { address as goerliUSDT } from '../deployments/goerli/USDT.json';
import { address as ClaimData } from '../deployments/localhost/ClaimData.json';
import { address as ClaimGateway } from '../deployments/localhost/ClaimGateway.json';
import { address as ClaimHelper } from '../deployments/localhost/ClaimHelper.json';
import { address as CollectiveClaimGateway } from '../deployments/localhost/CollectiveClaimGateway.json';
import { address as CoverData } from '../deployments/localhost/CoverData.json';
import { address as CoverGateway } from '../deployments/localhost/CoverGateway.json';
import { address as Encode } from '../deployments/localhost/Encode.json';
import { address as ListingData } from '../deployments/localhost/ListingData.json';
import { address as ListingGateway } from '../deployments/localhost/ListingGateway.json';
import { address as PlatformData } from '../deployments/localhost/PlatformData.json';
import { address as Pool } from '../deployments/localhost/Pool.json';
import { address as mainnetDAI } from '../deployments/mainnet/DAI.json';
import { address as mainnetINFI } from '../deployments/mainnet/INFI.json';
import { address as mainnetUSDC } from '../deployments/mainnet/USDC.json';
import { address as mainnetUSDT } from '../deployments/mainnet/USDT.json';
import { address as maticDAI } from '../deployments/matic/UChildERC20ProxyDAI.json';
import { address as maticUSDC } from '../deployments/matic/UChildERC20ProxyUSDC.json';
import { address as maticUSDT } from '../deployments/matic/UChildERC20ProxyUSDT.json';
// import { address as ClaimData } from '../deployments/mumbai/ClaimData.json';
// import { address as ClaimGateway } from '../deployments/mumbai/ClaimGateway.json';
// import { address as ClaimHelper } from '../deployments/mumbai/ClaimHelper.json';
// import { address as CollectiveClaimGateway } from '../deployments/mumbai/CollectiveClaimGateway.json';
// import { address as CoverData } from '../deployments/mumbai/CoverData.json';
// import { address as CoverGateway } from '../deployments/mumbai/CoverGateway.json';
// import { address as Encode } from '../deployments/mumbai/Encode.json';
// import { address as ListingData } from '../deployments/mumbai/ListingData.json';
// import { address as ListingGateway } from '../deployments/mumbai/ListingGateway.json';
// import { address as PlatformData } from '../deployments/mumbai/PlatformData.json';
// import { address as Pool } from '../deployments/mumbai/Pool.json';
import { address as mumbaiUDAI } from '../deployments/mumbai/UChildDAI.json';
import { address as mumbaiDAI } from '../deployments/mumbai/UChildERC20ProxyDAI.json';
import { address as mumbaiINFI } from '../deployments/mumbai/UChildERC20ProxyINFI.json';
import { address as mumbaiUSDC } from '../deployments/mumbai/UChildERC20ProxyUSDC.json';
import { address as mumbaiUSDT } from '../deployments/mumbai/UChildERC20ProxyUSDT.json';
import { address as mumbaiUINFI } from '../deployments/mumbai/UChildINFI.json';
import { address as mumbaiUUSDC } from '../deployments/mumbai/UChildUSDC.json';
import { address as mumbaiUUSDT } from '../deployments/mumbai/UChildUSDT.json';
```

Open _packages/react-app/src/constants/URLConstants.tsx_ file, and adjust the content to

```
const URLConstants = {
  GRAPHQL_URL:
    'http://127.0.0.1:8000/subgraphs/name/Itsavirus-com/infi',
  PRICE_FEEDS_URL:
    'https://api.thegraph.com/subgraphs/name/anggapurnajiwa/chainlink-mumbai-price-feeds',
  RPC_URL:
    'https://polygon-mumbai.g.alchemy.com/v2/YlCA4sGdtil3H7jyOsL4gVCyM6uejcEe',
  COIN_PRICE_URL: (source: string, destination: string): string =>
    `https://ct8wiri3sd.execute-api.us-east-1.amazonaws.com/prod/getPrice/${source}/${destination}`,
  BLOCKCHAIN_EXPLORER_URL: `https://mumbai.polygonscan.com`,
};

export default URLConstants;
```

Build Contracts Packages

```
yarn contracts build
```

Run the Solidity React

```
yarn solidity react
```

Run the Frontend

```
yarn react-app start
```

### Setup Local Subgraph

Clone Local Graph Node

```
git clone --branch=v0.22.0 --depth=1 https://github.com/graphprotocol/graph-node/ ../graph-node

# For Linux users only:
# cd ../graph-node/docker
# ./setup.sh
```

Start the Local Graph Node

```
# Ensure Hardhat network node (local simulator) has started
# yarn solidity start

(cd ../graph-node/docker; docker-compose up)
```

Adjust the subgraph.yml file configuration, you need to manually setup the line/part that have comments

```
specVersion: 0.0.2
description: Subgraph that indexes the blockchain data for INFI Project (Regression)
repository: https://github.com/sablierhq/sablier-subgraph
schema:
  file: ./schema.graphql
dataSources:
  - kind: ethereum/contract
    name: ListingData
    network: mainnet # Change this part to mainnet on local network
    source:
      startBlock: # Fill with the current latest block on your local node
      address: # Fill with ListingData Contract address
      abi: ListingData
    mapping:
      kind: ethereum/events
      apiVersion: 0.0.4
      language: wasm/assemblyscript
      entities:
        - ListingData
      abis:
        - name: ListingData
          file: ../contracts/deployments/localhost/ListingData.json # on solidity folder or contracts folder
      eventHandlers:
        - event: CreateRequest(uint256,indexed address,(uint256,uint8,uint256,uint256,uint8,uint256,uint8,uint256,string,(uint8,uint256[]),uint8,address),(string,string,uint256,uint256,uint8,bytes32,bytes32),(string,string,uint256,uint256,uint8,bytes32,bytes32))
          handler: handleCreateRequest
        - event: CreateOffer(uint256,indexed address,(uint8,uint256,uint8,uint256,uint8,uint256,string,(uint8,uint256[]),uint8,address),(string,string,uint256,uint256,uint8,bytes32,bytes32),(string,string,uint256,uint256,uint8,bytes32,bytes32),uint8)
          handler: handleCreateOffer
        - event: RequestFullyFunded(uint256,uint256)
          handler: handleRequestFullyFunded
        - event: DepositTakenBack(uint256)
          handler: handleDepositTakenBack
        - event: DepositOfOfferTakenBack(uint256)
          handler: handlerDepositOfOfferTakenBack
        - event: PremiumRefunded(uint256)
          handler: handlePremiumRefunded
      file: ./src/mappings/listingData.ts
  - kind: ethereum/contract
    name: PlatformData
    network: mainnet # Change this part to mainnet on local network
    source:
      startBlock: # Fill with the current latest block on your local node
      address: # Fill with PlatformData Contract address
      abi: PlatformData
    mapping:
      kind: ethereum/events
      apiVersion: 0.0.4
      language: wasm/assemblyscript
      entities:
        - PlatformData
      abis:
        - name: PlatformData
          file: ../contracts/deployments/localhost/PlatformData.json #on solidity folder or contracts folder
      eventHandlers:
        - event: NewPlatform(uint256,string,string)
          handler: handleNewPlatform
        - event: NewOracle(uint256,string,string)
          handler: handleNewOracle
        - event: NewCustodian(uint256,string,string)
          handler: handleNewCustodian
        - event: NewPriceFeed(string,uint256,uint256,uint256,uint8,address)
          handler: handleNewPriceFeed
      file: ./src/mappings/listingData.ts
  - kind: ethereum/contract
    name: Pool
    network: mainnet # Change this part to mainnet on local network
    source:
      startBlock: # Fill with the current latest block on your local node
      address: # Fill with Pool Contract address
      abi: Pool
    mapping:
      kind: ethereum/events
      apiVersion: 0.0.4
      language: wasm/assemblyscript
      entities:
        - Pool
      abis:
        - name: Pool
          file: ../contracts/deployments/localhost/Pool.json #on solidity folder or contracts folder
      eventHandlers:
        - event: TokensReceived(indexed address,indexed address,uint256,bytes)
          handler: handleTokensReceived
      file: ./src/mappings/tokensReceived.ts
  - kind: ethereum/contract
    name: CoverData
    network: mainnet # Change this part to mainnet on local network
    source:
      startBlock: # Fill with the current latest block on your local node
      address: # Fill with CoverData Contract address
      abi: CoverData
    mapping:
      kind: ethereum/events
      apiVersion: 0.0.4
      language: wasm/assemblyscript
      entities:
        - CoverData
      abis:
        - name: CoverData
          file: ../contracts/deployments/localhost/CoverData.json
      eventHandlers:
        - event: Cover(uint256,(uint256,uint256,uint8,address,uint256,uint256),uint256,uint8,address)
          handler: handleCover
        - event: Booking(uint256,(uint256,address,uint256))
          handler: handleBooking
        - event: CoverPremiumCollected(uint256)
          handler: handleCoverPremiumCollected
      file: ./src/mappings/covers.ts
  - kind: ethereum/contract
    name: ListingGateway
    network: mainnet # Change this part to mainnet on local network
    source:
      startBlock: # Fill with the current latest block on your local node
      address: # Fill with ListingGateway Contract address
      abi: ListingGateway
    mapping:
      kind: ethereum/events
      apiVersion: 0.0.4
      language: wasm/assemblyscript
      entities:
        - ListingGateway
      abis:
        - name: ListingGateway
          file: ../contracts/deployments/localhost/ListingGateway.json
      blockHandlers:
        - handler: handleUpdateCoverOffer
      file: ./src/mappings/covers.ts
  - kind: ethereum/contract
    name: ClaimData
    network: mainnet # Change this part to mainnet on local network
    source:
      startBlock: # Fill with the current latest block on your local node
      address: # Fill with ClaimData Contract address
      abi: ClaimData
    mapping:
      kind: ethereum/events
      apiVersion: 0.0.4
      language: wasm/assemblyscript
      entities:
        - ClaimData
      abis:
        - name: ClaimData
          file: ../contracts/deployments/localhost/ClaimData.json
      eventHandlers:
        - event: ClaimRaise(uint256,uint256,uint256,address,uint80,uint256)
          handler: handleClaim
        - event: CollectiveClaimRaise(uint256,uint256,uint256,address,uint256,uint256)
          handler: handleCollectiveClaim
      file: ./src/mappings/claimDataMapping.ts
  - kind: ethereum/contract
    name: ClaimGateway
    network: mainnet # Change this part to mainnet on local network
    source:
      startBlock: # Fill with the current latest block on your local node
      address: # Fill with ClaimGateway Contract address
      abi: ClaimGateway
    mapping:
      kind: ethereum/events
      apiVersion: 0.0.4
      language: wasm/assemblyscript
      entities:
        - ClaimGateway
      abis:
        - name: ClaimGateway
          file: ../contracts/deployments/localhost/ClaimGateway.json
      eventHandlers:
        - event: ValidClaim(uint256,uint256,uint8,uint256)
          handler: handleValidClaim
        - event: InvalidClaim(uint256,uint256)
          handler: handleInvalidClaim
      file: ./src/mappings/claimGatewayMapping.ts
  - kind: ethereum/contract
    name: ClaimHelper
    network: mainnet # Change this part to mainnet on local network
    source:
      startBlock: # Fill with the current latest block on your local node
      address: # Fill with ClaimHelper Contract address
      abi: ClaimHelper
    mapping:
      kind: ethereum/events
      apiVersion: 0.0.4
      language: wasm/assemblyscript
      entities:
        - ClaimHelper
      abis:
        - name: ClaimHelper
          file: ../contracts/deployments/localhost/ClaimHelper.json
      eventHandlers:
        - event: ExpiredValidClaim(uint256,uint256,uint8,uint256)
          handler: handleExpiredValidClaim
        - event: ExpiredInvalidClaim(uint256,uint256)
          handler: handleExpiredInvalidClaim
      file: ./src/mappings/claimHelperMapping.ts
  - kind: ethereum/contract
    name: CollectiveClaimGateway
    network: mainnet # Change this part to mainnet on local network
    source:
      startBlock: # Fill with the current latest block on your local node
      address: # Fill with CollectiveClaimGateway Contract address
      abi: CollectiveClaimGateway
    mapping:
      kind: ethereum/events
      apiVersion: 0.0.4
      language: wasm/assemblyscript
      entities:
        - CollectiveClaimGateway
      abis:
        - name: CollectiveClaimGateway
          file: ../contracts/deployments/localhost/CollectiveClaimGateway.json
      eventHandlers:
        - event: ValidCollectiveClaim(uint256,uint256,uint8,uint256)
          handler: handleValidCollectiveClaim
        - event: InvalidCollectiveClaim(uint256,uint256)
          handler: handleInvalidCollectiveClaim
      file: ./src/mappings/collectiveClaimGatewayMapping.ts

```

Setup the ListingGateway Contract address on _packages/subgraph/src/mappings/utils/constants.ts_ file

```
export const listingGatewayAddr = Address.fromString(
  'Put ListingGateway Contract Address Here'
);
```

Deploy and Start Subgraph Locally

```
yarn subgraph codegen

# Deploy to local
yarn subgraph create-local
yarn subgraph deploy-local
```

### Time Travel

Because we forking from a block number to start the local node, the time on local node not will not match with actual time on your machine, you need to time travel to match it up.

```
yarn solidity run-local scripts/timeTravel.ts
```

### Voila

That's all, Let's Start to use the dApp!
Just make sure we have add the Local network on Metamask!
