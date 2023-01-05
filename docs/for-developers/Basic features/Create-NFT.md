---
sidebar_position: 3
sidebar_label: Create NFT
---

# Create my first NFT

On Ternoa, to create a NFT you three actions to remind:

- **Create** a tx
- **Sign** the tx
- **Submit** the tx

## Simple Mode

Those three actions are simplified in one function: `createNft()`

`createNft()` function requires parameters:

- **offchainData** metadatas*
- **royalty** (in %)
- **collectionId** if you want this NFT to belong to a collection
- **isSoulbound** status. Boolean (false/true)
- **vkeyring** that will be used to sign and submit the transaction
- **waitUntil** callback parameter, to define at which point we want to get the results of the transaction execution.

Here a snippet example:

``` js showLineNumbers
// Imports
import { initializeApi } from "ternoa-js"
import { createNft } from "ternoa-js/nft"

const createMyFirstNFT = async () => {
  try {
    // We initialize the API instance
    await initializeApi()

    ... //we assume your keyring is already created and provided with CAPS to support transactions fees.  

    // Here we create, sign and submit the NFT transaction with your keyring
    const newNFT = await createNft("My first NFT", 10, undefined, false, keyring, WaitUntil.BlockInclusion)

    // Do something
    console.log(newNFT);
    ...

  } catch (e) {
    console.log(e)
  }
}
```

:::info
**offchainData** metadatas*: In most cases this will be an IPFS hash that points to a JSON file which contains fields as "name", "description" or "image". In other cases this can be a link to a either a static or a dynamic file, plain text or a small JSON string._ In the example below, we just pass a string.
:::