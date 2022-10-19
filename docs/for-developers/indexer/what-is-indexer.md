---
sidebar_position: 1
---

# What is the indexer

The indexer is a tool based on the **[SubQuery project](https://doc.subquery.network/).** It is used to transform blockchain data into a graphql queryable database.

The indexer scans through each block and their events to see what happened. It then parses all that data into entities and inserts it in a postgres DB.
Ternoa deploys its own indexer, and anybody can run his own. 

> You can get more information on the **[SubQuery official documentation](https://doc.subquery.network/faqs/faqs/)**

> You can also check out **[our repository](https://github.com/capsule-corp-ternoa/ternoa-subql)** to see how we setup the subquery project to connect to the ternoa blockchain.

### The most important files are :

-	Project.yaml: setup the endpoint, the genesis hash, the types file, and the different filter to get only the specific event / extrinsic we need. We can also filter on the specVersion or the success status of the event / extrinsic. (More details on the **[docs](https://doc.subquery.network/create/manifest/))**
-	Types.json: specifies the types needed to decode blockchain data. This file is not needed anymore from Ternoa blockchain version 43. (The file is available on our **[public chain repository](https://github.com/capsule-corp-ternoa/chain/tree/main/types))**
-	Schema.graphql: specifies the custom data we need to record in our postgres db.