sidebar_position

1

# [](https://github.com/capsule-corp-ternoa/ternoa-doc/blob/develop/docs/for-developers/sdk/introduction.md#introduction)Introduction

----------

## [](https://github.com/capsule-corp-ternoa/ternoa-doc/blob/develop/docs/for-developers/sdk/introduction.md#overview-%EF%B8%8F)Overview  ⚙️

Welcome to the Ternoa-js developer documentation. Ternoa-js main objective is to be: **one of the most user-friendly tools to build web3 projects** on top of the Ternoa Chain. Based on Polkadot{.js} API and Javascript, it offers developers the ability to query and interact with substrate chains like the Ternoa chain. It provides a seamless experience and allows you to start building at a glance: an extra short init and just a few lines of code, and your first NFT will be live on the chain.

### [](https://github.com/capsule-corp-ternoa/ternoa-doc/blob/develop/docs/for-developers/sdk/introduction.md#forward-together)Forward Together

Ternoa-js is an open-source project. Feel free to interact and move forward with us. If you have questions about anything related to Ternoa, need help, or want to request features, you can open a discussion on our [GitHub Discussions]([https://github.com/capsule-corp-ternoa/ternoa-js/discussions](https://github.com/capsule-corp-ternoa/ternoa-js/discussions)) And if you find an issue, lets us know in our [GitHub Issues]([https://github.com/capsule-corp-ternoa/ternoa-js/issues](https://github.com/capsule-corp-ternoa/ternoa-js/issues)) section.



## [](https://github.com/capsule-corp-ternoa/ternoa-doc/blob/develop/docs/for-developers/sdk/introduction.md#api-architecture)API Architecture

Ternoa SDK handles the main features proposed by the Ternoa chain. It allows you to run every transaction from the chain pallets, make a query or ask for some constants storage. We also provide a bunch of helpers and utils functions to help you enjoy the entire experience.

### [](https://github.com/capsule-corp-ternoa/ternoa-doc/blob/develop/docs/for-developers/sdk/introduction.md#the-main-handlers-are-the-ones-below)The main handlers are the ones below:

-   [blockchain](https://github.com/capsule-corp-ternoa/ternoa-js/tree/main/src/blockchain): the CORE blockchain function. The API brain to randomly: init the API, execute transactions, query datas, batch transactions, etc.
-   [account](https://github.com/capsule-corp-ternoa/ternoa-js/blob/main/src/account/): the functions that allows you to generate a new seed and a keyring
-   [balance](https://github.com/capsule-corp-ternoa/ternoa-js/tree/main/src/balance): the Balance pallet with its extrinsics, query and storage.
-   [nft](https://github.com/capsule-corp-ternoa/ternoa-js/tree/main/src/nft): the NFT pallet with its extrinsics, query and storage.
-   [marketplace](https://github.com/capsule-corp-ternoa/ternoa-js/tree/main/src/nft): the Marketplace pallet with its extrinsics, query and storage.
-   [events](https://github.com/capsule-corp-ternoa/ternoa-js/blob/main/src/events.ts): the events list returned when  `submitTxBlocking`  function is triggered

### [](https://github.com/capsule-corp-ternoa/ternoa-doc/blob/develop/docs/for-developers/sdk/introduction.md#handlers-architecture)Handlers Architecture

For those familiar with Polkadot, you will quickly recognize the design structure of the features. If you don't know yet, no worries, the basic principles are easy to understand. Depending on the pallet or handler category, you will retrieve the following:

-   _**Constants**_  to request the chain runtime.
-   _**Storage**_  to query the chain state.
-   _**Extrinsics**_  to execute the transactions.
-   _Utils_  when available provides some additional usefull functions you can directly import in your project.

### [](https://github.com/capsule-corp-ternoa/ternoa-doc/blob/develop/docs/for-developers/sdk/introduction.md#response-format)Response Format

As it makes sense for us to provide the most accessible tools to build on the Ternoa chain,  **we also tried to simplify the response format of our functions whenever we could**. Depending if you want to get things done for you or if you go with the fully customizable way and handle your callback, we invite you to choose the correct function:  _Events and features datas will be provided directly on some function while only transaction hash hex will be returned on others._  We will cover this topic later in the doc.



## [](https://github.com/capsule-corp-ternoa/ternoa-doc/blob/develop/docs/for-developers/sdk/introduction.md#want-more)Ready to discover more?

If you are looking for full examples or short code snippet, move to the  [Cookbook](https://github.com/capsule-corp-ternoa/ternoa-doc/blob/develop/docs/for-developers/sdk/introduction.md#)  to get a look at our most common use-cases or go to the  [ternoa-js dApp](https://e2e.ternoa.network/)  and  [github](https://github.com/capsule-corp-ternoa/ternoa-js-test-dapp)  repository to get a full example.