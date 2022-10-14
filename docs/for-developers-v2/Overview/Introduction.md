---
sidebar_position: 1
---

# Introduction

___

## OVERVIEW ⚙️

Welcome to the Ternoa-js documentation.
If you look for more global information about Ternoa, check our website [here](https://www.ternoa.com/).

_Ternoa-js has been thought with one intention_: it aims to be **one of the easiest tool to build web3 projects** on top of the Ternoa Chain. Based on Polkadot{.js} API and Javascript, it offers to developers the ability to query and interact with substrate chains like the Ternoa chain. It provides a seamless experience and allows you to start building at a glance : an extra short init and just a few lines of code and your first NFT will be live on the chain. 

### Forward together
Ternoa-js is an open-source project. Feel free to interact and move forward with us. 
If you have questions about anything related to Ternoa-js, we will be please to help you. Open a discussion on our [GitHub Discussions](https://github.com/capsule-corp-ternoa/ternoa-js/discussions). And if you find an issue, lets us know about it here in our [GitHub Issues](https://github.com/capsule-corp-ternoa/ternoa-js/issues) section. 

___


## API ARCHITECTURE

Ternoa SDK handle the main features proposed by the Ternoa chain. It allows you to run every transactions from the chain pallets, make query or ask for some constants storage. We also provides a bunch of helpers and utils functions to help you enjoying the full experience. 

### The main handlers are the ones below


* [blockchain](https://github.com/capsule-corp-ternoa/ternoa-js/tree/main/src/blockchain): the CORE blockchain function. The API brain to randomely: init the API, execute transactions, query datas, batch transactions (...)
* [account](https://github.com/capsule-corp-ternoa/ternoa-js/blob/main/src/account/): the functions that allows you to generate a new seed and a keyring
* [balance](https://github.com/capsule-corp-ternoa/ternoa-js/tree/main/src/balance): the Balance pallet with its extrinsics, query and storage.
* [nft](https://github.com/capsule-corp-ternoa/ternoa-js/tree/main/src/nft): the NFT pallet with its extrinsics, query and storage.
* [marketplace](https://github.com/capsule-corp-ternoa/ternoa-js/tree/main/src/nft): the Marketplace pallet with its extrinsics, query and storage.
* [events](https://github.com/capsule-corp-ternoa/ternoa-js/blob/main/src/events.ts): the events list returned when `submitTxBlocking` function is triggered

### Handlers architecture

For those who are familiar with Polkadot, you will quickly recognize the design structure of the features. I you do not know yet, no worries, the basic principles are easy to understand. Depending on the pallet or handler category, you will retrive:
* ***Constants*** to request the chain runtime constants.
* ***Storage*** to query the chain state.
* ***Extrinsics*** to execute the transactions.
* _Utils_ when available provides some additional usefull functions you can directly import in your project.

### Response format

As it makes senses for us to provide the easiest tools to build on the Ternoa chain, **we also tried to simplify when ever we could the response format of our functions**. Depending if you want to get things done for you or if you go with the full customizable way and handle your self your callback, we invite you to choose the right function : _Events and features datas will be provided directly on some function while only transaction hash hex will be returned on others._ We will cover this topic later in the doc.

___

## WANT MORE? 

Rather you are looking for some full exemple or short code snippet, move to the [Cookbook](#) to get a look at our most common usecases or go to the [ternoa-js dApp](https://e2e.ternoa.network/) and [github](https://github.com/capsule-corp-ternoa/ternoa-js-test-dapp) repository to get a full exemple.