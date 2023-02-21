---
sidebar_position: 6
sidebar_label: Manage Auction
---

# How to cancel or end an auction on a marketplace

## Prerequisites

Before getting started, make sure you have the following ready:

1. Create a [Ternoa account](/for-developers/get-started/create-account) with [Alphanet CAPS](/for-developers/get-started/create-account#step-2-get-some-free-test-caps-tokens)
2. Install and set up your editor of choice (we will use Visual Studio Code [VSC] in this tutorial)
3. Install [NodeJS v.14+](https://nodejs.org/en/download/) & NPM
4. [Initialize Ternoa-JS](/for-developers/get-started/install-ternoa-js#step-2-initialize-ternoa-js)

## Cancel an auction on a marketplace using Ternoa-JS

This function cancel an auctioned NFT from a marketplace on the Ternoa chain. It returns an object promise containing the AuctionCancelledEvent provided by the Ternoa blockchain.

:::info
Use your own account by updating the `//TernoaTestAccount` with your account seed when retrieving the keyring from the example below.
**Replace the NFT_ID** with the existing one to cancel. Note: **This transaction can only be submitted if the auction has not started yet.**
:::

```typescript showLineNumbers
import {
	cancelAuction,
	initializeApi,
	getKeyringFromSeed,
	WaitUntil,
} from "ternoa-js";

const cancelAuctionNFT = async () => {
	try {
		await initializeApi();
		const keyring = await getKeyringFromSeed("//TernoaTestAccount");
		const NFT_ID = // update with the auctioned nft id you want to cancel.
		const res = await cancelAuction(
			NFT_ID,
            keyring,
			WaitUntil.BlockInclusion
		);
		console.log(`Auction cancelled for NFT id: ${res.nftId}`);
	} catch (e) {
		console.error(e);
	}
};
```

### The expected params

```typescript
`nftId`: The ID of the auctioned NFT to cancel.
`keyring`: The provided keyring (containing the address) will be used to sign the transaction and pay the execution fee.
`waitUntil`: WaitUntil define at which point we want to get the results of the transaction execution: BlockInclusion or BlockFinalization.
```

### Response

The response provided from the blockchain event includes all the informations below according to the params provided when cancelling an auction.

```typescript
`nftId`: NFT id of the cancelled auction.
```

## End an auction on a marketplace using Ternoa-JS

This function end an auctioned NFT from a marketplace on the Ternoa chain. It returns an object promise containing the AuctionCompletedEvent provided by the Ternoa blockchain.

:::info
Use your own account by updating the `//TernoaTestAccount` with your account seed when retrieving the keyring from the example below.
**Replace the NFT_ID** with the existing one to end. Note: **This transaction can only be submitted if the auction has entered the ending period.**
:::

```typescript showLineNumbers
import {
	endAuction,
	initializeApi,
	getKeyringFromSeed,
	WaitUntil,
} from "ternoa-js";

const endAuctionNFT = async () => {
	try {
		await initializeApi();
		const keyring = await getKeyringFromSeed("//TernoaTestAccount");
		const NFT_ID = // update with the auctioned nft id you want to end.
		const res = await endAuction(
			NFT_ID,
            keyring,
			WaitUntil.BlockInclusion
		);
		console.log(`Auction ended for NFT id: ${res.nftId}`);
	} catch (e) {
		console.error(e);
	}
};
```

### The expected params

```typescript
`nftId`: The ID of the auctioned NFT to end.
`keyring`: The provided keyring (containing the address) will be used to sign the transaction and pay the execution fee.
`waitUntil`: WaitUntil define at which point we want to get the results of the transaction execution: BlockInclusion or BlockFinalization.
```

### Response

The response provided from the blockchain event includes all the informations below according to the params provided when ending an auction.

```typescript
`nftId`: NFT id auctioned.
`newOwner`: The new NFT owner.
`amount`: The NFT price as a string corresponding to the value in big number.
`amountRounded`: The NFT price as number.
`marketplaceCut`: The marketpace commission fee on the auctioned NFT as a string corresponding to the value in big number.
`marketplaceCutRounded`: The marketpace commission fee on the auctioned NFT as number.
`royaltyCut`: The NFT creator royalty fee on the auctioned NFT as a string corresponding to the value in big number.
`royaltyCutRounded`: The NFT creator royalty fee on the auctioned NFT as number.
```

## Support

If you face any trouble, feel free to reach out to our community engineers in our [Discord](https://discord.gg/fUmBkPpnRu).
