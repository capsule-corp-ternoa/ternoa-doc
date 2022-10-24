---
sidebar_position: 1
---

# Indexer

Ternoa Indexer scans through each block and their events to see what happened on the Ternoa chain. It then parses all that data into custom entities and store them inside a database.

The main difference with the Dictionary lies in the fact that with the Indexer we deal with specific Ternoa on-chain data based on our designed pallets.
For example, all data related to NFTs and collections are neatly recored in the Indexer.

Ternoa deploys its own indexer [here](https://indexer-mainnet.ternoa.dev/) on which you can submit GraphQL queries to retrieve on-chain data.
For more information on how to run your own Indexer go to the [developers section](/category/indexer).
