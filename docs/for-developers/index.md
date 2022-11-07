---
sidebar_position: 4
sidebar_label: For Developers
---

# For Developers

## Overview

Let's learn about the most important tools to build on top of Ternoa chain!

```mdx-code-block
import DocCardList from '@theme/DocCardList';

<DocCardList />
```

We will assume that you have read the Ternoa [Builder Tools](/category/builder-tools) section. You are now familiar with the basic differences and aims about both tools. The following [FAQ](#faq) answers common questions about which tool to use. The two sections above will provide you with all you need to know to install and use [Ternoa-JS SDK](/category/ternoa-js-sdk), [Indexer](/category/indexer) and Dictionary.

## FAQ

### When should I use Ternoa-JS getters or Indexer queries to get on-chain data?

Ternoa-JS SDK facilitates interaction with Ternoa chain, it offers the possibility of retrieving stored on-chain data and chain constants. However, it is still preferable to use the Indexer for data fetching for several reasons.

First of all, you will be able to query specific data by combining Indexer's filters and sorting options.

Then even if you want to retrieve data from a particular NFT for example, it is still best to use the Indexer to avoid overloading the chain.

### What are the differences between the Dictionary or the Indexer?

Both tools scan through each block and their events to see what happened on the Ternoa chain: they listen, parse and record data into a database. The main two differences are:

- Dictionary deals with native substrate on-chain data like blocks, extrinsics and events.
- Indexer deals with specific Ternoa on-chain data based on our designed pallets. For example, all data related to NFTs and collections are neatly recored in the Indexer.

Indexer uses Dictionary in its `project.yaml` configuration file to drastically improving the overall indexing performance and reduce synchronisation time.
