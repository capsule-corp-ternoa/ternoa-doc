---
sidebar_position: 1
sidebar_label: Create NFT transaction
---

# Create an NFT transaction

Now we have seen the most friendly way to create an NFT in a signle line, with the automation of the workflow (**Create => Sign => Send**), we can dig a bit more. For some reason, **_you will need to go manually into the whole process_**.

This way is more complex, but offers more versatilty: ex if you split the process and execute it by yourself, _you will be able for example to make a batch of transactions_ (this concept is covered in the [example](#) section) instead of doing it one by one.

It's very useful if you want to create a large amount of NFT and avoid to sign and send them one by one. 

Let's go into the detail of each step to create an NFT manually. 

First, instead of using the `createNft()` function, you will use the `createNftTx()`. And instead of creating, signing and submitting the transaction and getting the returned events, it will create an unsigned and unsubmitted Create-NFT **Transaction Hash** ready to be used and valid for 5 minutes.


``` js showLineNumbers
// Imports
import { initializeApi } from "ternoa-js"
import { createNftTx } from "ternoa-js/nft"

const create createNFTManually = async () => {
  try {
    ...

    // STEP 1 : Here we create the transaction and get the transaction hash
    const nftTxHash = await createNftTx("My first NFT", 10, undefined, false)

    // Do something with the transaction hash
    console.log(nftTxHash);
    ...
  } catch (e) {
    console.log(e)
  }
}
```