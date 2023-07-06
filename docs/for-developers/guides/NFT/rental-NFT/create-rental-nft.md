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
4. [Install & initialize Ternoa-JS](/for-developers/get-started/install-ternoa-js)

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

//First import the helpers for every parameter you need. Helpers expect the values (strings, number, boolean (..)) and return the corresponding expected object.
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

The expected parameters for creating a contract are objects under a specific format. The best practice and the easiest way to create the parameters is to use the formatters we provide.

```markdown
`nftId`: The NFT Id of the contract.
`duration`:
Duration can be either: fixed or subscription.
Duration must be set in as a number of blocks. (Each block lasts around 6 seconds - ex: 1 minute should be 10 blocks)
Fixed duration is an object expecting a block number.
Subscription duration is an object expecting a duration in the block, an optional max duration, and an optional boolean to make the contract changeable.
The maxDuration is set by default to 5,184,000 blocks (around 360 days).
`acceptanceType`:
The type of acceptance can be either automatic or manual (with or without a whitelist).
Acceptance type is an object expecting: null or an optional list of whitelisted addresses (an array of strings).
If an address list is provided, only the address whitelisted will be able to rent the contract or make an offer.
`renterCanRevoke`: A boolean to allow the renter to cancel the contract once started
`rentFee`:
The fee the rentee will have to "pay" to rent the contract: It can be either a token amount or an NFT.
RentFee is an object expecting: a token amount (a number of CAPS) or an NFT id.
NFT id as rentFee can't be set when contract duration is a subscription type.
`renterCancellationFee`:
The fee to cancel the contract: FixedTokens (fixed tokens amount), FlexibleTokens (a proportion/pro rata tokens amount), an NFT id, or can be null. In case of no cancellation fee: none.
FlexibleTokens can only be used with Fixed duration contracts.
Both FixedTokens and FlexibleTokens types expect a token's value as a number of CAPS.
`renteeCancellationFee`:
The fee to cancel the contract: FixedTokens (fixed tokens amount), FlexibleTokens (a proportion/pro rata tokens amount), an NFT id, or can be null. In case of no cancellation fee: none.
FlexibleTokens can only be used with Fixed duration contracts.
Both FixedTokens and FlexibleTokens types expect a token's value as a number of CAPS.
`keyring`: The provided keyring (containing the address) will be used to sign the transaction and pay the execution fee.
`waitUntil`: WaitUntil defines at which point we want to get the results of the transaction execution: BlockInclusion or BlockFinalization.
```

### Response

The response provided from the blockchain event includes all the information below according to the parameters provided when creating a rental NFT.

```markdown
`nftId`: ID of the NFT used for rent.
`renter`: The renter's address, owner of the contract.
`duration`: The contract duration information.
`acceptanceType`: The contract acceptance type.
`acceptanceList`: If provided, the whitelist of addresses as an array of strings.
`renterCanRevoke`: A boolean about revocation by renter status.
`rentFeeType`: The type of contract fee to rent a contract.
`rentFee`: The contract fee to rent a contract as a big number.
`rentFeeRounded`: The contract fee to rent a contract as a number.
`renterCancellationFeeType`: The type of renter cancellation fee.
`renterCancellationFee?`: The renter fee as a big number or NFT Id.
`renterCancellationFeeRounded?`: The renter fee as a number or NFT Id.
`renteeCancellationFeeType`:The type of rentee cancellation fee.
`renteeCancellationFee?`: The rentee fee as a big number or NFT Id.
`renteeCancellationFeeRounded?`: The rentee fee as a number or NFT Id.
```

## Support

If you face any trouble, feel free to reach out to our community engineers in our [Discord](https://discord.gg/fUmBkPpnRu).
