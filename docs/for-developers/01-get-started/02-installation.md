---
sidebar_position: 2
---

# Installation

This section explains how to install the required tools to build a decentralized javascript application (dApp).
Usually you start building your dApp on the Alphanet network with claimed CAPS tokens from the faucet.
Extend it to the Mainnet network will be as simple as changing the websocket endpoint.

## 1. Create a Ternoa Account

:::info
Before starting building your dApp on top of the Ternoa chain you will need a **Ternoa account**.
:::

#### Download Ternoa Wallet App

The easiest way to create an account is to use the [Ternoa Wallet](/wiki/wallet/) 📱

#### or Create an account on Polkadot Portal

You can also create a Ternoa account from the [Polkadot Portal](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fmainnet.ternoa.network#/accounts):

First click on the `+ Account` button.

![Step 1: Seed phrase](./assets/account1.png)

A modal will pop displaying your account address starting with the number `5` and a secret mnemonic sequence of words: this is your secret seed phrase.

*You should back up these words. Please, store the seed somewhere safe, secret, and secure. If you cannot access your account, you will be able to restore it using those words.*

Click on the checkbox and moved to step 2.

![Step 2: Name and password](./assets/account2.png)

Fullfil inputs with a descriptive name for your account and a strong password. Finally on step 3 click on the `+ Save` button.

![New account](./assets/account3.png)

Congratulations your account is created 🎉

### Extensions

Use an extension browser to simplify tansactions signing:

Official: 
- [Polkadot{.js} extension](https://polkadot.js.org/extension/)

Alternatives:
- [Talisman](https://docs.talisman.xyz/talisman/navigating-the-paraverse/account-management/download-the-extension)

## 2. Get some free test CAPS

The Alphanet faucet provides you with some free test CAPS tokens to start building on Ternoa on the Alphanet network.

It is accessible via the [Ternoa website](https://www.ternoa.network/alphanet).

Paste your fresh Ternoa account address created previously (it starts with the number `5` e.g. `5DFAg6g9n3fNT2qRUjP5sJ7R2pXKZ99PLVDSt5a1psr7BFJ1`), verify the captcha and click on the `Claim` button.

You will receive alpha CAPS tokens in few minutes.

![Faucet](./assets/faucet.png)

If the daily 100 CAPS are not enough, feel free to reach us on [Discord](https://discord.com/invite/mQeEWQj46a) for more.

## 3. Install ternoa-JS Library

Pre-requisites:
[Node.js](https://nodejs.org/en/download/)

On your existing JavaScript project, install the ternoa-js lib.

Install the latest stable version of the ternoa-js library by running this command:

```bash
npm install ternoa-js
```

> This package provides TypeScript types, but you will need TypeScript version 4.2 or higher to use them properly.

:::info
You can test out our upcoming features in our **Alpha** `@alpha` or **Release candidate** `@rc` versions. These versions aren't stable and might contain some technical errors. @alpha versions are for internal and public testing only whereas @rc releases tend to be the closest to its production version.
:::

You can check out our `version list` over @ [npm](https://www.npmjs.com/package/ternoa-js). Installing a specific version is as easy as replacing the `1.2.0-rc0` with your desired version:

```bash
# for version 1.2.0-rc0
npm i ternoa-js@1.2.0-rc0
```

That's all! You're ready to build your dApp on Ternoa!
