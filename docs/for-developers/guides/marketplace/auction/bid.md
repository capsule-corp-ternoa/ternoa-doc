---
sidebar_position: 3
sidebar_label: How to add/remove a bid
---

# How to add or remove a bid on an auction

## Prerequisites

Before getting started, make sure you have the following ready:

1. Create a [Ternoa account](/for-developers/get-started/create-account) with [Alphanet CAPS](/for-developers/get-started/create-account#step-2-get-some-free-test-caps-tokens)
2. Install and set up your editor of choice (we will use Visual Studio Code [VSC] in this tutorial)
3. Install [NodeJS v.14+](https://nodejs.org/en/download/) & NPM
4. [Install & initialize Ternoa-JS](/for-developers/get-started/install-ternoa-js)

## Bid on an auction using Ternoa-JS

This function add a bid to an existing auction NFT on the Ternoa chain. It returns an object promise containing the BidAddedEvent provided by the Ternoa blockchain.

:::info
Use your own account by updating the `//TernoaTestAccount` with your account seed when retrieving the keyring from the example below.
**Replace the NFT_ID** with the existing one to bid on, and the **bidAmount**.
:::

```typescript showLineNumbers
import {
	addBid,
	initializeApi,
	getKeyringFromSeed,
	WaitUntil,
} from "ternoa-js";

const auctionBid = async () => {
	try {
		await initializeApi();
		const keyring = await getKeyringFromSeed("//TernoaTestAccount");
		const NFT_ID = // update with the nft id you want to bid on.
        const bidAmount = // update with the amount to bid.
		const res = await addBid(
			NFT_ID,
            bidAmount,
            keyring,
			WaitUntil.BlockInclusion
		);
		console.log(`Bid added to NFT ${res.nftId} for ${res.amountRounded}CAPS`);
	} catch (e) {
		console.error(e);
	}
};
```

### The expected params

```markdown
`nftId`: The ID of the auctioned NFT.
`amount`: Rhe amount to bid.
`keyring`: The provided keyring (containing the address) will be used to sign the transaction and pay the execution fee.
`waitUntil`: WaitUntil define at which point we want to get the results of the transaction execution: BlockInclusion or BlockFinalization.
```

### Response

The response provided from the blockchain event includes all the informations below according to the params provided when bidding on an auction.

```markdown
`nftId`: NFT id auctioned.
`bidder`: The bidder address.
`amount`: The amount bidded as a string corresponding to the value in big number.
`amountRounded`: The amount bidded as number.
```

## Remove a bid using Ternoa-JS

This function remove a bid from an auction on the Ternoa chain. It returns an object promise containing the BidRemovedEvent provided by the Ternoa blockchain.

:::info
Use your own account by updating the `//TernoaTestAccount` with your account seed when retrieving the keyring from the example below.
**Replace the NFT_ID** with the existing one to remove the bid.
:::

```typescript showLineNumbers
import {
	removeBid,
	initializeApi,
	getKeyringFromSeed,
	WaitUntil,
} from "ternoa-js";

const auctionBidRemoved = async () => {
	try {
		await initializeApi();
		const keyring = await getKeyringFromSeed("//TernoaTestAccount");
		const NFT_ID = // update with the nft id you want to remove bid.
		const res = await removeBid(
			NFT_ID,
            keyring,
			WaitUntil.BlockInclusion
		);
		console.log(`Bid removed from NFT ${res.nftId}`);
	} catch (e) {
		console.error(e);
	}
};
```

### The expected params

```markdown
`nftId`: The ID of the auctioned NFT.
`keyring`: The provided keyring (containing the address) will be used to sign the transaction and pay the execution fee.
`waitUntil`: WaitUntil define at which point we want to get the results of the transaction execution: BlockInclusion or BlockFinalization.
```

### Response

The response provided from the blockchain event includes all the informations below according to the params provided when removing a bid.

```markdown
`nftId`: NFT id auctioned.
`bidder`: The bidder address who removed the bid.
`amount`: The bid amount removed as a string corresponding to the value in big number.
`amountRounded`: The bid amount removed as number.
```

## Support

If you face any trouble, feel free to reach out to our community engineers in our [Discord](https://discord.gg/fUmBkPpnRu).
