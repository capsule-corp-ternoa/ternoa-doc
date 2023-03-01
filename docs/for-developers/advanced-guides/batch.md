---
sidebar_position: 3
sidebar_label: Utility Batch
---

# Utility Batch

## Batch/BatchAll

`batchTxHex` or `batchAllTxHex` functions can be implemented into the execution process of a transaction. Both transactions do the same and expect the same parameters. The difference is that with the "batch" one, our transactions will be executed until one fails and at that point it will not continue to the next batched transaction. With "batchAll" it will first try to do them all, and if anyone fails it will revert the successful ones and the state of the chain will not change. _The general rule of thumb is to always use the **batchAll transaction**._

`batchTx` or `batchAllTx` functions also exist and return both the tx hash but not in _hex_ format. They both work exactly the same.

As an example, this can be useful **if you want to create a large amount of NFT** : Instead of creating all the NFTs one by one, it's recommended, in cases where more than one operation needs to be done, to group them all and to executed them as one transaction. This allows you to save on transaction fees and most importantly to save on time.

### Let's assume we are trying to batch a mint of NFT

In this example we are going to run the `batchAllTxHex` but because we want the process to stop and revert in case of error and an hex format as result, but `batchTxHex`, `batchTx` or `batchAllTx` could be used with the exact same code below.

```js showLineNumbers

export const nftsBatchMintingHex = async (nftMetadata, quantity) => {
  // nftMetaData represents here the offChain datas of the NFT.
  // quantity is the number of NFT to be minted
  try{
  ...
    // First we create the NFT
    const nftTx = await createNftTx(nftMetadata, 0, undefined, false)
    // Second we add all the NFT in an Array
    const nftsTxs = new Array(Number(quantity)).fill(nftTx)
    // We batch the transaction with the batchAllTxHex function
    return await batchAllTxHex(nftsTxs)
  ...
  }catch(error){
    console.log(error)
  }
}

```

In this example, we show a way to check if the `batch` is completed or interrupted. Keep in mind that BatchTx Extrinsic is considered as successful even when interrupted. It does not mean that all tx are validated: the chain provide the `ExtrinsicSuccess` event anyway. A good practice would be to monitor `BatchCompleted` and check with our findEvent function if a `BatchInterrupted` Event has been thrown within the Batch. If a BatchCompleted event is available, it means that the batch has not been interrupted. Otherwise, the batch has been interrupted at some point. Check the event list.

```js showLineNumbers

export const batchTx = async () => {
  try {
    ...
    // we assume the API is initialized and the Keyring has been recovered.
    // We create a first tx and get the hash : a collection without limit
    const signableCollection = await createCollectionTx("BatchCollectionTestings", undefined)
    // We create a second tx with a wrong parameter to interupt the batch : a collection id that does not exist in the chain for now
    const signableNFT = await createNftTx("create NFT with wrong collection Id to interupte batch", 0, 1000, false)
    // We batch both hash in an array []
    const signableBatchTx = await batchTxHex([signableCollection, signableNFT])
    // We sign and submit the tx to get the event list
    const batchedEvents = await submitTxBlocking(signableBatchTx, WaitUntil.BlockInclusion, keyring)
    // We check if the event list has a BatchCompletedEvent
    const isBatchCompleted = batchedEvents.findEvents(BatchCompletedEvent)
    // if the event list is equal to 0 (not BatchCompletedEvent), we provide the BatchInterruptedEvent with the error detail.
    if (isBatchCompleted.length <= 0) {
      return batchedEvents.findEvents(BatchInterruptedEvent)
    }
    // We return the full event list if it contains a BatchCompletedEvent
    return batchedEvents
  } catch (err) {
    console.log(err)
  }
}
// The expected output:
//[
//  BatchInterruptedEvent {
//    raw: Type(2) [Map] {
//      ...
//    },
//    type: 'utility.BatchInterrupted',
//    section: 'utility',
//    method: 'BatchInterrupted',
//    index: 1, // index of the interupted item.
//    dispatchError: { ... },
//    errorType: 'CollectionNotFound',
//    details: 'No Collection was found with that NFT id.'
//  }
]

```
