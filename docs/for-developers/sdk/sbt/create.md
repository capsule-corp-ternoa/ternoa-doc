---
sidebar_label: Create an SBT
---

# 

## Overview

Here you will find an example on how to create a soulbound token (SBT) NFT.

## Pre-requisites

To get started with the SBT example, you must first complete the following setup instructions:

- Install ternoa-js: [Getting started](../getting-started)
- Setup your project: [SDK Workflow](../sdk-workflows)

Once you have completed these steps, you can begin working on the example. If you have any questions or encounter any issues, please refer to the project's documentation for additional guidance.

## Create a Soulbound Token

```js showLineNumbers
// Imports
import { initializeApi } from "ternoa-js"
import { createNft } from "ternoa-js/nft"

const createMyFirstSBT = async () => {
  try {
    // We initialize the API instance
    await initializeApi()

    ... //we assume your keyring is already created and provided with CAPS to support transactions fees.

    // Here we create, sign and submit the soulbound NFT transaction with your keyring
    const newSBT = await createNft(
      "My first SBT", // Off-chain related NFT metadata
      0, // Royalty
      undefined, // Collection id
      true, // Is soulbound
      keyring, // Account that will sign the transaction
      WaitUntil.BlockInclusion // Execution trigger
    )

    console.log(newSBT)
    ...

  } catch (e) {
    console.error(e)
  }
}
```

The newSBT returned contains an event field with an NFTCreatedEvent. The particularity here is that the isSoulbound field is set to true.