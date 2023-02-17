---
sidebar_position: 3
---

# Ordered queries

In this section, you'll see how to order queries:

> You can try this directly in our **[alphanet indexer's playground](https://indexer-alphanet.ternoa.dev/)** or in our **[mainnet indexer's playground](https://indexer-mainnet.ternoa.network/)**

Each field generate a sort option that you can apply on any request. For example:

## Query NFTs ordered by creation timestamp

```graphql showLineNumbers
query {
  nftEntities(
    first: 10
    offset: 0
    orderBy: TIMESTAMP_CREATE_DESC
  ) {
    totalCount
    nodes {
      nftId
      owner
      collectionId
      offchainData
      timestampCreate
    }
  }
}
```

You can put as many sort fields as you need:

## Query NFTs ordered by creation timestamp and price

```graphql showLineNumbers
query {
  nftEntities(
    first: 10
    offset: 0
    orderBy: [TIMESTAMP_CREATE_DESC, PRICE_ASC]
  ) {
    totalCount
    nodes {
      nftId
      owner
			price
      priceRounded
      timestampCreate
    }
  }
}
```

> You can access all the different orders in the schema tab on the right panel of both **[alphanet playground](https://indexer-alphanet.ternoa.dev/)** or **[mainnet playground](https://indexer-mainnet.ternoa.network/)**

> ![sortFields](./sort-playground.png)