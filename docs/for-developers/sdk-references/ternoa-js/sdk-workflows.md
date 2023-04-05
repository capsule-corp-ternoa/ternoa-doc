---
sidebar_position: 3
---

# SDK Workflows 🏁

This section will go through the main workflow process to execute a transaction.
In just a few steps, you will be able to init the Ternoa SDK API and start using it.

---

## INIT THE API

It's optional, but it's good practice to initialize the API as soon as possible.
If this call is omitted, the first SDK call will return an exception. The default chain endpoint is: `DEFAULT_CHAIN_ENDPOINT = "wss://alphanet.ternoa.com"`. It can be modified by passing a new endpoint as the first argument to the _initializeApi()_ function.

```js showLineNumbers
// Import
import { initializeApi } from "ternoa-js"

async function main() {
  // Construct
  await initializeApi();

  // Do something
  console.log("Api Connected");
  ...
}
```

## How to customize the API endpoint?

Simply pass the required endpoint to the _initializeApi()_ function.

```js showLineNumbers
  ...
   //endpoint here will make the init API on the Ternoa mainnet network
   await initializeApi('wss://mainnet.ternoa.io');

   // Do something
   console.log("Api Connected on mainnet");
  ...
}
```

**Note:** Ternoa SDK provides **a very useful** `getRawApi()` function to interact with the API. If the API is connected, it will be directly returned

```js showLineNumbers
  ...
   //we assume that API has been initiated before
   const api = await getRawApi()

   // Do something
   // example : get last block
   const signedBlock = await api.rpc.chain.getBlock();
  ...
}
```

---

## Let's Create!

Now that we know how to init our SDK API, let's get into a feature example. The Ternoa-js provides _the most friendly way to build_ on the chain and execute a transaction. Let's go into detail and see an example of **how to create an NFT**.

## The most automated and easiest way

For most of the main chain features (we consider here our extrinsics) the SDK provides two functions. One of these is an all-in-one function that allows going to the entire transaction workflow process: It **Creates** a tx, **Signs** the tx, and **Submits** the tx for you in a single line function.

**_Going back to the NFT creation example:_**
This single line `createNft()` function, requires a few parameters: some offchainData metadata\*, a royalty, a collectionId if you want this NFT to belong to a collection, a boolean to define its isSoulbound status, the keyring that will be used to sign and submit the transaction, and a waitUntil callback parameter, to define at which point we want to get the results of the transaction execution.

_\*In most cases this will be an IPFS hash that points to a JSON file that contains fields such as "name", "description" or "image". In other cases, this can be a link to either a static or a dynamic file, plain text, or a small JSON string._ In the example below, we just pass a string.

```js showLineNumbers
// Imports
import { initializeApi } from "ternoa-js"
import { createNft } from "ternoa-js/nft"

const createMyFirstNFT = async () => {
  try {
    // We initialize the API instance
    await initializeApi()

    ... //we assume your keyring is already created and provided with CAPS to support transaction fees.

    // Here we create, sign and submit the NFT transaction with your keyring
    const newNFT = await createNft("My first NFT", 10, undefined, false, keyring, WaitUntil.BlockInclusion)

    // Do something
    console.log(newNFT);
    ...

  } catch (e) {
    console.log(e)
  }
}
```

## The versatile but more complex way

Now we have seen the most friendly way to create an NFT in a single line, with the automation of the workflow (**Create => Sign => Send**), we can dig a bit more. For some reason, **_you will need to go manually into the whole process_**. This way is more complex, but offers more versatility: ex if you split the process and execute it by yourself, _you will be able for example to make a batch of transactions_ (this concept is covered in the [example](#) section) instead of doing it one by one. It's very useful if you want to create a large amount of NFT and avoid signing and sending them one by one.

Let's go into the detail of each step to create an NFT manually.

### STEP 1 - Create an NFT transaction

First, instead of using the `createNft()` function, you will use the `createNftTx()`. And instead of creating, signing, and submitting the transaction and getting the returned events, it will create an unsigned and unsubmitted Create-NFT **Transaction Hash** ready to be used and valid for 5 minutes.

```js showLineNumbers
// Imports
import { initializeApi } from "ternoa-js"
import { createNftTx } from "ternoa-js/nft"

const create createNFTManually = async () => {
  try {
    ...

    // STEP 1: Here we create the transaction and get the transaction hash
    const nftTxHash = await createNftTx("My first NFT", 10, undefined, false)

    // Do something with the transaction hash
    console.log(nftTxHash);
    ...
  } catch (e) {
    console.log(e)
  }
}
```

### STEP 2 - Sign a transaction hash

Now we have the txHash, and we can move to the signing step. But before detailing it, it's good to know that _"signing"_ can be directly embedded in the submit function. It means that depending on the submit function you are using (see the last step [below](#)), _signing your tx hash before submitting might not be necessary_. In case you sign manually the tx hash, you will receive a hex value of the signed transaction ready to be sent. The `signTxHex()` function expects **a keyring** that will sign the transaction and the **transaction hash to be signed**.

```js showLineNumbers
const create createNFTManually = async () => {
  try {
    ...

    // STEP 2: Here we sign the transaction hash. nftTxHash is the name of the tx hash from the function we created before.
    const signTxHash = await signTxHex(keyring, nftTxHash)

    // Do something with the hex value.
    console.log(signTxHash);
    ...
  } catch (e) {
    console.log(e)
  }
}
```

### STEP 3 - Submit a transaction

Submitting a transaction is generally the last step of the transaction execution process. Ternoa-js provide up to 3 ways to submit a transaction. From the raw and native way to the fully handled and most easy to use. Depending on the result format you are expecting and the specific case you want to handle (simply submit, batching some transaction (...)) you will need to go with **one of the following functions** :

-   `submitTxHex()` - The most versatile and customizable way to submit your txHash. You can manage the callback function yourself. It obviously requires the hex value to be submitted, but also an optional callback. This function requires the transaction hash to be signed before being sent.

```js showLineNumbers
const create createNFTManually = async () => {
  try {
    ...

    // STEP 3.1: Here we submit the transaction hex value.
    // Here no callback function is used but the second parameter can be a callback function that helps you to handle the result.
    // Once again, we use here the tx hex signedTxHash, from the previous step.
    const submitTxHash = await submitTxHex(signTxHash)

    // Do something with the final tx hash.
    console.log(submitTxHash);
    ...
  } catch (e) {
    console.log(e)
  }
}
```

-   `submitTxBlocking()` - The most convenient way to get [Events](https://github.com/capsule-corp-ternoa/ternoa-js/wiki/Events) and data: This function will sign the transaction for you if you pass a keyring (one less thing to worry about) and it's blocking the execution flow until the transaction is either in a block or in a finalized block. Since submitting needs to work with all kinds of transactions, a result is an object that contains all the events that have happened (instead of only specific ones).

Note: Here you do not need to necessarily pass a signed txHash. If you pass the Keyring as a parameter and an unsigned tx hash as the signing process will be done here for you.

```js showLineNumbers
const create createNFTManually = async () => {
  try {
    ...

    // STEP 3.2: Here we submit the transaction hex value signed before.
    // We could have used the unsigned tx Hash and passed a keyring as a third parameter instead.
    // Once again, we use the tx hex signTxHash, from the previous step.
    const submitTxHash = await submitTxBlocking(signTxHash, WaitUntil.BlockInclusion)

    // Do something with the events received.
    console.log(submitTxHash.findEvents(NFTCreatedEvent));
    ...
  } catch (e) {
    console.log(e)
  }
}
```

-   `submitTxNonBlocking()`: This one works as the `submitTxBlocking` but in a non blocking way. It returns a pair of objects that are used to track the progress of the transaction execution. The first returned object is a conditional variable that can yield the information if the operation is finished. The second returned object is an array of events that gets populated automatically once the operation is finished.

```js showLineNumbers
const create createNFTManually = async () => {
  try {
    ...

    // STEP 3.3: It gets the same parameters as the submitTxBlocking
    // Here we submit the transaction hex value signed before.
    // We could have used the unsigned tx Hash and passed a keyring as a third parameter instead.
    // Once again, we use the tx hex signTxHash, from the previous step 2.
    const submitTxHash = await submitTxNonBlocking(signTxHash, WaitUntil.BlockInclusion)

    // Do something with the events received.
    console.log(submitTxHash);
    ...
  } catch (e) {
    console.log(e)
  }
}
```
