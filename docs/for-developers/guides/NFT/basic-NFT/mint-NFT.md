---
sidebar_position: 2
sidebar_label: How to mint a Basic NFT on-chain
---

# How to mint a Basic NFT on-chain

## Prerequisites

Before getting started, make sure you have the following ready:

1. Create a [Ternoa account](/for-developers/get-started/create-account) with [Alphanet CAPS](/for-developers/get-started/create-account#step-2-get-some-free-test-caps-tokens)
2. Install and set up your editor of choice (we will use Visual Studio Code [VSC] in this tutorial)
3. Install [NodeJS v.14+](https://nodejs.org/en/download/) & NPM
4. [Initialize Ternoa-JS](/for-developers/get-started/install-ternoa-js#step-2-initialize-ternoa-js)

## Minting a Basic NFT on-chain using Ternoa-JS

In order to create an NFT on the Ternoa chain, Ternoa-JS provides you with a `createNft` helper to do so. It returns an object promise containing the `NFTCreatedEvent` returned by the Ternoa blockchain.

```typescript showLineNumbers
import {
  createNft,
  initializeApi,
  getKeyringFromSeed,
  WaitUntil,
} from "ternoa-js";

const mintNFT = async () => {
  try {
    const keyring = await getKeyringFromSeed("//TernoaTestAccount");
    const nftData = await createNft(
      "IPFS_CID",
      0,
      undefined,
      false,
      keyring,
      WaitUntil.BlockInclusion
    );
    console.log("The on-chain NFT id is: ", nftData.nftId);
  } catch (e) {
    console.error(e);
  }
};
```

:::info

Use your own account by updating the `//TernoaTestAccount` with your account seed when retrieving the keyring from the example below.

:::

Here are detailed the `createNft` helper parameters:

```typescript
`offchainData`: a string that can be IPFS hash that points to a JSON file, a plain text, a small JSON string, or a link to either a static or a dynamic file.
`royalty`: a number (in percentage between 0 an 100) to set the royalties taken by the owner for each NFT sale.
`collectionId`: an optional parameter. If you want your NFT to belong to a collection, add the collection id here otherwise keep it undefined.
`isSoulbound`: (boolean): when set to true, the NFT will be a soulbound NFT. Default is false.
`keyring`:  the provided keyring (containing the address) will be used to sign the transactio and pay the execution fee.
`waitUntil`: WaitUntil define at which point we want to get the results of the transaction execution: BlockInclusion or BlockFinalization.
```

The response returned includes all the informations below according to the parameters provided when creating the NFT. Note that `MintFee` refers to the fee paid to mint the NFT in Big Number format (`MintFeeRounded` is the humanized format, more easy and friendly to use).

```typescript
`nftId`: ID of the NFT.
`owner`: The owner of the NFT.
`offchainData`: The off-chain data provided for the NFT.
`royalty`: The royalty fee set for the NFT.
`collectionId`: The ID of the collection the NFT belongs.
`isSoulbound`: True if the NFT is soulbound. False if the NFT is not soulbound.
`mintFee`: Minting fee for the NFT. Big Number format
`mintFeeRounded`: Minting fee for the NFT. Basic number format.
```

## Support

If you face any trouble, feel free to reach out to our community engineers in our [Discord](https://discord.gg/fUmBkPpnRu).
