---
sidebar_position: 2
sidebar_label: How to mint a Collection on-chain
---

# How to mint a Collection on-chain

## Prerequisites

Before getting started, make sure you have the following ready:

1. Create a [Ternoa account](/for-developers/get-started/create-account) with [Alphanet CAPS](/for-developers/get-started/create-account#step-2-get-some-free-test-caps-tokens)
2. Install and set up your editor of choice (we will use Visual Studio Code [VSC] in this tutorial)
3. Install [NodeJS v.14+](https://nodejs.org/en/download/) & NPM
4. [Install & initialize Ternoa-JS](/for-developers/get-started/install-ternoa-js)

## Minting a Collection on-chain using Ternoa-JS

In order to create a Collection on the Ternoa chain, Ternoa-JS provides you with a `createCollection` helper to do so. It returns an object promise containing the `CollectionCreatedEvent` returned by the Ternoa blockchain.

Replace _IPFS_CID_ in the following code snippet with your CID hash previouly generated in ["How to prepare Collection assets"](/for-developers/guides/collection/create-collection/prepare-assets):

```typescript showLineNumbers
import {
  createCollection,
  initializeApi,
  getKeyringFromSeed,
  WaitUntil,
} from "ternoa-js";

const main = async () => {
  try {
    const keyring = await getKeyringFromSeed("//TernoaTestAccount");
    const collectionData = await createCollection(
      "IPFS_CID",
      undefined,
      keyring,
      WaitUntil.BlockInclusion
    );
    console.log("The on-chain Collection id is: ", collectionData.collectionId);
  } catch (e) {
    console.error(e);
  }
};
```

:::info

Use your own account by updating the `//TernoaTestAccount` with your account seed when retrieving the keyring from the example below.

:::

Here are detailed the `createCollection` helper parameters:

```markdown
`offchainData`: a string that can be IPFS CID hash that points to a JSON file, a plain text, a small JSON string, or a link to either a static or a dynamic file.
`limit`: (Optionnal) an amount of NFT that can be associated with this collection.
`keyring`: the provided keyring (containing the address) will be used to sign the transactio and pay the execution fee.
`waitUntil`: WaitUntil define at which point we want to get the results of the transaction execution: BlockInclusion or BlockFinalization.
```

The response returned includes all the informations below according to the parameters provided when creating the Collection.

```markdown
`collectionId`: ID of the Collection.
`owner`: The owner of the Collection.
`offchainData`: The off-chain data provided for the Collection.
`limit`: The limit set for the Collection is defined.
```

## Next

Next step will be getting the Collection data from the Ternoa Indexer using the Collection id just generated. Keep it and continue on the ["How to retrieve a Collection"](/for-developers/guides/collection/create-collection/get-collection) guide.

## Support

If you face any trouble, feel free to reach out to our community engineers in our [Discord](https://discord.gg/fUmBkPpnRu).
