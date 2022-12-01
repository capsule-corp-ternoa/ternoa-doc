---
sidebar_position: 4
sidebar_label: E2E Test dApp
---

# 🧩 E2E Test dApp

**The E2E test dApp is the easiest way to test our SDK.** 

=> [E2E Test dApp](https://e2e.ternoa.network/)

## Getting Started the Ternoa JS Test Dapp
### [Node.js](https://nodejs.org/en/download/)

```bash
npm install ternoa-js
```

First, run the development server:

```bash
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** with your browser to see the result.

### Code Style

This project uses recommended ESLint and Typescript rules to ensure coding good practices.

We've setup linters and formatters to help catch errors and improve the development experience:

- **[Prettier](https://prettier.io/)** – ensures that code is formatted in a readable way.
- **[ESLint](https://eslint.org/)** — checks code for antipatterns as well as formatting.

**[Husky](https://typicode.github.io/husky)** proceeds some checks before pushing a new commit. It ensures that: the project is building, there are no linter/formatting issues and the test suites are not broken.

> If you use Visual Studio Code editor we suggest you to install **[ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)** and **[Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)** extensions.

___

## App Worklow 🏄‍♂️
The **[Helpers](https://e2e.ternoa.network/app/NFT/CreateNFT)** section list several helpers from our SDK and their parameters presented in a form. The request is created once the required fields are correctly filled in. It has to be signed before being submited to the chain. You can connect your Ternoa Wallet with Wallet Connect or use your Polkadot extension.

Ternoa ecosystem is based on 2 environments: **Alphanet** & **Mainnet**, where transactions are conducted in **$CAPS token**.
- **Alphanet** stands for the gateway to explore and test the Ternoa chain. It uses test $CAPS tokens claimable on our faucet: **[Alphanet Faucet](https://www.ternoa.com/alphanet)**.
- **Mainnet** is the main chain where data is stored.

:::tip

**By default** the dApp is connected to the Alphanet chain. 
You can swith to Mainnet by clicking on the pill located on the top right corner.

:::

___

## Contribution 🤝
ternoa-js SDK and the ternoa-js-test-dapp are open-source projects. Feel free to interact and move forward with us.

If you are interested in contributing to ternoa-js-test-dapp read our **[contributing guidelines](https://github.com/capsule-corp-ternoa/ternoa-js-test-dapp/blob/main/CONTRIBUTING.md)**.

If you have questions about anything related to Ternoa-js, we will be please to help you. Open a discussion on our **[GitHub Discussions](https://github.com/capsule-corp-ternoa/ternoa-js/discussions)**. And if you find an issue, lets us know about it here in our **[GitHub Issues](https://github.com/capsule-corp-ternoa/ternoa-js/issues)** section.