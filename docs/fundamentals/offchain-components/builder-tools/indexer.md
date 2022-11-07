---
sidebar_position: 1
---

# Introduction

A Blockchain stores data in a very disperesed manner, making it incredibly streneous to query relevant data for a specific usecase. There isn't a native feature/functionality to identify, sort and query linked data (spanning across multiple blocks).

Blockchain data aggregation tools are integral for an multi-chain future. Keeping that in mind, we've created a robust and secure way to index and aggregate data from our blockchain for multi-faceted use.

# Ternoa Indexer

Ternoa Indexer scans through each block and their events to see what happened on the Ternoa chain. It then parses all that data into custom entities and store them inside a database. Thus allowing one to leverage relevant data according to their specific search filters in a simplified manner.

The main difference with the Dictionary lies in the fact that with the Indexer we deal with specific Ternoa on-chain data based on our designed pallets.
For example, all data related to NFTs and collections are neatly recored in the Indexer.

Ternoa deploys its own indexer [here](https://indexer-mainnet.ternoa.dev/) on which you can submit GraphQL queries to retrieve on-chain data.
For more information on how to run your own Indexer go to the [developers section](/category/indexer).
