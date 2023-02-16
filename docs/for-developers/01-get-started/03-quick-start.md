---
sidebar_position: 3
sidebar_label: Quickstart NodeJS
---

import CodeBlock from "@theme/CodeBlock";

# Quickstart NodeJS

## Introduction

This tutorial will teach you how to set up a server-side dApp that can **mint, retrieve and sell an NFT** from any NodeJS application, by using our tools from our SDK:

- **Ternoa-JS library**: An isomorphic NodeJs [package](https://www.npmjs.com/package/ternoa-js) integrating the custom Ternoa FRAMEs to interact with the chain in a seamless experience. Get more information [here](https://github.com/capsule-corp-ternoa/ternoa-js).

- **Ternoa Indexer**: A GraphQL Indexer parsing Ternoa on-chain data that can be used directly into your project or from our [playground](https://indexer-mainnet.ternoa.dev/) instance.

## Prerequisites

Before getting started, make sure you have the following ready:

1. Create a [Ternoa account](/for-developers/get-started/create-account) with Alphanet CAPS
2. Install and set up your editor of choice (we will use Visual Studio Code [VSC] in this tutorial)
3. Install [NodeJS v.14+](https://nodejs.org/en/download/) & NPM

## How to start

The easiest way to quickstart jumping into Ternoa SDK and start building on the chain, is to download the starter repository [here](https://github.com/capsule-corp-ternoa/ternoa-sdk-starter), and start our tutorial:

<CodeBlock language="shell" showLineNumbers>
  git clone https://github.com/capsule-corp-ternoa/ternoa-sdk-starter.git
  cd ternoa-sdk-starter
</CodeBlock>

We already installed the Ternoa-JS, you can directly run the following command:

<CodeBlock language="shell" showLineNumbers>
  npm install
</CodeBlock>

In the `src/basics/` folder we will find the following files:

- `01-mintNFT.ts`: In this 1st step, you will understand how to initialize the API and run your first on-chain transaction to create an NFT. Keep the NFT id from the log with you as you will need it later.

- `02-getNFT.ts`: In the 2nd step, you will see how to use our Indexer to retrieve your NFT data.

- `03-sellNFT.ts`: In the 3rd and last step, you will learn how to list your NFT for sale on a marketplace.

Run the following command to execute each script once you have read carefully the comments (replace FILENAME with the correct file name):

<CodeBlock language="shell" showLineNumbers>
  npm run start src/basics/FILENAME.ts
</CodeBlock>

Wow ! One single line of code to create an NFT ? One single line of code to list an NFT on a Marketplace? Amazing right?
Let's go ! You are now ready to start building your own dApp using our toolkit.
