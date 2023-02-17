---
sidebar_position: 2
sidebar_label: How to mint a Soulbound NFT on-chain
---

# How to mint a Soulbound NFT on-chain

A soulbound token (SBT) is a unique and indivisible Basic NFT that is bound to a specific account and **cannot be traded or transferred** to another account once it has been received from the creator.

## Prerequisites

Before getting started, make sure you have the following ready:

1. Create a [Ternoa account](/for-developers/get-started/create-account) with [Alphanet CAPS](/for-developers/get-started/create-account#step-2-get-some-free-test-caps-tokens)
2. Install and set up your editor of choice (we will use Visual Studio Code [VSC] in this tutorial)
3. Install [NodeJS v.14+](https://nodejs.org/en/download/) & NPM
4. [Initialize Ternoa-JS](/for-developers/get-started/install-ternoa-js#step-2-initialize-ternoa-js)

## Minting a Soulbound NFT on-chain using Ternoa-JS

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

## Support

If you face any trouble, feel free to reach out to our community engineers in our [Discord](https://discord.gg/fUmBkPpnRu).
