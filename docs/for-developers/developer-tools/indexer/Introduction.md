---
sidebar_position: 1
---

# Introduction

The indexer is an Open, Flexible, Fast tool based on the **[SubQuery Framework](https://doc.subquery.network/).** It is used to transform blockchain data into a **graphql queryable database**.

### How it works:

The indexer scans through each block and their events to see what happened on the Ternoa Blockchain. It then parses all that data into entities and inserts it in a postgres DB.
Ternoa deploys its own indexer, and anybody can run his own.

> You can get more information on the **[SubQuery official documentation](https://doc.subquery.network/faqs/faqs.html)**

> You can also check out **[our repository](https://github.com/capsule-corp-ternoa/ternoa-subql)** to see how we set up the subquery project to connect to the ternoa blockchain.

### The most important files are:

-   Project.yaml: set up the endpoint, the genesis hash, the types file, and the different filters to get only the specific events / extrinsics needed. We can also filter on the success status of the event / extrinsic. (More details on the **[docs](https://doc.subquery.network/build/manifest/polkadot.html)**)
-   Schema.graphql: specifies the custom data we need to record in our postgres db.
-   The Mappings folder: Your mappingHandlers will handle the functions to transform the blockchain data into the needed GraphQL entities contained in the Schema.graphql. More info [here](https://academy.subquery.network/build/mapping/polkadot.html)
