---
sidebar_position: 1
---

# Install Indexer

:::note remarque

 Have **yarn** installed, **docker** and **docker-compose installed** and running on your machine.

:::

If you check **[our repository](https://github.com/capsule-corp-ternoa/ternoa-subql)**, you will see that we have many branches.
Each branch correspond to a chain spec version (eg. v40, v41, v42, v43) and a chain environment (staging, testnet, mainnet).

To index the whole testnet chain, you will need to use different version of the indexer. At the beginning, the chain version was v40 and it got 2 runtime upgrades, first to v41 then v42.
You have to use the correct version of indexer depending on the specversion of the blocks you want to index.
- v40 -> v40/testnet
- v41 -> v41/testnet
- v42 -> v42/testnet

## Installation process

```bash
git clone https://github.com/capsule-corp-ternoa/ternoa-subql.git
cd ternoa-subql
git checkout v40/testnet
yarn install
yarn codegen
yarn build
```

- In the docker-compose.yml, change the graphql-engine image from query-ternoa to onfinality/subql-query:latest (we’ll see later how to use our custom query to have distinct and aggregation plugins)

```bash
docker-compose pull
docker-compose up
```

> Wait few seconds for the indexing to start, you can check the blockchain data in your local graphql playground (default: **[localhost:3000](http://localhost:3000))**
