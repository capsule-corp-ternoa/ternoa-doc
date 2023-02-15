---
sidebar_position: 2
sidebar_label: Create a Soulbound Token
---

# Create a Soulbound Token

A soulbound token (SBT) is a unique and indivisible Basic NFT that is bound to a specific account and **cannot be traded or transferred** to another account once it has been received from the creator.

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

## Step 2: How to create a Soulbound NFT on-chain

```js showLineNumbers
// Imports
import { initializeApi } from "ternoa-js";
import { createNft } from "ternoa-js/nft";

const mintSBT = async () => {
  try {
    const keyring = await getKeyringFromSeed("//TernoaTestAccount");
    const newSBT = await createNft(
      "My first SBT",
      0,
      undefined,
      true, // Is soulbound
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

The response returned includes an `NFTCreatedEvent` if the transaction succeed. The particularity here is that the **isSoulbound** field is _true_.

## Bonus: How to retrieve the last 10 Soulbound Tokens minted using our Indexer

Ternoa indexer is **a record of the Ternoa Chain data.**
You can query data for some specific entities (NFT, Collection, Marketplace(...)) using GraphQL.
_In this exemple, we use the graphql-request library._

You first need to prepare a stringified query to get NFT data from a specific NFT id, as we did in the query(id) function.
Do not hesitate to adapt the information you require in your query. When the query is ready, you can make the request to our indexer by providing both the indexer endpoint and the query.

```typescript showLineNumbers
import { request, gql } from "graphql-request";

const query = () => gql`
  {
    nftEntities(
      filter: { isSoulbound: { equalTo: true } }
      first: 10
      orderBy: [TIMESTAMP_CREATE_DESC]
    ) {
      nodes {
        owner
        nftId
        offchainData
        collectionId
        royalty
        isSoulbound
      }
    }
  }
`;

const getLastestSBT = async () => {
  try {
    const response = await request<{ nftEntities: { nodes: NftType[] } }>(
      "https://indexer-alphanet.ternoa.dev",
      query()
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

## Support

If you face any trouble following the tutorial, feel free to reach out to our community engineers in our [Discord](https://discord.gg/fUmBkPpnRu).
