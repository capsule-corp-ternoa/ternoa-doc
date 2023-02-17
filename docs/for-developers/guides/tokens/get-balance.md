---
sidebar_position: 1
sidebar_label: How to get CAPS token balance
---

# CAPS Token Balance

CAPS is the Ternoa blockchain token. Transactions made on the Ternoa blockchain are carried out in CAPS. It is used in particular for the creation of NFTs, Encryption, storage data over time.

## Prerequisites

Before getting started, make sure you have the following ready:

1. Create a [Ternoa account](/for-developers/get-started/create-account) with [Alphanet CAPS](/for-developers/get-started/create-account#step-2-get-some-free-test-caps-tokens)
2. Install and set up your editor of choice (we will use Visual Studio Code [VSC] in this tutorial)
3. Install [NodeJS v.14+](https://nodejs.org/en/download/) & NPM
4. [Initialize Ternoa-JS](/for-developers/get-started/install-ternoa-js#step-2-initialize-ternoa-js)

## How to get the total CAPS balance of an address

This example shows how to get the total CAPS balance of an address using `getTotalBalance`. The total balance corresponds to the sum of the free balance and the reserve balance. The `balanceToNumber` helper is used to format balances from a BN (big number) to a humanize value.

```typescript showLineNumbers
import { balanceToNumber, getTotalBalance } from "ternoa-js";

// Public address of the known account we want to use
const ADDRESS = "5Cf8PBw7QiRFNPBTnUoks9Hvkzn8av1qfcgMtSppJvjYcxp6";

const main = async () => {
  try {
    const totalBalanceBN = await getTotalBalance(ADDRESS);
    const totalBalance = balanceToNumber(totalBalanceBN);
    console.log(`The total balance of ${ADDRESS} is:`, totalBalance);
  } catch (e) {
    console.error(e);
  }
};

main();
```

## How to get the transferrable CAPS balance of an address

This example shows how to get the transferrable CAPS balance of an address using `getTransferrableBalance`. The transferrable balance corresponds to the liquid balance of an account; we do not take into account the staked balance nor the balance locked on the governance. The `balanceToNumber` helper is used to format balances from a BN (big number) to a humanize value.

```typescript showLineNumbers
import { balanceToNumber, getTransferrableBalance } from "ternoa-js";

// Public address of the known account we want to use
const ADDRESS = "5Cf8PBw7QiRFNPBTnUoks9Hvkzn8av1qfcgMtSppJvjYcxp6";

const main = async () => {
  try {
    const transferrableBalanceBN = await getTransferrableBalance(ADDRESS);
    const transferrableBalance = balanceToNumber(transferrableBalanceBN);
    console.log(
      `The transferrable balance of ${ADDRESS} is:`,
      transferrableBalance
    );
  } catch (e) {
    console.error(e);
  }
};

main();
```

## How to subscribe to CAPS balance changes

This example shows how to retrieve balance updates.

```typescript showLineNumbers
import { balanceToNumber, getBalances, getRawApi } from "ternoa-js";

const ADDRESS = "5Cf8PBw7QiRFNPBTnUoks9Hvkzn8av1qfcgMtSppJvjYcxp6";

const main = async () => {
  try {
    const api = getRawApi();

    // Retrieve the initial balance.
    let previousFree = (await getBalances(ADDRESS)).free;
    console.log(`Initial balance: ${balanceToNumber(previousFree)}`);

    // Here we subscribe to any balance changes and update the on-screen value
    api.query.system.account(
      ADDRESS,
      ({ data: { free: currentFree } }: any) => {
        // Calculate the delta
        const change = currentFree.sub(previousFree);

        // Only display positive value changes (Since we are pulling `previous` above already,
        // the initial balance change will also be zero)
        if (!change.isZero()) {
          console.log(`New balance: ${balanceToNumber(currentFree)}`);
          console.log(`Change of ${balanceToNumber(change)}`);

          previousFree = currentFree;
        }
      }
    );
  } catch (e) {
    console.error(e);
  }
};

main();
```

## How to get the CAPS balances for multiple accounts

## Support

If you face any trouble, feel free to reach out to our community engineers in our [Discord](https://discord.gg/fUmBkPpnRu).
