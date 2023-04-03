---
sidebar_position: 5
sidebar_label: How to directly buy an auctioned NFT
---

# How to directly buy an auctioned NFT on a marketplace

## Prerequisites

Before getting started, make sure you have the following ready:

1. Create a [Ternoa account](/for-developers/get-started/create-account) with [Alphanet CAPS](/for-developers/get-started/create-account#step-2-get-some-free-test-caps-tokens)
2. Install and set up your editor of choice (we will use Visual Studio Code [VSC] in this tutorial)
3. Install [NodeJS v.14+](https://nodejs.org/en/download/) & NPM
4. [Install & initialize Ternoa-JS](/for-developers/get-started/install-ternoa-js)

## Buy directly an auctioned NFT using Ternoa-JS

This function buys an auctioned NFT before the auction has started on the Ternoa chain. It returns an object promise containing the AuctionCompletedEvent provided by the Ternoa blockchain.

:::info
Use your own account by updating the `//TernoaTestAccount` with your account seed when retrieving the keyring from the example below.
**Replace the NFT_ID** with the existing one to buy.
Note: BuyItNow is optional when creating the auction. If no amount is provided at auction creation, it's not possible to run this transaction.
:::

```typescript showLineNumbers
import {
    buyItNow,
    initializeApi,
    getKeyringFromSeed,
    WaitUntil,
} from "ternoa-js";

const auctionBid = async () => {
    try {
        await initializeApi();
        const keyring = await getKeyringFromSeed("//TernoaTestAccount");
        const NFT_ID = // update with the nft id you want to buy.
        const res = await buyItNow(
            NFT_ID,
            keyring,
            WaitUntil.BlockInclusion
        );
        console.log(`BuyItNow_Auction: NFT id ${res.nftId} bought for ${res.amountRounded}CAPS`);
    } catch (e) {
        console.error(e);
    }
};
```

### The expected params

```markdown
`nftId`: The ID of the auctioned NFT.
`keyring`: The provided keyring (containing the address) will be used to sign the transaction and pay the execution fee.
`waitUntil`: WaitUntil defines at which point we want to get the results of the transaction execution: BlockInclusion or BlockFinalization.
```

### Response

The response provided from the blockchain event includes all the information below according to the parameters provided when buying the auctioned NFT.

```markdown
`nftId`: NFT id auctioned.
`newOwner`: The new NFT owner.
`amount`: The NFT price as a string corresponding to the value in a big number.
`amountRounded`: The NFT price as a number.
`marketplaceCut`: The marketplace commission fee on the auctioned NFT as a string corresponding to the value in a big number.
`marketplaceCutRounded`: The marketplace commission fee on the auctioned NFT as a number.
`royaltyCut`: The NFT creator royalty fee on the auctioned NFT as a string corresponding to the value in a big number.
`royaltyCutRounded`: The NFT creator royalty fee on the auctioned NFT as a number.
```

## Support

If you face any trouble, feel free to reach out to our community engineers in our [Discord](https://discord.gg/fUmBkPpnRu).
