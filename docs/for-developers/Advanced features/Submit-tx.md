---
sidebar_position: 1
sidebar_label: Sumbmit transaction
---

# Submit a transaction

Submitting a transaction is generally the last step of the transaction execution process.

Ternoa-js provide up to 3 ways to submit a transaction. From the raw and native way to the fully handled and most easy to use. Depending of the result format you are expecting and the specific case you want to handle (simply submit, batching some transaction (...)) you will need to go with **one of the following functions** : 

## `submitTxHex()`

The most versatile and customizable way to submit your txHash. You can manage the callback function yourself. It obvioulsy requires the hex value to be submitted, but also an optionnal callback. This function requires the transaction hash to be signed before being sent. 

``` js showLineNumbers
const create createNFTManually = async () => {
  try {
    ...

    // STEP 3.1 : Here we submit the transaction hex value. 
    // Here no callback function is used but the second parameter can be a callback function that help you to handle the result.
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
## `submitTxBlocking()`

The most convenient way to get [Events](https://github.com/capsule-corp-ternoa/ternoa-js/wiki/Events) and datas: This function will sign the transaction for you if you pass a keyring (one less thing to worry about) and it's blocking the execution flow until the transaction is either in a block or in a finalized block. Since submitting needs to work with all kinds of transactions, the result is an object that contains all the events that have happened (instead of only specific ones).

Note: Here you do not need to necessarily pass a signed txHash. If you pass the Keyring as a parameter and an unsigned tx hash as the signing process will be done here for you. 


``` js showLineNumbers
const create createNFTManually = async () => {
  try {
    ...

    // STEP 3.2 : Here we submit the transaction hex value signed before. 
    // We could have used the unsigned tx Hash and pass a keyring as a third parameter instead.
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

## `submitTxNonBlocking()`

This one works as the `submitTxBlocking` but in a nonblocking way. It returns a pair of objects that are used to track the progress of the transaction execution. The first returned object is a conditional variable that can yield the information if the operation is finished. The second returned objects is an array of events that gets populated automatically once the operation is finished.


``` js showLineNumbers 
const create createNFTManually = async () => {
  try {
    ...

    // STEP 3.3 : It get the same parameters as the submitTxBlocking
    // Here we submit the transaction hex value signed before. 
    // We could have used the unsigned tx Hash and pass a keyring as a third parameter instead.
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