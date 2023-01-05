---
sidebar_position: 2
description: Start to initialize your dAppwith the Ternoa SDK.
---

# Configuration

This section will go through the main workflow process to execute a transaction. In just a few steps, you will be able to init the Ternoa SDK API and start using it. 

## Initialize the API

It's optional, but it's good practice to initialize the API as soon as possible. If this call is omitted, the first SDK call will return an exception.
 
``` js showLineNumbers
// Import
import { initializeApi } from "ternoa-js"

async function main() {
  // Construct
  await initializeApi();

  // Do something
  console.log("Api Connected");
  ...
}
```

:::caution
The default chain endpoint is: `DEFAULT_CHAIN_ENDPOINT = "wss://alphanet.ternoa.com"`.
:::

## How to customize the chain endpoint?

Simply pass the required endpoint to the `initializeApi()` function.

``` js showLineNumbers
  ...
   //endpoint here will make the init API on the Ternoa mainnet network
   await initializeApi('wss://mainnet.ternoa.io');

   // Do something
   console.log("Api Connected on mainnet");
  ...
}
```

**Note:** Ternoa SDK provides **a very useful** `getRawApi()` function to interact with the API. If the API is connected, it will be directly returned

``` js showLineNumbers
  ...
   //we assume that API has been initiated before
   const api = await getRawApi()

   // Do something
   // example : get last block
   const signedBlock = await api.rpc.chain.getBlock();
  ...
}
```

## Let's Create!

Now that we know how to init our SDK API, let's get into a feature example. The Ternoa-js provides _the most friendly way to build_ on the chain and execute a transaction. Let's go into detail and see an example of **how to create an NFT**.
