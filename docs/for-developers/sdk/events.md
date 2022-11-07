---
sidebar_position: 4
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
* [Balances](https://github.com/capsule-corp-ternoa/ternoa-js/wiki/4-Events#balances)
* [Treasury](https://github.com/capsule-corp-ternoa/ternoa-js/wiki/4-Events#treasury)
* [NFT](https://github.com/capsule-corp-ternoa/ternoa-js/wiki/4-Events#nft)
* [Collection](https://github.com/capsule-corp-ternoa/ternoa-js/wiki/4-Events#collection)
* [Marketplace](https://github.com/capsule-corp-ternoa/ternoa-js/wiki/4-Events#marketplace)
* [Utility](https://github.com/capsule-corp-ternoa/ternoa-js/wiki/4-Events#utility)
* [System](https://github.com/capsule-corp-ternoa/ternoa-js/wiki/4-Events#system)

___

## Balances
- ### BalancesWithdrawEvent 
	- **Summary:** Some amount was withdrawn from the account
	- **Datas returned:** 
		- who: *string as AccountId32*
  		- amount: *string as u128*
  		- amountRounded: *number*

- ### BalancesDepositEvent 
	- **Summary:** Some amount was deposited.
	- **Datas returned:** 
		- who: *string as AccountId32*
  		- amount: *string as u128*
  		- amountRounded: *number*

- ### BalancesTransferEvent 
	- **Summary:** Transfer succeeded.
	- **Datas returned:** 
  		- from: *string as AccountId32*
		- to: *string as AccountId32*
  		- amount: *string as u128*
  		- amountRounded: *number*

- ### BalancesEndowedEvent
	- **Summary:** An account was created with some free balance
	- **Datas returned:** 
  		- account: *string as AccountId32*
		- to: *string as AccountId32*
  		- freeBalance: *string as u128*
  		- freeBalanceRounded: *number*

[Back to top](https://github.com/capsule-corp-ternoa/ternoa-js/wiki/4-Events)
___

## Treasury
- ### TreasuryDepositEvent
	- **Summary:** Some funds have been deposited.
	- **Datas returned:** 
  		- account: *string as AccountId32*
		- to: *string as AccountId32*
  		- value: *string as u128*
  		- valueRounded: *number*

[Back to top](https://github.com/capsule-corp-ternoa/ternoa-js/wiki/4-Events)

___

## NFT
 - ### NFTCreatedEvent 
	- **Summary:** An NFT has been created.
	- **Datas returned:** 
  		- event : *event*
  		- nftId: *number*
  		- owner: *string as AccountId32*
  		- offchainData: *string*
  		- royalty: *number*
  		- collectionId: *number or null*
  		- isSoulbound: *boolean*
  		- mintFee: *string as u128*
  		- mintFeeRounded: *number*

 - ### NFTBurnedEvent
	- **Summary:** An NFT has been burned.
	- **Datas returned:** 
  		- nftId: *number*

 - ### NFTDelegatedEvent
	- **Summary:** An NFT has been delegated.
	- **Datas returned:** 
  		-  nftId: *number*
  		-  recipient: *string as AccountId32 or null*

 - ### NFTRoyaltySetEvent 
	- **Summary:** The NFT's royalty has been set.
	- **Datas returned:** 
  		- nftId: *number*
  		- royalty: *number*

 - ### NFTTransferredEvent
	- **Summary:** An NFT has been transferred.
	- **Datas returned:** 
  		- nftId: *number*
  		- sender: *string as AccountId32*
  		- recipient: *string*

 - ### NFTAddedToCollection 
	- **Summary:** An NFT has been added to a collection.
	- **Datas returned:** 
  		-   nftId: *number*
  		-   collectionId: *number*
 
[Back to top](https://github.com/capsule-corp-ternoa/ternoa-js/wiki/4-Events)

___

## Collection
 - ### CollectionCreatedEvent 
	- **Summary:** A Collection has been created.
	- **Datas returned:** 
  		- collectionId: *number*
  		- owner: *string as AccountId32*
  		- offchainData: *string*
  		- limit: *number or null*

 - ### CollectionLimitedEvent 
	- **Summary:** The collection's limit has been set.
	- **Datas returned:** 
  		- collectionId: *number*
  		- limit: *number*
 
 - ### CollectionClosedEvent
	- **Summary:** A collection has been closed.
	- **Datas returned:** 
  		- collectionId: *number*

- ### CollectionBurnedEvent
	- **Summary:** A collection has been burned.
	- **Datas returned:** 
  		- collectionId: *number*

[Back to top](https://github.com/capsule-corp-ternoa/ternoa-js/wiki/4-Events)

___

## Marketplace
 - ### MarketplaceCreatedEvent 
	- **Summary:** A marketplace has been created.
	- **Datas returned:** 
  		- marketplaceId: *number*
  		- owner: *string as AccountId32*
  		- kind: *the marketplace kind : Public or Private*

 - ### MarketplaceOwnerSetEvent
	- **Summary:** The marketplace owner has been set.
	- **Datas returned:** 
  		-  marketplaceId: *number*
  		-  owner: *string as AccountId32*

 - ### MarketplaceKindSetEvent
	- **Summary:** The marketplace kind has been set.
	- **Datas returned:** 
  		- marketplaceId: *number*
  		- kind: *the marketplace kind : Public or Private*

 - ### MarketplaceConfigSetEvent
	- **Summary:** The marketplace configuration has been updated. Parameters can be unchanged (Noop), Removed or Set
	- **Datas returned:** 
  		- marketplaceId: *number*
  		- commissionFeeType: *optional string : Remove or Set*
  		- commissionFee: *optional string*
  		- commissionFeeRounded: *optional Number*
  		- listingFeeType: *optional string : Remove or Set*
  		- listingFee: *optional string*
  		- listingFeeRounded: *optional Number*
  		- accountList: *optional Array of strings as AccountId32*
  		- offchainData: *optional string*
 
 - ### MarketplaceMintFeeSetEvent 
	- **Summary:** The marketplace mint fee has been set.
	- **Datas returned:** 
  		-  fee: *string*
  		-  feeRounded: *number*

 - ### NFTListedEvent
	- **Summary:** An NFT has been listed for sale on a marketplace.
	- **Datas returned:** 
  		-  nftId: *number*
  		-  marketplaceId: *number*
  		-  price: *string*
  		-  priceRounded: *number*
  		-  commissionFeeType: *optional string : Percentage or Flat value*
  		-  commissionFee: *optional string*
  		-  commissionFeeRounded: *optional number*

 - ### NFTUnlistedEvent
	- **Summary:**  An NFT has been unlisted from a marketplace.
	- **Datas returned:** 
  		- nftId: *number*

 - ### NFTSoldEvent
	- **Summary:** An NFT has sold.
	- **Datas returned:** 
  		- nftId: *number*
  		- marketplaceId: *number*
  		- buyer: *string*
  		- listedPrice: *string*
  		- listedPriceRounded: *number*
  		- marketplaceCut: *string*
  		- marketplaceCutRounded: *number*
  		- royaltyCut: *string*
  		- royaltyCutRounded: *number*

[Back to top](https://github.com/capsule-corp-ternoa/ternoa-js/wiki/4-Events)

___

## Utility
- ### ItemCompletedEvent
	- **Summary:** A single item within a Batch of dispatches has been completed with no error.
	- **Datas returned:** 
  		- This is an empty event : it does not return any specific event.

- ### BatchInterruptedEvent
	- **Summary:** Batch of dispatches did not complete fully. Index of first failing dispatch given, as well as the error.
	- **Datas returned:** 
		- index: *number*
		- error: *object*
			- module: *object*
			  -	index: *number*
			  - error: *string*
  		- errorType: *optional string*
  		- details: *optional string*

- ### BatchCompletedEvent 
	- **Summary:** Batch of dispatches completed fully with no error.
	- **Datas returned:** 
  		- This is an empty event : it does not return any specific event.

[Back to top](https://github.com/capsule-corp-ternoa/ternoa-js/wiki/Events)

___

## System
- ### ExtrinsicFailedEvent 
	- **Summary:** An extrinsic failed.
	- **Datas returned:** 
		- dispatchError: *object*
			- module: *object*
			  -	index: *number*
			  - error: *string*
  		- errorType: *optional string*
  		- details: *optional string*
  		- dispatchInfo: *object*
			- weigth: *string*
			- class: *string*
			- paysFee: *string*

- ### ExtrinsicSuccessEvent
	- **Summary:**  An extrinsic completed successfully.
	- **Datas returned:** 
  		- dispatchInfo: *object*
			- weigth: *string*
			- class: *string*
			- paysFee: *string*

- ### NewAccountEvent
	- **Summary:**  A new account was created.
	- **Datas returned:** 
  		- account: *string as AccountId32*


[Back to top](https://github.com/capsule-corp-ternoa/ternoa-js/wiki/4-Events)