---
sidebar_position: 1
sidebar_label: Create an NFT
---

# Create an NFT

Ternoa provides you with many NFT features. Not only creating an NFT can be done in just a few lines of code but we also cover many NFT basic usecases: Ternoa allows you to easily create functions to delegate, transfer, burn an NFT or even set the NFT royalties without using any smart contracts.

## Prerequisites

Before getting started, make sure you have the following ready:

1. Create a [Ternoa account](/for-developers/get-started/create-account) with Alphanet CAPS
2. Install and set up your editor of choice (we will use Visual Studio Code [VSC] in this tutorial)
3. Install [NodeJS v.14+](https://nodejs.org/en/download/) & NPM

## Step 1: Initialize Ternoa-JS

To initialize the library, add the following code to your dApp:

```typescript showLineNumbers
import { initializeApi } from "ternoa-js";

await initializeApi();
```

## Step 2: How to create an NFT on-chain

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
      "hello world",
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

## Step 3: How to retrieve an NFT using our Indexer

Ternoa indexer is **a record of the Ternoa Chain data.**
You can query data for some specific entities (NFT, Collection, Marketplace(...)) using GraphQL.
_In this exemple, we use the graphql-request library._

You first need to prepare a stringified query to get NFT data from a specific NFT id, as we did in the query(id) function.
Do not hesitate to adapt the information you require in your query. When the query is ready, you can make the request to our indexer by providing both the indexer endpoint and the query.

```typescript showLineNumbers
import { request, gql } from "graphql-request";

const NFT_ID = 0;
const query = (id: number) => gql`
    {
      nftEntity(id: "${id}") {
        owner
        nftId
        offchainData
        collectionId
        royalty
        isSoulbound
      }
    }
`;

const getNftData = async () => {
  try {
    const response = await request<{ nftEntity: NftType }>(
      "https://indexer-alphanet.ternoa.dev",
      query(NFT_ID)
    );
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

type NftType = {
  owner: string;
  nftId: string;
  offchainData: string;
  collectionId: string;
  royalty: number;
  isSoulbound: boolean;
};
```

## And after ?

Now you know how to create an NFT with the Ternoa-js API, and retieve all its information using the indexer, why not to add your NFT to a collection ? Or even better, why not listing for sale on Marketplace.

## Support

If you face any trouble following the tutorial, feel free to reach out to our community engineers in our [Discord](https://discord.gg/fUmBkPpnRu).
