---
sidebar_position: 2
sidebar_label: How to transfer CAPS tokens
---

# CAPS Tokens Transfer

CAPS is the Ternoa blockchain token. Transactions made on the Ternoa blockchain are carried out in CAPS. It is used in particular for the creation of NFTs, Encryption, storage data over time.

## Prerequisites

Before getting started, make sure you have the following ready:

1. Create a [Ternoa account](/for-developers/get-started/create-account) with [Alphanet CAPS](/for-developers/get-started/create-account#step-2-get-some-free-test-caps-tokens)
2. Install and set up your editor of choice (we will use Visual Studio Code [VSC] in this tutorial)
3. Install [NodeJS v.14+](https://nodejs.org/en/download/) & NPM
4. [Install & initialize Ternoa-JS](/for-developers/get-started/install-ternoa-js)

## How to transfer CAPS to an address

This example shows how to transfer CAPS balance to an address using `balancesTransfer`. The `numberToBalance` helper is used to format the amount from a number value to a BN value according to chain decimals (18 decimal for Ternoa).

```typescript showLineNumbers
import {
  balancesTransfer,
  getKeyringFromSeed,
  numberToBalance,
  WaitUntil,
} from "ternoa-js";

const main = async () => {
  try {
    // The known accounts we want to use
    const keyring = await getKeyringFromSeed("//TernoaTestAccount");
    const TO_ADDRESS = "5GguNdS1T2J9BDFMqPhdPp8vtQxfhGJjiGwAaYF7TPLuiJPs";

    // Amount transferred: 1 CAPS
    const amount = numberToBalance(1); // 1 = 1000000000000000000 for the Ternoa blockchain

    const transferData = await balancesTransfer(
      TO_ADDRESS,
      amount,
      keyring,
      WaitUntil.BlockInclusion
    );
    console.log(
      `The amount transferred to ${TO_ADDRESS} is:`,
      transferData.amountRounded,
      "CAPS"
    );
  } catch (e) {
    console.error(e);
  }
};

main();
```

:::info
The `balancesTransferKeepAlive` helper can be used for transferring some liquid balance to another account with a check that the transfer will not kill the origin account.

The `balancesTransferAll` helper can be used for transferring the entire transferable balance from the caller account.
:::

## Support

If you face any trouble, feel free to reach out to our community engineers in our [Discord](https://discord.gg/fUmBkPpnRu).
