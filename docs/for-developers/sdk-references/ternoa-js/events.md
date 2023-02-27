---
sidebar_position: 4
---

# Events

---

## Overview: What are chain events?

**Events are objects containing decoded values (data)** provided by the chain in the result of any transaction triggered using the `submitTxBlocking` function. At least one of these two `ExtrinsicSuccessEvent` or `ExtrinsicFailedEvent` events are provided for any transaction depending on its success or fail. While `submitTxBlocking` provides the SDK handlers main events list of **_BlockchainEvents_** available, we also allow you to filter this list to get the ones you need. _An example to filter only the events list of a balance transfer transaction :_

```javascript
const balanceTransfertEvents = BlockchainEvents.findEvents(
  BalancesTransferEvent
);
```

**note :** _BlockchainEvents is the result of `submitTxBlocking` function. It can be stored in a constant for example._

To better understand Events, we already jumped a bit deeper than the first and easiest option to get the extrinsics events list. In case you do not need to manually sign or send your transaction, each of the Ternoa extrinsics feature comes with two functions to execute a transaction and an easy one to directly get the required events list. _See the example below :  
When the `balancesTransferTx` function creates an unsigned unsubmitted transaction hash, the `balancesTransfer` function signs and submits the transaction to provide the events list._

---

## About the Event Design Format:

To make the returned events data usefull, we provide both the native format and a friendly ready to use format:

- a string as an AccountId32 correspond to a classic user valid address.
- a string as u128 is a BN value as a string natively used under the hood by the chain.
- a rounded data (ex: amoutRounded) is the "human" version of a data, (usually a BN) that can be directly used.
- some events from the utility pallet do not return any data.

---

## The events below are the Events handled in the Ternoa SDK sorted by categories

- [Balances](https://github.com/capsule-corp-ternoa/ternoa-js/wiki/4-Events#balances)
- [Treasury](https://github.com/capsule-corp-ternoa/ternoa-js/wiki/4-Events#treasury)
- [NFT](https://github.com/capsule-corp-ternoa/ternoa-js/wiki/4-Events#nft)
- [Collection](https://github.com/capsule-corp-ternoa/ternoa-js/wiki/4-Events#collection)
- [Marketplace](https://github.com/capsule-corp-ternoa/ternoa-js/wiki/4-Events#marketplace)
- [Utility](https://github.com/capsule-corp-ternoa/ternoa-js/wiki/4-Events#utility)
- [System](https://github.com/capsule-corp-ternoa/ternoa-js/wiki/4-Events#system)

---

## Balances

- ### BalancesWithdrawEvent

  - **Summary:** Some amount was withdrawn from the account
  - **Datas returned:**
    - who: _string as AccountId32_
      - amount: _string as u128_
      - amountRounded: _number_

- ### BalancesDepositEvent

  - **Summary:** Some amount was deposited.
  - **Datas returned:**
    - who: _string as AccountId32_
      - amount: _string as u128_
      - amountRounded: _number_

- ### BalancesTransferEvent

  - **Summary:** Transfer succeeded.
  - **Datas returned:** - from: _string as AccountId32_
    - to: _string as AccountId32_
      - amount: _string as u128_
      - amountRounded: _number_

- ### BalancesEndowedEvent
  - **Summary:** An account was created with some free balance
  - **Datas returned:** - account: _string as AccountId32_
    - to: _string as AccountId32_
      - freeBalance: _string as u128_
      - freeBalanceRounded: _number_

[Back to top](https://github.com/capsule-corp-ternoa/ternoa-js/wiki/4-Events)

---

## Treasury

- ### TreasuryDepositEvent
  - **Summary:** Some funds have been deposited.
  - **Datas returned:** - account: _string as AccountId32_
    - to: _string as AccountId32_
      - value: _string as u128_
      - valueRounded: _number_

[Back to top](https://github.com/capsule-corp-ternoa/ternoa-js/wiki/4-Events)

---

## NFT

- ### NFTCreatedEvent

  - **Summary:** An NFT has been created.
  - **Datas returned:**
    - event : _event_
    - nftId: _number_
    - owner: _string as AccountId32_
    - offchainData: _string_
    - royalty: _number_
    - collectionId: _number or null_
    - isSoulbound: _boolean_
    - mintFee: _string as u128_
    - mintFeeRounded: _number_

- ### NFTBurnedEvent

  - **Summary:** An NFT has been burned.
  - **Datas returned:**
    - nftId: _number_

- ### NFTDelegatedEvent

  - **Summary:** An NFT has been delegated.
  - **Datas returned:**
    - nftId: _number_
    - recipient: _string as AccountId32 or null_

- ### NFTRoyaltySetEvent

  - **Summary:** The NFT's royalty has been set.
  - **Datas returned:**
    - nftId: _number_
    - royalty: _number_

- ### NFTTransferredEvent

  - **Summary:** An NFT has been transferred.
  - **Datas returned:**
    - nftId: _number_
    - sender: _string as AccountId32_
    - recipient: _string_

- ### NFTAddedToCollection
  - **Summary:** An NFT has been added to a collection.
  - **Datas returned:**
    - nftId: _number_
    - collectionId: _number_

[Back to top](https://github.com/capsule-corp-ternoa/ternoa-js/wiki/4-Events)

---

## Collection

- ### CollectionCreatedEvent

  - **Summary:** A Collection has been created.
  - **Datas returned:**
    - collectionId: _number_
    - owner: _string as AccountId32_
    - offchainData: _string_
    - limit: _number or null_

- ### CollectionLimitedEvent

  - **Summary:** The collection's limit has been set.
  - **Datas returned:**
    - collectionId: _number_
    - limit: _number_

- ### CollectionClosedEvent

  - **Summary:** A collection has been closed.
  - **Datas returned:**
    - collectionId: _number_

- ### CollectionBurnedEvent
  - **Summary:** A collection has been burned.
  - **Datas returned:** - collectionId: _number_

[Back to top](https://github.com/capsule-corp-ternoa/ternoa-js/wiki/4-Events)

---

## Marketplace

- ### MarketplaceCreatedEvent

  - **Summary:** A marketplace has been created.
  - **Datas returned:**
    - marketplaceId: _number_
    - owner: _string as AccountId32_
    - kind: _the marketplace kind : Public or Private_

- ### MarketplaceOwnerSetEvent

  - **Summary:** The marketplace owner has been set.
  - **Datas returned:**
    - marketplaceId: _number_
    - owner: _string as AccountId32_

- ### MarketplaceKindSetEvent

  - **Summary:** The marketplace kind has been set.
  - **Datas returned:**
    - marketplaceId: _number_
    - kind: _the marketplace kind : Public or Private_

- ### MarketplaceConfigSetEvent

  - **Summary:** The marketplace configuration has been updated. Parameters can be unchanged (Noop), Removed or Set
  - **Datas returned:**
    - marketplaceId: _number_
    - commissionFeeType: _optional string : Remove or Set_
    - commissionFee: _optional string_
    - commissionFeeRounded: _optional Number_
    - listingFeeType: _optional string : Remove or Set_
    - listingFee: _optional string_
    - listingFeeRounded: _optional Number_
    - accountList: _optional Array of strings as AccountId32_
    - offchainData: _optional string_

- ### MarketplaceMintFeeSetEvent

  - **Summary:** The marketplace mint fee has been set.
  - **Datas returned:**
    - fee: _string_
    - feeRounded: _number_

- ### NFTListedEvent

  - **Summary:** An NFT has been listed for sale on a marketplace.
  - **Datas returned:**
    - nftId: _number_
    - marketplaceId: _number_
    - price: _string_
    - priceRounded: _number_
    - commissionFeeType: _optional string : Percentage or Flat value_
    - commissionFee: _optional string_
    - commissionFeeRounded: _optional number_

- ### NFTUnlistedEvent

  - **Summary:** An NFT has been unlisted from a marketplace.
  - **Datas returned:**
    - nftId: _number_

- ### NFTSoldEvent
  - **Summary:** An NFT has sold.
  - **Datas returned:**
    - nftId: _number_
    - marketplaceId: _number_
    - buyer: _string_
    - listedPrice: _string_
    - listedPriceRounded: _number_
    - marketplaceCut: _string_
    - marketplaceCutRounded: _number_
    - royaltyCut: _string_
    - royaltyCutRounded: _number_

[Back to top](https://github.com/capsule-corp-ternoa/ternoa-js/wiki/4-Events)

---

## Utility

- ### ItemCompletedEvent

  - **Summary:** A single item within a Batch of dispatches has been completed with no error.
  - **Datas returned:** - This is an empty event : it does not return any specific event.

- ### BatchInterruptedEvent

  - **Summary:** Batch of dispatches did not complete fully. Index of first failing dispatch given, as well as the error.
  - **Datas returned:**
    - index: _number_
    - error: _object_
      - module: _object_
        - index: _number_
        - error: _string_
      - errorType: _optional string_
      - details: _optional string_

- ### BatchCompletedEvent
  - **Summary:** Batch of dispatches completed fully with no error.
  - **Datas returned:** - This is an empty event : it does not return any specific event.

[Back to top](https://github.com/capsule-corp-ternoa/ternoa-js/wiki/Events)

---

## System

- ### ExtrinsicFailedEvent

  - **Summary:** An extrinsic failed.
  - **Datas returned:**
    - dispatchError: _object_
      - module: _object_
        - index: _number_
        - error: _string_
      - errorType: _optional string_
      - details: _optional string_
      - dispatchInfo: _object_
      - weigth: _string_
      - class: _string_
      - paysFee: _string_

- ### ExtrinsicSuccessEvent

  - **Summary:** An extrinsic completed successfully.
  - **Datas returned:** - dispatchInfo: _object_ - weigth: _string_ - class: _string_ - paysFee: _string_

- ### NewAccountEvent
  - **Summary:** A new account was created.
  - **Datas returned:** - account: _string as AccountId32_

[Back to top](https://github.com/capsule-corp-ternoa/ternoa-js/wiki/4-Events)
