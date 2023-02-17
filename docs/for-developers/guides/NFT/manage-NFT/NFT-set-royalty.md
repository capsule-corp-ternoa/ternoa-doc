---
sidebar_position: 4
sidebar_label: How to set an NFT royalty
---

# Manage NFT - Set Royalty

Ternoa provides you with many NFT features. Not only creating an NFT can be done in just a few lines of code but we also cover many NFT basic usecases: Ternoa allows you to easily create functions to delegate, transfer, burn an NFT or even set the NFT royalty without using any smart contracts.

## Prerequisites

Before getting started, make sure you have the following ready:

1. Create a [Ternoa account](/for-developers/get-started/create-account) with [Alphanet CAPS](/for-developers/get-started/create-account#step-2-get-some-free-test-caps-tokens)
2. Install and set up your editor of choice (we will use Visual Studio Code [VSC] in this tutorial)
3. Install [NodeJS v.14+](https://nodejs.org/en/download/) & NPM
4. [Initialize Ternoa-JS](/for-developers/get-started/install-ternoa-js#step-2-initialize-ternoa-js)

## How to set an NFT royalty using Ternoa-JS

This function sets the NFT royalty on the Ternoa chain. It returns an object promise containing the NFTRoyaltySetEvent provided by the Ternoa blockchain.
Use your own account by updating the //TernoaTestAccount with your account seed when retrieving the keyring from the example below. **Replace the NFT_ID, and royalty variables** with the ID you want to set the royalty and the royalty amount.

```typescript showLineNumbers
import {
  setRoyalty,
  initializeApi,
  getKeyringFromSeed,
  WaitUntil,
} from "ternoa-js";

const delegateNFT = async () => {
  try {
    await initializeApi();
    const keyring = await getKeyringFromSeed("//TernoaTestAccount");
    const NFT_ID = 1; // the NFT id to update the royalty
    const royalty = 10;
    const nftData = await setRoyalty(
      NFT_ID,
      royalty,
      keyring,
      WaitUntil.BlockInclusion
    );
    console.log(`NFT ${nftData.nftId} undelegated`);
  } catch (e) {
    console.error(e);
  }
};
```

### The expected params

```typescript
`id`: The ID of the NFT to update the royalty.
`amount`: The new royalty value.
`keyring`:  the provided keyring (containing the address) will be used to sign the transaction and pay the execution fee.
`waitUntil`: WaitUntil define at which point we want to get the results of the transaction execution: BlockInclusion or BlockFinalization.
```

### Response

The response provided from the blockchain event includes all the informations below according to the params provided when updating the NFT's royalty.

```typescript
`nftId`: ID of the updated NFT.
`royalty`: The new royalty amount as a number.
```

## How to retrieve an NFT royalty using Ternoa Indexer

Ternoa indexer is **a record of the Ternoa Chain data.**
You can query data for some specific entities (NFT, Collection, Markeplace(...)) using graphql.
_In this exemple, we use the graphql-request library._

You first need to prepare a stringified query to get NFT data from a specific NFT id, as we did in the query(id) function.
Do not hesitate to adapt the information you require in your query. When the query is ready, you can make the request to our indexer by providing both the indexer endpoint and the query. Check the NFT royalty filed.

```typescript showLineNumbers
import { request, gql } from "graphql-request";

const NFT_ID = 0;
const query = (id: number) => gql`
    {
      nftEntity(id: "${id}") {
        nftId
        owner
        creator
        royalty
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
  royalty: number;
};
```

## Support

If you face any trouble, feel free to reach out to our community engineers in our [Discord](https://discord.gg/fUmBkPpnRu).
