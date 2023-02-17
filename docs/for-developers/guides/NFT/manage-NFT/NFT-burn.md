---
sidebar_position: 3
sidebar_label: How to burn an NFT
---

# Manage NFT - Burn

Ternoa provides you with many NFT features. Not only creating an NFT can be done in just a few lines of code but we also cover many NFT basic usecases: Ternoa allows you to easily create functions to delegate, transfer, burn an NFT or even set the NFT royalty without using any smart contracts.

## Prerequisites

Before getting started, make sure you have the following ready:

1. Create a [Ternoa account](/for-developers/get-started/create-account) with [Alphanet CAPS](/for-developers/get-started/create-account#step-2-get-some-free-test-caps-tokens)
2. Install and set up your editor of choice (we will use Visual Studio Code [VSC] in this tutorial)
3. Install [NodeJS v.14+](https://nodejs.org/en/download/) & NPM
4. [Initialize Ternoa-JS](/for-developers/get-started/install-ternoa-js#step-2-initialize-ternoa-js)

## How to burn an NFT using Ternoa-JS

This function burns an NFT from the Ternoa chain. It returns an object promise containing the NFTBurnedEvent provided by the Ternoa blockchain.
Use your own account by updating the //TernoaTestAccount with your account seed when retrieving the keyring from the example below. **Replace the NFT_ID variable** with the ID you want to burn.

```typescript showLineNumbers
import {
  burnNft,
  initializeApi,
  getKeyringFromSeed,
  WaitUntil,
} from "ternoa-js";

const burnNFT = async () => {
  try {
    await initializeApi();
    const keyring = await getKeyringFromSeed("//TernoaTestAccount");
    const NFT_ID = 1; // the NFT id to burn
    const nftData = await burnNft(NFT_ID, keyring, WaitUntil.BlockInclusion);
    console.log(`NFT ${nftData.nftId} undelegated`);
  } catch (e) {
    console.error(e);
  }
};
```

### The expected params

```typescript
`id`: The ID of the NFT to burn.
`keyring`:  the provided keyring (containing the address) will be used to sign the transaction and pay the execution fee.
`waitUntil`: WaitUntil define at which point we want to get the results of the transaction execution: BlockInclusion or BlockFinalization.
```

### Response

The response provided from the blockchain event includes all the informations below according to the params provided when burning the NFT.

```typescript
`nftId`: ID of the burnt NFT.
```

## How to retrieve a burnt NFT using Ternoa Indexer

Ternoa indexer is **a record of the Ternoa Chain data.**
You can query data for some specific entities (NFT, Collection, Markeplace(...)) using graphql.
_In this exemple, we use the graphql-request library._

You first need to prepare a stringified query to get NFT data from a specific NFT id, as we did in the query(id) function.
Do not hesitate to adapt the information you require in your query. When the query is ready, you can make the request to our indexer by providing both the indexer endpoint and the query. To check if the NFT is burnt owner should be set to null, and a timestampBurn must be filled.

```typescript showLineNumbers
import { request, gql } from "graphql-request";

const NFT_ID = 0;
const query = (id: number) => gql`
    {
      nftEntity(id: "${id}") {
        nftId
        owner
        creator
        timestampBurn
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
  nftId: string;
  owner: string;
  creator: string;
  timestampBurn: string;
  #Date;
};
```

## Support

If you face any trouble, feel free to reach out to our community engineers in our [Discord](https://discord.gg/fUmBkPpnRu).
