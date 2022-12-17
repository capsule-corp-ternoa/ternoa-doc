---
sidebar_position: 4
sidebar_label: 🗓️ Events
---

# Events

___

## Overview: What are chain events?

**Events are objects containing decoded values (datas)** provided by the chain in the result of any transaction triggered using the `submitTxBlocking` function.  At least one of these two `ExtrinsicSuccessEvent` or  `ExtrinsicFailedEvent` events are provided for any transaction depending on its success or fail. While `submitTxBlocking` provides the SDK handlers main events list of ***BlockchainEvents*** available, we also allow you to filter this list to get the ones you need. *An example to filter only the events list of a balance transfer transaction :*

```javascript
const balanceTransfertEvents = BlockchainEvents.findEvents(BalancesTransferEvent)
```
**note :** *BlockchainEvents is the result of `submitTxBlocking` function. It can be stored in a constant for example.*

To better understand Events, we already jumped a bit deeper than the first and easiest option to get the extrinsics events list. In case you do not need to manually sign or send your transaction, each of the Ternoa extrinsics feature comes with two functions to execute a transaction and an easy one to directly get the required events list. *See the example below :  
When the `balancesTransferTx` function creates an unsigned unsubmitted transaction hash, the `balancesTransfer` function signs and submits the transaction to provide the events list.*

___

## About the Event Design Format: 
To make the returned events data usefull, we provide both the native format and a friendly ready to use format: 
- a string as an AccountId32 correspond to a classic user valid address. 
- a string as u128 is a BN value as a string natively used under the hood by the chain.
- a rounded data (ex: amoutRounded) is the "human" version of a data, (usually a BN) that can be directly used. 
- some events from the utility pallet do not return any data.

___

## The events below are the Events handled in the Ternoa SDK sorted by categories 


```mdx-code-block
import DocCardList from '@theme/DocCardList';

<DocCardList />
```


* [Balances](https://github.com/capsule-corp-ternoa/ternoa-js/wiki/4-Events#balances)
* [Treasury](https://github.com/capsule-corp-ternoa/ternoa-js/wiki/4-Events#treasury)
* [NFT](https://github.com/capsule-corp-ternoa/ternoa-js/wiki/4-Events#nft)
* [Collection](https://github.com/capsule-corp-ternoa/ternoa-js/wiki/4-Events#collection)
* [Marketplace](https://github.com/capsule-corp-ternoa/ternoa-js/wiki/4-Events#marketplace)
* [Utility](https://github.com/capsule-corp-ternoa/ternoa-js/wiki/4-Events#utility)
* [System](https://github.com/capsule-corp-ternoa/ternoa-js/wiki/4-Events#system)