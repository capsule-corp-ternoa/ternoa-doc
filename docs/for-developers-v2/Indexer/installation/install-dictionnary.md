---
sidebar_position: 3
---

# Dictionary installation

> Prerequisite: have yarn installed, docker and docker-compose installed and running on your machine.

You can setup your own dictionary to define what data you want to record for the chain.
The dictionary will be used by the indexer to get only blocks that match defined filter (for example, you can index only NFTs related transactions (extrinsic).

```bash
git clone https://github.com/capsule-corp-ternoa/ternoa-subql-dictionary
cd ternoa-subql-dictionary
git checkout v40/testnet # The branch mechanism follow the one in the indexer repo, indexer and dictionary should be on same version.
yarn install
yarn codegen
yarn build
docker-compose pull
docker-compose up
```

> Wait few seconds for the indexing to start, you can check the blockchain data in your local graphql playground (default: [localhost:3000](http://localhost:3000))