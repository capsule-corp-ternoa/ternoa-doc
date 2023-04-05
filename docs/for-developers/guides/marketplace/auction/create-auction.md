---
sidebar_position: 1
sidebar_label: How to create an auction
---

# How to create an English auction on a marketplace

## Prerequisites

Before getting started, make sure you have the following ready:

1. Create a [Ternoa account](/for-developers/get-started/create-account) with [Alphanet CAPS](/for-developers/get-started/create-account#step-2-get-some-free-test-caps-tokens)
2. Install and set up your editor of choice (we will use Visual Studio Code [VSC] in this tutorial)
3. Install [NodeJS v.14+](https://nodejs.org/en/download/) & NPM
4. [Install & initialize Ternoa-JS](/for-developers/get-started/install-ternoa-js)

## Create an auction on a marketplace using Ternoa-JS

This function put an existing NFT to auction on a marketplace on the Ternoa chain. It returns an object promise containing the AuctionCreatedEvent provided by the Ternoa blockchain.

:::info
Use your own account by updating the `//TernoaTestAccount` with your account seed when retrieving the keyring from the example below.
**Replace the NFT_ID** with the existing one to auction, the **MARKETPLACE_ID** by the existing marketplace id you want the NFT to be auctioned on, the **startBlock**, **endBlock**, **startPrice**, **buyItPrice**.
:::

```typescript showLineNumbers
import {
    createAuction,
    initializeApi,
    getKeyringFromSeed,
    WaitUntil,
} from "ternoa-js";

const listAuctionNFT = async () => {
    try {
        await initializeApi();
        const keyring = await getKeyringFromSeed("//TernoaTestAccount");
        const NFT_ID = // update with the nft id you want to auction.
        const MARKETPLACE_ID = // update with the marketplace id you want the NFT to be auctioned on.
        const startBlock = // update with the auction start block number.
        const endBlock = // update with the auction end block number.
        const startPrice = // update with the auction start price.
        const buyItPrice = // update with the auction "buy it now" price.
        const res = await createAuction(
            NFT_ID,
            MARKETPLACE_ID,
            startBlock,
            endBlock,
            startPrice,
            buyItPrice,
            keyring,
            WaitUntil.BlockInclusion
        );
        console.log(`NFT id: ${res.nftId} auctioned on marketplace ${res.marketplaceId} for ${res.startPrice}CAPS`);
    } catch (e) {
        console.error(e);
    }
};
```

### The expected params

```markdown
`nftId`: The ID of the NFT.
`marketplaceId`: The ID of the marketplace where the auction will take place.
`startBlock`: The ID of the block at which the auction starts.
`endBlock`: The ID of the block at which the auction ends.
`startPrice`: The price at which the auction starts.
`buyItPrice`: The price to directly buy the NFT before the auction starts. Optional Parameter.
`keyring`: The provided keyring (containing the address) will be used to sign the transaction and pay the execution fee.
`waitUntil`: WaitUntil defines at which point we want to get the results of the transaction execution: BlockInclusion or BlockFinalization.
```

### Response

The response provided from the blockchain event includes all the information below according to the parameters provided when buying an NFT.

```markdown
`nftId`: NFT id auctioned.
`marketplaceId`: Marketplace id where the NFT was listed for auction.
`creator`: The auction creator.
`startPrice`: The starting auction price of the NFT as a string corresponding to the value in a big number.
`startPriceRounded`: The starting auction price of the NFT as a number.
`buyItPrice`: If set, the price to directly buy the NFT before the auction starts as a string corresponding to the value in a big number.
`buyItPriceRounded`: If set, The price to directly buy the NFT before the auction starts as a number.
`startBlock`: The auction starting block number.
`endBlock`: The auction ending block number.
```

## Support

If you face any trouble, feel free to reach out to our community engineers in our [Discord](https://discord.gg/fUmBkPpnRu).
