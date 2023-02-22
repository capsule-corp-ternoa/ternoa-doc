---
sidebar_position: 4
sidebar_label: How to buy an NFT
---

# How to buy an NFT on a marketplace on-chain

## Prerequisites

Before getting started, make sure you have the following ready:

1. Create a [Ternoa account](/for-developers/get-started/create-account) with [Alphanet CAPS](/for-developers/get-started/create-account#step-2-get-some-free-test-caps-tokens)
2. Install and set up your editor of choice (we will use Visual Studio Code [VSC] in this tutorial)
3. Install [NodeJS v.14+](https://nodejs.org/en/download/) & NPM
4. [Install & initialize Ternoa-JS](/for-developers/get-started/install-ternoa-js)

## Buy an NFT on a marketplace using Ternoa-JS

This function buys a listed for sale NFT on a marketplace on the Ternoa chain. It returns an object promise containing the NFTSoldEvent provided by the Ternoa blockchain.

:::info
Use your own account by updating the `//TernoaTestAccount` with your account seed when retrieving the keyring from the example below.
**Replace the NFT_ID** with the listed NFT to buy.
:::

```typescript showLineNumbers
import {
	buyNft,
	initializeApi,
	getKeyringFromSeed,
	WaitUntil,
} from "ternoa-js";

const buyNft = async () => {
	try {
		await initializeApi();
		const keyring = await getKeyringFromSeed("//TernoaTestAccount");
		const NFT_ID = // update with the nft id you want to buy.
		const res = await buyNft(
			NFT_ID,
			keyring,
			WaitUntil.BlockInclusion
		);
		console.log(`NFT id: ${res.nftId} bought for ${res.listedPriceRounded}CAPS on marketplace ${res.marketplaceId}.`);
	} catch (e) {
		console.error(e);
	}
};
```

### The expected params

```markdown
`nftId`: NFT Id of the NFT to buy.
`keyring`: The provided keyring (containing the address) will be used to sign the transaction and pay the execution fee.
`waitUntil`: WaitUntil define at which point we want to get the results of the transaction execution: BlockInclusion or BlockFinalization.
```

### Response

The response provided from the blockchain event includes all the informations below according to the params provided when buying an NFT.

```markdown
`nftId`: NFT id bought.
`marketplaceId`: Marketplace id where the NFT was listed for sale.
`buyer`: The NFT new owner.
`listedPrice`: The sale price of the NFT as a string corresponding to the value in big number.
`listedPriceRounded`: The sale price of the NFT as number.
`marketplaceCut`: The marketpace commission fee on the NFT sale as a string corresponding to the value in big number.
`marketplaceCutRounded`: The marketpace commission fee on the NFT sale as number.
`royaltyCut`: The NFT creator royalty fee on the NFT sale as a string corresponding to the value in big number.
`royaltyCutRounded`: The NFT creator royalty fee on the NFT sale as number.
```

## Support

If you face any trouble, feel free to reach out to our community engineers in our [Discord](https://discord.gg/fUmBkPpnRu).
