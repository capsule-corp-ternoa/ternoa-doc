---
sidebar_position: 1
---

# Install Indexer

:::note NOTE

 Have **yarn** installed, **docker** and **docker-compose installed** and running on your machine.

:::

If you check **[our repository](https://github.com/capsule-corp-ternoa/ternoa-subql)**, you will see that we have many branches.
Each branch correspond to a chain spec version and a chain environment (the old testnet (soon deprecated), the alphanet and mainnet).

## Installation process

```bash
git clone https://github.com/capsule-corp-ternoa/ternoa-subql.git
cd ternoa-subql
git checkout alphanet
yarn install
yarn codegen
yarn build
```

Every time the graphQl Schema change, you need to run the yarn codegen command.
Every time the code change, you need to build it again with the yarn build command.
Now everything is built, you can launch it on with docker. 

```bash
docker-compose pull
docker-compose up
```

docker-compose pull need to be run to pull the last version and does not need to be ran again, unless you change any docker image.

> After a few seconds, the indexing starts. You can see in the shell every blocks indexed. To check the blockchain data stored, run a [query](/for-developers/indexer/queries/basic-queries) in your local graphql playground in a browser (default **[localhost:3000](http://localhost:3000)**).

## Common errors on containers start

### Database conection failed

```bash
ERROR Unable to connect to the database SequelizeConnectionRefusedError: connect ECONNREFUSED XX.XX.XX.XX:YYYY
``` 

The subquery-node container tends to be ready before the postgres one. No worries, it will automatically restart until the database is ready.

### Outdated .data

```bash
ERROR Node failed to start AssertionError: Specified project manifest chain id / genesis hash does not match database stored genesis hash, consider cleaning project schema using --force-clean
``` 


Remember to delete the `.data` folder at root on the network changes. Also make sure to use the corret network genesis hash in the `project.yaml` file.



