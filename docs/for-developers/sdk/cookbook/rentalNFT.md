---
sidebar_label: Rental NFT
version: 1.0
category: NFT
authors: Victor Salomon
created: 2022-12-14
---

# Rental NFT

## Overview:

In this section, you will find several relevant informations about the Ternoa Rent feature. Before diving into exemples and code snippet, let's get a short review about what actions can be done within this module and how to create and handle rental contracts of NFT according to our [TIP](https://github.com/capsule-corp-ternoa/ternoa-proposals/blob/main/TIPs/tip-400-Rental-NFT.md)

We strongly advise you to get a global overview of the Rental NFT [**here**](https://docs.ternoa.network/wiki/nft-features/rental). Provides a careful attention when reading both sections below before moving forward:

-   [**_Rules and Constraints_**](https://docs.ternoa.network/wiki/nft-features/rental#rules-and-constraints)
-   [**_End-to-end workflow_**](https://docs.ternoa.network/wiki/nft-features/rental#-end-to-end-workflow-ternoa-specific)

_In order to avoid any confusion, **Renter** will be called as the NFT owner, the rental contract creator, while the **Rentee** will be called as the user who rents the contract._

#### From the renter perspective:

-   **createContract** - _Creates a rental contract on the chain for an NFT._
-   **cancelContract** - _Cancels a contract that is not running._
-   **revokeContract** - _Revokes a running contract. (Under specific conditions)_
-   **acceptRentOffer** - _Accepts a rent offer for manual acceptance contract._
-   **changeSubscriptionTerms** - _Changes the subscription terms for subscription contracts._

#### From the rentee perspective:

-   **rent** - _Rents an nft._
-   **makeRentOffer** - _Makes an offer for an available contract._
-   **retractRentOffer** - _Retracts a rent offer for manual acceptance contract._
-   **revokeContract** - _Revokes a running contract._
-   **acceptSubscriptionTerms** - _Accepts the new subscription terms for subscription contracts._

Some useful datas can be queried, like the rental contract datas (getRentalContractData) or the offers made for a contract (getRentalOffers).

## Pre-Requisites

To get started with the Rent example, you must first complete the following set-up instructions:

-   Install ternoa-js: [Getting started](https://docs.ternoa.network/for-developers/sdk/getting-started)
-   Setup your project: [SDK Workflow](https://docs.ternoa.network/for-developers/sdk/sdk-workflows)
-   You must have already created an NFT **to create a rental contract from it**.
-   The provided NFT must not be in the following states: _Capsule, Listed, Secret, Delegated, Soulbound, Rented_.

Once you have completed these steps, you can begin working on the example. If you have any questions or encounter any issues, please refer to the project's documentation for additional guidance.

## Create a rental contract

Since creating a rental contract relies on different params with some specific options, let's make it smooth by doing a step by step integration. Again a good reading of the [wiki](https://docs.ternoa.network/wiki/nft-features/rental) is mandatory to understand each step properly. 

_**Important note:**_ Be sure to read each of the comments in the code snippet as they are covering almost every use-cases and explains a lot of expected format. Some parameters to provide in the `createContract()` function can be a bit hard to get used to. They are actually objects with different _**keys:values pairs**_ (they are still classic JS objects). No worries, once again we got you covered : we will see in the example below, three ways to construct the objects you need to provide. From the classic string, to the helpers that does it for you.

The last case with **the helpers is provided in the very last code snippet example**. Our recommandation is to keep reading the following steps to understand every parameters and use the helpers when you start coding.

**Ready, Steady, Go !**

#### 1- Initial Setup.

```js showLineNumbers
//Import ternoa JS and init API to recover the keyring.
import { initializeApi } from "ternoa-js"

export const rent = async () => {
		try {
            // We initialize the API instance
            await initializeApi()

            ... //we assume your keyring is already created and provided with CAPS to support transactions fees. Otherwise store it in a constant like below (Never expose your seed-phrase in your projects):
            const keyring = await getKeyringFromSeed("YOUR SEED");

            // Here we will create, sign and submit the Rental NFT transaction with our keyring.
			const myRentalContract = await createContract(
                // 1- provide the NFT id
                // 2- set the duration
                // 3- set the acceptance type
                // 4- set the renterCanRevoke
                // 5- set the rental fees
                // 6- set the renter cancellation fees
                // 7- set the rentee cancellation fees
                // 8-9 provides the keyring and the block status.
			);

		} catch (e) {
			console.log(e);
		}
	};
```

#### 2- Add the NFT id and set the duration.

```js showLineNumbers
import { initializeApi } from "ternoa-js"

export const rent = async () => {
		try {
            await initializeApi()
            const keyring = await getKeyringFromSeed("YOUR SEED");
			const myRentalContract = await createContract(
                // Provide the NFT id to create a rental contract from it
                NFT_ID,
                // Set the contract duration :
                // Duration can be either: fixed or subscription.
                // Duration must be set in a number of blocks. (Each block last around 6 seconds - ex: 1 minute should be 10 blocks)
                // Fixed duration is an object expecting a block number. 
                // Subscription duration is an object expecting a duration in block, an optional max duration and an optional boolean to make the contract changeable. The maxDuration is set by default to 5,184,000 of blocks (around 360 days).
				{
					"fixed": 1000,
				},
                // or
                {
                    "subscription": {
                        "periodLenght": 500,
                        "maxDuration": 10000,
                        "isChangeable": true,
                    },
                },
                ...
			);

		} catch (e) {
			console.log(e);
		}
	};
```

This works well but we provide a cleaner solution to set the value of every expected objects in the required params. You need to import them first before constructing the objects.

```js showLineNumbers
import { initializeApi } from "ternoa-js"
// Import the DurationAction to set the Duration type (and SubscriptionActionDetails if duration is a subscription).
import {
	DurationAction,
    SubscriptionActionDetails
} from "ternoa-js/rent/enum";

export const rent = async () => {
		try {
            await initializeApi()
            const keyring = await getKeyringFromSeed("YOUR SEED");
            // Here we first add the two parameters : NFT id and Set duration
			const myRentalContract = await createContract(
                NFT_ID,
                // Since they are Enums (concept from Typescript), the "strings" need to be replaced by an array of [enums] like below
				{
					[DurationAction.Fixed]: 1000,
				},
                // or
                 {
                    [DurationAction.Subscription]: {
                        [SubscriptionActionDetails.PeriodLength]: 500,
                        [SubscriptionActionDetails.MaxDuration]: 10000,
                        [SubscriptionActionDetails.IsChangeable]: true,
                    },
                },
                ...
			);

		} catch (e) {
			console.log(e);
		}
	};
```

Clean, right ? For the next steps we will update the imports and use the [enums] as it makes our code cleaner and helps us to avoid any typo mistakes. We will also keep a random value from the previous exemple to get a final example. If you are not comfortable with the [Enums] provided by the SDK, we will introduce the helpers that construct the object for you in the very last code snippet. 

#### 3- Set the acceptance type.

```js showLineNumbers
import { initializeApi } from "ternoa-js"
import {
	DurationAction,
	AcceptanceAction,
} from "ternoa-js/rent/enum";

export const rent = async () => {
		try {
            await initializeApi()
            const keyring = await getKeyringFromSeed("YOUR SEED");
			const myRentalContract = await createContract(
                NFT_ID,
				{
					[DurationAction.Fixed]: 1000,
				},
                // Acceptance type can be either: automatic or manual.
                // Acceptance type is an object expecting: null or an optional list of whitelisted address (an array of string)
				// If an address list is provided, only the address whitelisted will be able to rent the contract or make an offer.
				{
					[AcceptanceAction.AutoAcceptance]: null,
				},
                //or for example with a list of whitelisted address. 
                {
					[AcceptanceAction.ManualAcceptance]: ["address1", "address2", ... "addressN"],
				},
                ...
			);

		} catch (e) {
			console.log(e);
		}
	};
```

#### 4- Set the RenterCanRevoke field and the contract RentFee.

```js showLineNumbers
import { initializeApi } from "ternoa-js"
import {
	DurationAction,
	AcceptanceAction,
	RentFeeAction,
} from "ternoa-js/rent/enum";

export const rent = async () => {
		try {
            await initializeApi()
            const keyring = await getKeyringFromSeed("YOUR SEED");
			const myRentalContract = await createContract(
                NFT_ID,
				{
					[DurationAction.Fixed]: 1000,
				},
				{
					[AcceptanceAction.ManualAcceptance]: null,
				},
                // RenterCanRevoke can be set to: true or false.
				// When set to true, the renter can revoke the contract if needed.
                // We set it randomly to false.
				false,
				// RentFee can be either: tokens or nft.
				// The fee the rentee will have to "pay" to rent the contract.
                // RentFee is an object expecting: a tokens amount (a number of CAPS) or an NFT id
                // NFT id as rentFee can't be set when contract duration is a subscription type.
                // We set them randomly to 1 CAPS:                 
				// With a tokens value as a number of CAPS.
                { [RentFeeAction.Tokens]: 1 },
                // or with an NFT id 10 (NFT is must exist)
                { [RentFeeAction.NFT]: 10 },
                ...
			);

		} catch (e) {
			console.log(e);
		}
	};
```

#### 5- Set the RenterCancellationFee and RenteeCancellationFee.

```js showLineNumbers
import { initializeApi } from "ternoa-js"
import {
	DurationAction,
	AcceptanceAction,
	RentFeeAction,
	CancellationFeeAction,
} from "ternoa-js/rent/enum";

export const rent = async () => {
		try {
            await initializeApi()
            const keyring = await getKeyringFromSeed("YOUR SEED");
			const myRentalContract = await createContract(
                NFT_ID,
				{
					[DurationAction.Fixed]: 1000,
				},
				{
					[AcceptanceAction.ManualAcceptance]: null,
				},
				false,
				{ [RentFeeAction.Tokens]: 1 },

				// The last two parameters are the renterCancellationFee and the renteeCancellationFee.
                // Cancellation fee are expected in the same format for both renterCancellationFee or renteeCancellationFee.
                // A cancellationFee can be of type : FixedTokens (fixed tokens amount), FlexibleTokens (a proportion/prorata tokens amount), an NFT id or can be null. In case of no cancellation fee : none .
                // FlexibleTokens can only be used with Fixed duration contracts.
                // Both FixedTokens and FlexibleTokens type expect a tokens value as a number of CAPS.
                
				// RenterCancellationFee
				// with a tokens value as a number of CAPS for a Fixed value.
                { [CancellationFeeAction.FixedTokens]: 1 },
				// or a tokens value as a number of CAPS for a Flexible value.
				{ [CancellationFeeAction.FlexibleTokens]: 1 },
                // or with an NFT id
                { [CancellationFeeAction.NFT]: 10 },
                // in case of no cancellation fee just put:
                CancellationFeeAction.None

                // RenteeCancellationFee
				// second, set the rentee cancellation fee randomly to 2 CAPS.
				// with a tokens value as a number of CAPS for a Fixed value.
                { [CancellationFeeAction.FixedTokens]: 2 },
				// or a tokens value as a number of CAPS for a Flexible value.
				{ [CancellationFeeAction.FlexibleTokens]: 2 },
                // or with an NFT id
                { [CancellationFeeAction.NFT]: 12 },
                // same here, in case of no cancellation fee just put:
                CancellationFeeAction.None,
                ...
			);

            ...

		} catch (e) {
			console.log(e);
		}
	};
```

Last step is **to sign the transaction with your keyring** and define the **blocking the execution flow** until the transaction is either included in a block or when block is finalized.

#### Final code should look like this.

This is the way to create a contract without helpers. _Don't forget to update the NFT id, the seed-phrase and the other params according to your needs_ if you go this way.

```js showLineNumbers
import { initializeApi, WaitUntil } from "ternoa-js"
import {
	DurationAction,
	AcceptanceAction,
	RentFeeAction,
	CancellationFeeAction,
} from "ternoa-js/rent/enum";

export const rent = async () => {
		try {
            await initializeApi()
            const keyring = await getKeyringFromSeed("YOUR SEED");
			const myRentalContract = await createContract(
				NFT_ID,
				{
					[DurationAction.Fixed]: 1000,
				},
				{
					[AcceptanceAction.ManualAcceptance]: null,
				},
				false,
				{ [RentFeeAction.Tokens]: 10 },
				{ [CancellationFeeAction.FlexibleTokens]: 100 },
				CancellationFeeAction.None,
				keyring,
				WaitUntil.BlockInclusion
			);

            // Do whatever you want with the contract data
            console.log(myRentalContract);
            ...

		} catch (e) {
			console.log(e);
		}
	};
```

#### And the final code using the helpers to create the objects of the parameters.

First import the helpers for every parameters you need. Helpers expect the values (strings, number, boolean (..)) and returns the corresponding expected object.

```js showLineNumbers
import { initializeApi, WaitUntil } from "ternoa-js"
import {
	formatAcceptanceType,
	formatCancellationFee,
	formatDuration,
	formatRentFee,
} from "ternoa-js/rent/utils";

export const rent = async () => {
		try {
            await initializeApi()
            const keyring = await getKeyringFromSeed("YOUR SEED");

			// Here you create some constants with each helper and value you want.
			// We use again some random values:
			const duration = formatDuration("subscription", 30, 100, true)
			const acceptanceType = formatAcceptanceType("manual", null)
			const rentFee = formatRentFee("tokens", 1)
			const renterCancellationFee = formatCancellationFee("fixed", 1)
			const renteeCancellationFee = formatCancellationFee("none")
			// Provide each consts one by one as parameters in our function below: 
			const myRentalContract = await createContract(
				NFT_ID,
				duration,
      			acceptanceType,
      			true,
      			rentFee,
      			renterCancellationFee,
      			renteeCancellationFee,
				keyring,
				WaitUntil.BlockInclusion
			);

            // Do whatever you want with the contract data
            console.log(myRentalContract);
            ...

		} catch (e) {
			console.log(e);
		}
	};
```

_Again, don't forget to update the NFT id, the seed-phrase and the other params according to your needs._ 

#### Expected output:

This method of creating the contract by providing the keyring only provides all the datas from the created contract (duration in block, the type of duration, the fees, the cancellation fees(...)). If you're looking for a more customizable way, some specific events or the block information, please, look at the [workflow section](https://docs.ternoa.network/for-developers/sdk/sdk-workflows) to update your method.
