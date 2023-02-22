---
sidebar_position: 2
sidebar_label: How to list for sale/unlist an NFT
---

# How to list for sale an NFT on a marketplace

## Prerequisites

Before getting started, make sure you have the following ready:

1. Create a [Ternoa account](/for-developers/get-started/create-account) with [Alphanet CAPS](/for-developers/get-started/create-account#step-2-get-some-free-test-caps-tokens)
2. Install and set up your editor of choice (we will use Visual Studio Code [VSC] in this tutorial)
3. Install [NodeJS v.14+](https://nodejs.org/en/download/) & NPM
4. [Install & initialize Ternoa-JS](/for-developers/get-started/install-ternoa-js)

## List for sale an NFT on a marketplace using Ternoa-JS

This function lists for sale an existing NFT on an existing marketplace on the Ternoa chain. It returns an object promise containing the NFTListedEvent provided by the Ternoa blockchain.

:::info
Use your own account by updating the `//TernoaTestAccount` with your account seed when retrieving the keyring from the example below.
**Replace the NFT_ID** with the existing NFT to list, and the **MARKETPLACE_ID** by the existing marketplace id you want the NFT to be listed on.
:::

```typescript showLineNumbers
import {
	listNft,
	initializeApi,
	getKeyringFromSeed,
	WaitUntil,
} from "ternoa-js";

const listNftOnMp = async () => {
	try {
		await initializeApi();
		const keyring = await getKeyringFromSeed("//TernoaTestAccount");
		const NFT_ID = // update with the nft id you want to list for sale.
        const MARKETPLACE_ID = // update with the marketplace id you want the NFT to be listed on.
		const res = await listNft(
			NFT_ID,
            MARKETPLACE_ID,
            price,
			keyring,
			WaitUntil.BlockInclusion
		);
		console.log(`NFT id: ${res.nftId} listed on marketplace ${res.marketplaceId} for ${res.priceRounded}CAPS`);
	} catch (e) {
		console.error(e);
	}
};
```

### The expected params

```markdown
`nftId`: NFT Id of the NFT to be listed for sale.
`marketplaceId`: Marketplace Id of the marketplace to list the NFT on.
`price`: Price of the NFT. It can be either a number or a Big Number.
`keyring`: The provided keyring (containing the address) will be used to sign the transaction and pay the execution fee.
`waitUntil`: WaitUntil define at which point we want to get the results of the transaction execution: BlockInclusion or BlockFinalization.
```

### Response

The response provided from the blockchain event includes all the informations below according to the params provided when listing for sale the NFT.

```markdown
`nftId`: NFT id listed for sale.
`marketplaceId`: Marketplace id where the NFT have been listed for sale.
`price`: The sale price of the NFT as a string corresponding to the value in big number.
`priceRounded`: The sale price of the NFT as number.
`commissionFeeType?`: If included on the marketpace, the commission fee on the NFT sale. If set, it can be either a fixed amount or a percentage.
`commissionFee?`: If included on the marketpace, the commission fee value as a string corresponding to the value in big number.
`commissionFeeRounded?`: If included on the marketpace, the commission fee value as number.
```

## Unlist an NFT on a marketplace using Ternoa-JS

This function unlist an NFT from a marketplace on the Ternoa chain. It returns an object promise containing the NFTUnlistedEvent provided by the Ternoa blockchain.

:::info
Use your own account by updating the `//TernoaTestAccount` with your account seed when retrieving the keyring from the example below.
**Replace the NFT_ID** with the listed NFT to unlist.
:::

```typescript showLineNumbers
import {
	unlistNft,
	initializeApi,
	getKeyringFromSeed,
	WaitUntil,
} from "ternoa-js";

const unlistNft = async () => {
	try {
		await initializeApi();
		const keyring = await getKeyringFromSeed("//TernoaTestAccount");
		const NFT_ID = // update with the nft id you want to unlist from sale.
		const res = await unlistNft(
			NFT_ID,
			keyring,
			WaitUntil.BlockInclusion
		);
		console.log(`NFT id: ${res.nftId} unlisted.`);
	} catch (e) {
		console.error(e);
	}
};
```

### The expected params

```markdown
`nftId`: NFT Id of the NFT to unlist from sale.
`keyring`: The provided keyring (containing the address) will be used to sign the transaction and pay the execution fee.
`waitUntil`: WaitUntil define at which point we want to get the results of the transaction execution: BlockInclusion or BlockFinalization.
```

### Response

The response provided from the blockchain event includes all the informations below according to the params provided when unlisting the NFT.

```markdown
`nftId`: NFT id unlisted from sale.
```

## Support

If you face any trouble, feel free to reach out to our community engineers in our [Discord](https://discord.gg/fUmBkPpnRu).
