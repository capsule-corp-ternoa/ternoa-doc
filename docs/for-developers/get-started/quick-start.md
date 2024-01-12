---
sidebar_position: 3
sidebar_label: Quickstart NodeJS
---

# Quickstart NodeJS

## Introduction

This tutorial is designed to guide you through the process of setting up a server-side dApp that enables you to **mint, retrieve and sell an NFT** from a NodeJS application. We will achieve this by leveraging the tools provided in our SDK:

- **Ternoa-JS library**: An isomorphic NodeJS [package](https://www.npmjs.com/package/ternoa-js) that seamlessly integrates custom Ternoa FRAMEs for interacting with the blockchain. Find more information about it [here](https://github.com/capsule-corp-ternoa/ternoa-js).

- **Ternoa Indexer**: A GraphQL Indexer responsible for parsing Ternoa's on-chain data, which can be directly used into your project or accessed via our [playground](https://indexer-mainnet.ternoa.dev/) instance.

## Prerequisites

Before getting started, please ensure that you have the following prerequisites in place:

1. Create a [Ternoa account](/for-developers/get-started/create-account) with [Alphanet CAPS](/for-developers/get-started/create-account#step-2-get-some-free-test-caps-tokens) from the faucet.
2. Install and configure your preferred code editor (for this tutorial, we will be using Visual Studio Code [VSC]).
3. Install [NodeJS v.14+](https://nodejs.org/en/download/), along with NPM.
4. Generate an IPFS Key from the [Ternoa IPFS Key manager](https://ipfs-key-manager-git-dev-ternoa.vercel.app/)

:::info
We assume you have already created a new wallet for development purposes with no CAPS on Ternoa Mainnet. It is essential you use a development wallet with NO REAL MONEY in it when learning, practicing, and testing.
:::

## Getting Started

The simplest way to quickstart jumping into Ternoa SDK and begin building on the blockchain, is to download the starter repository [here](https://github.com/capsule-corp-ternoa/ternoa-sdk-starter), and start our tutorial:

```bash showLineNumbers
  git clone https://github.com/capsule-corp-ternoa/ternoa-sdk-starter.git
  cd ternoa-sdk-starter
```

We already installed the Ternoa-JS, you can directly run the following command:

```bash showLineNumbers
  npm install
```

In the `.env.exemple` file, you will find the expected environement variables. Copy and paste them into a `.env` file at the root of the project.

- `SEED_TEST_FUNDS`: Your [Ternoa account](/for-developers/get-started/create-account) _seed_ you will use to sign transactions.
- `IPFS_API_KEY`: An [IPFS KEY](/for-developers/advanced-guides/ipfs) generated with the Ternoa [IPFS Key manager](https://ipfs-key-manager-git-dev-ternoa.vercel.app/). _After being generated, the IPFS key may need a few minutes to become effective for use with the Ternoa client._

In the `src/basics/` folder we will find the following files:

- `01_mintNFT.ts`: In this 1st step, you will understand how to initialize the API and run your first on-chain transaction to create an NFT. Keep the NFT id from the log with you as you will need it later.

- `02_getNFT.ts`: In the 2nd step, you will see how to use our Indexer to retrieve your NFT data.

- `03_sellNFT.ts`: In the 3rd and last step, you will learn how to list your NFT for sale on a marketplace.

Run the following command to execute each script once you have read carefully the comments (replace FILENAME with the correct file name):

```bash showLineNumbers
  npm run start src/basics/FILENAME.ts
```

Impressive, isn't it? Just one line of code to create an NFT and another single line to list it on a marketplace. Exciting, isn't it? Now, you're all set to kickstart your dApp development journey using our toolkit. Let's get started!

## Looking for a more advanced use case?

Just follow the advanced guide:

- `01-mintSecretNFT.ts`: In this 1st advanced step you will see how to create a secret NFT, upload metadata on IPFS, encrypt content and send some private key shares on a TEE/SGX Cluster.

```bash showLineNumbers
  npm run start src/advanced/01_mintSecretNFT.ts
```
