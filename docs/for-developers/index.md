---
sidebar_position: 4
sidebar_label: For Developers
---

# For Developers

This section explains how to install the required tools to build a decentralized javascript application (dApp) on top of Ternoa chain.

```mdx-code-block
import DocCardList from '@theme/DocCardList';

<DocCardList />
```

The sections above will provide you with all you need to know to install and use [Ternoa-JS SDK](/category/javascript-sdk), [Indexer](/category/indexer) and [Dictionary](/for-developers/indexer/dictionary/). The following [FAQ](#faq) answers common questions about which tool to use.

## FAQ

### When should I use Ternoa-JS getters or Indexer queries to get on-chain data?

Ternoa-JS SDK facilitates interaction with Ternoa chain, it offers the possibility of retrieving stored on-chain data and chain constants. However, it is still preferable to use the Indexer for data fetching for several reasons.

First, you will be able to query specific data by combining Indexer's filters and sorting options.

Then even if you want to retrieve data from a particular NFT for example, it is still best to use the Indexer to avoid overloading the chain.

### What are the differences between the Dictionary and the Indexer?

Both tools scan through each block and their events to see what happened on the Ternoa chain: they listen, parse and record data into a database. The main two differences are:

- Dictionary deals with native substrate on-chain data like blocks, extrinsics, and events.
- Indexer deals with specific Ternoa on-chain data based on our designed pallets. For example, all data related to NFTs and collections are neatly recorded in the Indexer.

Indexer uses Dictionary in its `project.yaml` configuration file to drastically improve the overall indexing performance and reduce synchronisation time.

## Articles

Below is a list of tech articles about Ternoa. If you have written a blog post or tutorial that mentions Ternoa, feel free to add it here!

> Any language is allowed

### Maintainer Articles

- [How to batch transactions with Ternoa SDK 🔗](https://dev.to/victorsalomon/how-to-batch-transactions-with-ternoa-sdk-1h64)
- [Data management for dApps built on Ternoa 🫧](https://dev.to/dontelmo/data-management-for-dapps-built-on-ternoa-114d)

### Community Articles

- [(FR) Découverte de l’indexer Ternoa](https://medium.com/@gege83var/d%C3%A9couverte-de-lindexer-ternoa-1929c1b2846)