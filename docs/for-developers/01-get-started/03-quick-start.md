---
sidebar_position: 3
---

# Quick start

After reading both installation and introduction sections, you should be familiar with our Ternoa SDK Tools (Ternoa-js and Ternoa Indexer), own your Ternoa Account, and have claimed some test CAPS on alphanet from the Faucet. **You are ready to dive-in**. 

The easiest way to way to quick-start jumping into Ternoa SDK and start building on the chain, is to download the example repository [here](https://github.com/capsule-corp-ternoa/ternoa-sdk-starter), and start our tutorial. 
After going throw the three basic exercices, you will know **how to mint, retrieve and sell an NFT**, by using our tools:

- **Ternoa-js API**: _A Javascript tool_ it self based on the Polkadot.js API. This [npm package](https://www.npmjs.com/package/ternoa-js) offers developers a seamless experience to execute transactions (called extrinsics in Polkadot/Substrate ecosystem) on the Ternoa chain, and handles all the hard work for you. Get more information [here](https://github.com/capsule-corp-ternoa/ternoa-js). 

- **Ternoa Indexer**: Our indexer is the record of the Ternoa Chain data, that can be used directly into your codebase or in a [playground](https://indexer-mainnet.ternoa.dev/).

This tutorial assumes basic knowledge of JavaScript and Node js to understand the basic functions. If you’re looking for documentation instead, visit the Ternoa [Documentation](https://docs.ternoa.network/).

## How to start

- Just download the repository and run `npm install` in the terminal.
*We already installed the ternoa-js : find it in the package.json.*

- Mint NFT: open `mintNFT.ts`. Once you read carefully the comments. Run `npm run start src/basics/mintNFT.ts`
In this 1st step, you will understand how to initialize the API and run your first on-chain transaction to create an NFT. Keep the NFT id from the log with you as you will need it later. 

- View NFT step: open `getNFT.ts`. Once you read carefully the comments and instructions. Run `npm run start src/basics/getNFT.ts`
In the 2nd step, you will see how to use our Indexer to retrieve your NFT data. 

- List NFT: open `sellNFT.ts`. Once you read carefully the comments and instructions. Run `npm run start src/basics/sellNFT.ts`
In the 3rd and last step, you will learn how to list your NFT for sale on a marketplace. 


Wow ! One single line of code to create an NFT ? One single line of code to list an NFT on a Marketplace ? Amazing right ? 
Let's go ! You are now ready to start building your own dApp using our Tools. 
