---
sidebar_position: 5
sidebar_label: How to configure a marketplace
---

# How to configure a marketplace ?

## Prerequisites

Before getting started, make sure you have the following ready:

1. Create a [Ternoa account](/for-developers/get-started/create-account) with [Alphanet CAPS](/for-developers/get-started/create-account#step-2-get-some-free-test-caps-tokens)
2. Install and set up your editor of choice (we will use Visual Studio Code [VSC] in this tutorial)
3. Install [NodeJS v.14+](https://nodejs.org/en/download/) & NPM
4. [Install & initialize Ternoa-JS](/for-developers/get-started/install-ternoa-js)

## How to set the marketplace configuration on-chain?

This function updates the marketplace configuration on Ternoa chain. It returns an object promise containing the MarketplaceConfigSetEvent provided by the Ternoa blockchain.

:::info
Use your own account by updating the `//TernoaTestAccount` with your account seed when retrieving the keyring from the example below. **Replace the variables** according to your needs. The params of this extrinsic need to be provided in a specific format.
:::

In order to avoid any error, we strongly recommand you to construct your params using the helpers we provide:

-   **formatMarketplaceFee()** for both commission and listing fee.
-   **formatMarketplaceAccountList()** for the account list.
-   **formatMarketplaceOffchainData()** for the offchain data.
-   **formatMarketplaceCollectionList()** for the collection list.

```typescript showLineNumbers
import {
	setMarketplaceConfiguration,
	initializeApi,
	getKeyringFromSeed,
	WaitUntil,
} from "ternoa-js";

//First import the helpers for every parameters you need. Helpers expect the values (strings, number, boolean (..)) and returns the corresponding expected object.
import {
	formatMarketplaceFee,
	formatMarketplaceAccountList,
	formatMarketplaceOffchainData,
	formatMarketplaceCollectionList,
} from "ternoa-js/marketplace/utils";

const createContract = async () => {
	try {
		await initializeApi();
		const keyring = await getKeyringFromSeed("//TernoaTestAccount");
		const marketplaceId = //to be updated
		const offchainDataHash = //to be updated
		const collectionId = //to be updated
		const address = //to be updated

		// Here you create some constants with each helper and value you want. We use some random values:
		const formattedCommissionFee = formatMarketplaceFee(
			"set",
			"percentage",
			10
		);
		const formattedListingFee = formatMarketplaceFee("set", "flat", 100);
		const formattedAccountList = formatMarketplaceAccountList("set", [
			address,
		]);
		const formattedOffchainData = formatMarketplaceOffchainData(
			"set",
			offchainDataHash
		);
		const formattedCollectionList = formatMarketplaceCollectionList(
			"set",
			[collectionId]
		);
		// Provide each const one by one as parameters in our function below:
		const mpEvent = await setMarketplaceConfiguration(
			marketplaceId,
			formattedCommissionFee,
			formattedListingFee,
			formattedAccountList,
			formattedOffchainData,
			formattedCollectionList,
			keyring,
			WaitUntil.BlockInclusion
		);

		console.log(`Marketplace: ${mpEvent.nftId} correctly updated`);
	} catch (e) {
		console.error(e);
	}
};
```

### The expected params

The expected params for updating a marketplace are objects under specific format. The best practice and the easiest way to create the params, is to use the formaters we provide.

```markdown
Each of the parameters of the marketplace, need one of the following type:
`Noop`: No Operation, nothing change. Noop is set by default for each of the parameters.
`Remove`: Current datas will be deleted.
`Set`: An object that updates parameters value.

Params detail:
`id`: Marketplace Id of the marketplace to update.
`commissionFee`:
Commission when an NFT is sold on the marketplace: it can be set as flat (in Big Number format) or as percentage (in permill format). Without using formatters, you can use the convertMarketplaceFee() function. Commission Fee and Listing Fee require a data type (flat or percentage) under format: { [MarketplaceConfigAction.Set]: { setFeeType: number || BN}}.
Again, the best practice is to use here the formatMarketplaceFee().
`listingFee`:
Fee when an NFT is added for sale to marketplace: it can be set as flat (in Big Number format) or as percentage (in permill format). Without using formatters, you can use the convertMarketplaceFee() function. Commission Fee and Listing Fee require a data type (flat or percentage) under format: { [MarketplaceConfigAction.Set]: { setFeeType: number || BN}}.
Again, the best practice is to use here the formatMarketplaceFee().
`accountList`: A list of accounts: if the marketplace kind is private, it allows these accounts to sell NFT. If the marketplace kind is public, it bans these accounts from selling NFT. AccountList require an array of string: { [MarketplaceConfigAction.Set]: string[]}. Again, the best practice is to use here the formatMarketplaceAccountList().
`offchainData`: Off-chain related marketplace metadata. Can be an IPFS Hash, an URL or plain text. OffChainData require a string: { [MarketplaceConfigAction.Set]: string}.
Again, the best practice is to use here the formatMarketplaceOffchainData().
`collectionList`:A list of Collection Id: same as accountList, if the marketplace kind is private, the list is a whitelist and if the marketplace is public, the list bans the collection to be listed. CollectionList require an arry of number: { [MarketplaceConfigAction.Set]: number[]}. Again, the best practice is to use here the formatMarketplaceCollectionList().
`keyring`: The provided keyring (containing the address) will be used to sign the transaction and pay the execution fee.
`waitUntil`: WaitUntil define at which point we want to get the results of the transaction execution: BlockInclusion or BlockFinalization.
```

### Response

The response provided from the blockchain event includes all the informations below according to the params provided when updating the marketplace.

```markdown
`marketplaceId`: the upadated marketplace id.
`commissionFeeType`: If updated, the commission fee type: Flat or Percentage.
`commissionFee`: The commission fee value as a Big Number or a permill.
`commissionFeeRounded`: The commission fee value as a number.
`listingFeeType`: If updated, the listing fee type: Flat or Percentage.
`listingFee`: The listing fee value as a Big Number or a permill.
`listingFeeRounded`: The listing fee value as a number.
`accountList`: If available, the list of addresses..
`offchainData`: If available, the offchain metadata (a string).
`collectionList`: If available, the list of collection id.
```

## Support

If you face any trouble, feel free to reach out to our community engineers in our [Discord](https://discord.gg/fUmBkPpnRu).
