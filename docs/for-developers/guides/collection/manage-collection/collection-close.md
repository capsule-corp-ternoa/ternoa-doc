---
sidebar_position: 2
sidebar_label: How to close a Collection
---

# Manage Collection - Close

Ternoa provides you with many collection features. Not only creating a collection can be done in just a few lines of code but we also cover many collection basic usecases: Ternoa allows you to easily create functions to close, limit and burn a collection.

## Prerequisites

Before getting started, make sure you have the following ready:

1. Create a [Ternoa account](/for-developers/get-started/create-account) with [Alphanet CAPS](/for-developers/get-started/create-account#step-2-get-some-free-test-caps-tokens)
2. Install and set up your editor of choice (we will use Visual Studio Code [VSC] in this tutorial)
3. Install [NodeJS v.14+](https://nodejs.org/en/download/) & NPM
4. [Install & initialize Ternoa-JS](/for-developers/get-started/install-ternoa-js)

## How to close a collection of NFT using Ternoa-JS

This function closes a collection of NFT on the Ternoa chain. It returns an object promise containing the CollectionClosedEvent provided by the Ternoa blockchain.
Use your own account by updating the //TernoaTestAccount with your account seed when retrieving the keyring from the example below. **Replace the COLLECTION_ID** with the one to close.

```typescript showLineNumbers
import {
  closeCollection,
  initializeApi,
  getKeyringFromSeed,
  WaitUntil,
} from "ternoa-js";

const closeCollection = async () => {
  try {
    await initializeApi();
    const keyring = await getKeyringFromSeed("//TernoaTestAccount");
    const COLLECTION_ID = 1; // the collection id you want to close
    const collectionData = await closeCollection(
      COLLECTION_ID,
      keyring,
      WaitUntil.BlockInclusion
    );
    console.log(`Collection ${collectionData.collectionId} closed`);
  } catch (e) {
    console.error(e);
  }
};
```

### The expected params

```markdown
`id`: The ID of the Collection.
`keyring`: the provided keyring (containing the address) will be used to sign the transaction and pay the execution fee.
`waitUntil`: WaitUntil define at which point we want to get the results of the transaction execution: BlockInclusion or BlockFinalization.
```

### Response

The response provided from the blockchain event includes all the informations below according to the params provided when closing a collection of NFT.

```markdown
`collectionId`: ID of the closed collection.
```

## How to retrieve a closed collection using Ternoa Indexer

Ternoa indexer is **a record of the Ternoa Chain data.**
You can query data for some specific entities (NFT, Collection, Marketplace(...)) using graphql.
_In this exemple, we use the graphql-request library._

You first need to prepare a stringified query to get collection data from a specific collection id, as we did in the query(id) function.
Do not hesitate to adapt the information you require in your query. When the query is ready, you can make the request to our indexer by providing both the indexer endpoint and the query. To check if the collection is closed, just add the `**isClosed**` and `**timestampClose**`fields in the list.

```typescript showLineNumbers
import { request, gql } from "graphql-request";

const COLLECTION_ID = 0;
const query = (id: number) => gql`
    {
      collectionEntity(id: "${id}") {
        collectionId
        nbNfts
        isClosed
        timestampClose
      }
    }
`;

const getCollectionData = async () => {
  try {
    const response = await request<{ collectionEntity: CollectionType }>(
      "https://indexer-alphanet.ternoa.dev",
      query(COLLECTION_ID)
    );
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

type CollectionType = {
  collectionId: string;
  nbNfts: number;
  isClosed: boolean;
  timestampClose: string | null;
};
```

## Support

If you face any trouble, feel free to reach out to our community engineers in our [Discord](https://discord.gg/fUmBkPpnRu).
