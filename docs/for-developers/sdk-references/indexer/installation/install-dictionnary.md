---
sidebar_position: 2
---

# Install Dictionary

:::note remarque

**Prerequisite**: have **yarn installed**, **docker** and **docker-compose installed** and running on your machine.

:::

You can setup your own dictionary to define what data you want to record for the chain.
The dictionary will be used by the indexer to get only blocks that match defined filter (for example, you can index only NFTs related transactions (extrinsic).

Check **[Our repository]https://github.com/capsule-corp-ternoa/ternoa-subql-dictionary)** here.

```bash
git clone https://github.com/capsule-corp-ternoa/ternoa-subql-dictionary
cd ternoa-subql-dictionary
git checkout v43/alphanet # The branch mechanism follow the one in the indexer repo, indexer and dictionary should be on same version.
yarn install
yarn codegen
yarn build
docker-compose pull
docker-compose up
```

> After a few seconds, the indexing starts. You can see in the shell every blocks indexed. To check the blockchain data stored, run a [query](/for-developers/indexer/queries/basic-queries) in your local graphql playground in a browser (default **[localhost:3000](http://localhost:3000)**).
