---
sidebar_position: 2
sidebar_label: Install the Ternoa-JS Library
---

import CodeBlock from "@theme/CodeBlock";

# Install the Ternoa-JS Library

## What is the Ternoa-Js library?

An isomorphic NodeJs library integrating the custom Ternoa FRAMEs to interact with the chain in a seamless experience.

## Step 1: Install Ternoa-JS

> Prerequisites:
> [NodeJS v.14+](https://nodejs.org/en/download/) & NPM

Install the latest stable version of the ternoa-js library in your existing project by running:

<CodeBlock language="shell" showLineNumbers>
  npm install ternoa-js
</CodeBlock>

> This package provides TypeScript types, but you will need TypeScript version 4.2 or higher to use them properly.

:::info

You can test out our upcoming features in our **Alpha** `@alpha` or **Release candidate** `@rc` versions. These versions aren't stable and might contain some technical errors. @alpha versions are for internal and public testing only whereas @rc releases tend to be the closest to its production version.

You can check out our `version list` over @ [npm](https://www.npmjs.com/package/ternoa-js). Installing a specific version is as easy as replacing the `1.2.0-rc0` with your desired version:

```bash showLineNumbers
# for version 1.2.0-rc0
npm i ternoa-js@1.2.0-rc0
```

:::

## Step 2: Initialize Ternoa-JS

To initialize the library, add the following code to your dApp:

```typescript showLineNumbers
import { initializeApi } from "ternoa-js";

await initializeApi();
```

Once the Ternoa-JS library is initialized, you will be able to use all the powerful NFT FRAMEs designed by Ternoa to build your dApps.

:::info
The default network used is Alphanet. To connect to the Mainnet network it is as simple as passing a the correct WSS endpoint:

```typescript showLineNumbers
import { initializeApi } from "ternoa-js";

//endpoint here will make the init API on the Ternoa Mainnet network
await initializeApi("wss://mainnet.ternoa.io");
```

:::

That's all! You're ready to build your dApp on Ternoa!
