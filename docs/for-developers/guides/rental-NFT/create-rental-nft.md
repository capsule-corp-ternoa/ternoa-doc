---
sidebar_position: 1
sidebar_label: How to rent an NFT
---

# How to rent an NFT on-chain

## Prerequisites

Before getting started, make sure you have the following ready:

1. Create a [Ternoa account](/for-developers/get-started/create-account) with [Alphanet CAPS](/for-developers/get-started/create-account#step-2-get-some-free-test-caps-tokens)
2. Install and set up your editor of choice (we will use Visual Studio Code [VSC] in this tutorial)
3. Install [NodeJS v.14+](https://nodejs.org/en/download/) & NPM
4. [Initialize Ternoa-JS](/for-developers/get-started/install-ternoa-js#step-2-initialize-ternoa-js)

## How to create a rental NFT on-chain?

This function creates a rental NFT on the Ternoa chain. It returns an object promise containing the ContractCreatedEvent provided by the Ternoa blockchain.

:::info
Use your own account by updating the `//TernoaTestAccount` with your account seed when retrieving the keyring from the example below. **Replace the variables** according to your needs.
:::

```typescript showLineNumbers
import {
	createContract,
	initializeApi,
	getKeyringFromSeed,
	WaitUntil,
} from "ternoa-js";

//First import the helpers for every parameters you need. Helpers expect the values (strings, number, boolean (..)) and returns the corresponding expected object.
import {
	formatAcceptanceType,
	formatCancellationFee,
	formatDuration,
	formatRentFee,
} from "ternoa-js/rent/utils";

const createContract = async () => {
	try {
		await initializeApi();
		const keyring = await getKeyringFromSeed("//TernoaTestAccount");

		// Here you create some constants with each helper and value you want. We use some random values:
		const duration = formatDuration("subscription", 30, 100, true);
		const acceptanceType = formatAcceptanceType("manual", null);
		const rentFee = formatRentFee("tokens", 1);
		const renterCancellationFee = formatCancellationFee("fixed", 1);
		const renteeCancellationFee = formatCancellationFee("none");

		// Create or retrieve the NFT you want to convert into a rental NFT.
		const { nftId } = await createNft(
			"hello world",
			0,
			undefined,
			false,
			keyring,
			WaitUntil.BlockInclusion
		);

		// Provide each const one by one as parameters in our function below:
		const rentalContractData = await createContract(
			nftId,
			duration,
			acceptanceType,
			true,
			rentFee,
			renterCancellationFee,
			renteeCancellationFee,
			keyring,
			WaitUntil.BlockInclusion
		);
		console.log(`Contract created for NFT: ${rentalContractData.nftId}`);
	} catch (e) {
		console.error(e);
	}
};
```

### The expected params

The expected params for creating a contract are objects under specific format. The best practice and the easiest way to create the params, is to use the formaters we provide. To learn more about others full contract detail and options, check this [section]("").

```typescript
`nftId`: The NFT Id of the contract.
`duration`:
            Duration can be either: fixed or subscription.
            Duration must be set in a number of blocks. (Each block last around 6 seconds - ex: 1 minute should be 10 blocks)
            Fixed duration is an object expecting a block number.
            Subscription duration is an object expecting a duration in block, an optional max duration and an optional boolean to make the contract changeable.
            The maxDuration is set by default to 5,184,000 of blocks (around 360 days).
`acceptanceType`:
            The type of acceptance can be either automatic or manual (with or without whitelist).
            Acceptance type is an object expecting: null or an optional list of whitelisted address (an array of string).
            If an address list is provided, only the address whitelisted will be able to rent the contract or make an offer.
`renterCanRevoke`: A boolean to allow renter to cancel the contract once started
`rentFee`:
            The fee the rentee will have to "pay" to rent the contract: It can be either a token amount or an NFT.
            RentFee is an object expecting: a tokens amount (a number of CAPS) or an NFT id.
            NFT id as rentFee can't be set when contract duration is a subscription type.
`renterCancellationFee`:
            The fee to cancel the contract: FixedTokens (fixed tokens amount), FlexibleTokens (a proportion/prorata tokens amount), an NFT id or can be null. In case of no cancellation fee: none.
            FlexibleTokens can only be used with Fixed duration contracts.
            Both FixedTokens and FlexibleTokens type expect a tokens value as a number of CAPS.
`renteeCancellationFee`:
            The fee to cancel the contract: FixedTokens (fixed tokens amount), FlexibleTokens (a proportion/prorata tokens amount), an NFT id or can be null. In case of no cancellation fee: none.
            FlexibleTokens can only be used with Fixed duration contracts.
            Both FixedTokens and FlexibleTokens type expect a tokens value as a number of CAPS.
`keyring`:  The provided keyring (containing the address) will be used to sign the transaction and pay the execution fee.
`waitUntil`: WaitUntil define at which point we want to get the results of the transaction execution: BlockInclusion or BlockFinalization.
```

### Response

The response provided from the blockchain event includes all the informations below according to the params provided when creating a rental NFT.

```typescript
`nftId`: ID of the NFT used for rent.
`renter`: The renter address, owner of the contract.
`duration`: The contract duration information.
`acceptanceType`: The contract acceptance type.
`acceptanceList`: If provided, the whitelist of address as an array of string.
`renterCanRevoke`: A boolean about revocation by renter status.
`rentFeeType`: The type of contract fee to rent a contract.
`rentFee`: The contract fee to rent a contract as a big number.
`rentFeeRounded`: The contract fee to rent a contract as a number.
`renterCancellationFeeType`: The type of renter cancellation fee.
`renterCancellationFee?`: The renter fee as a big number or NFT Id.
`renterCancellationFeeRounded?`: The renter fee as a number or NFT Id.
`renteeCancellationFeeType`:The type of rentee cancellation fee.
`renteeCancellationFee?`: The rentee fee as a big number or NFT Id.
`renteeCancellationFeeRounded?`: The rentee fee as a umber or NFT Id.
```

## Support

If you face any trouble, feel free to reach out to our community engineers in our [Discord](https://discord.gg/fUmBkPpnRu).
