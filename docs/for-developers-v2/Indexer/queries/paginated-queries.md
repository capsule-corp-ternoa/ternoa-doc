---
sidebar_position: 2
---

# Paginated queries

In this section, you'll see how to paginate queries:

> You can try this directly in our [indexer's playground](https://indexer.testnet.ternoa.com/)

You can paginate all the request using regular “first” and “offset” parameter. Here is an example with the first simple query:

## Query paginated NFTs (first page)

```graphql
{
  nftEntities(
    filter: { listed: { equalTo: 1 } }
    first: 10
    offset: 0
  ) {
    totalCount
    nodes {
      id
      serieId
      listed
      isCapsule
      timestampList
      price
      marketplaceId
      nftIpfs
    }
  }
}
```

This request fetches the first page with 10 items. For the next page you need to put an offset of 10.

## Query paginated NFTs (second page)

```graphql
{
  nftEntities(
    filter: { listed: { equalTo: 1 } }
    first: 10
    offset: 10
  ) {
    totalCount
    nodes {
      id
      serieId
      listed
      isCapsule
      timestampList
      price
      marketplaceId
      nftIpfs
    }
  }
}
```
