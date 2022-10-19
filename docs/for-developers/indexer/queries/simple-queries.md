---
sidebar_position: 1
---

# Simple queries

In this section, you'll simple queries:

> You can try this directly in our **[indexer's playground](https://indexer.testnet.ternoa.com/)**.

## Query listed NFTs

```graphql showLineNumbers
{
  nftEntities(filter: { listed: { equalTo: 1 } }) {
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

## Query owned NFTs
```graphql showLineNumbers
{
  nftEntities(
    filter: {
      owner: { equalTo: "5CDGXH8Q9DzD3TnATTG6qm6f4yR1kbECBGUmh2XbEBQ8Jfa5" }
    }
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

## Query created NFTs
```graphql showLineNumbers
{
  nftEntities(
    filter: {
      creator: { equalTo: "5CDGXH8Q9DzD3TnATTG6qm6f4yR1kbECBGUmh2XbEBQ8Jfa5" }
    }
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

## Query capsules
```graphql showLineNumbers
{
  nftEntities(
    filter: {
      isCapsule: { equalTo: true }
    }
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

## Query marketplaces
```graphql showLineNumbers
{
  marketplaceEntities{
    totalCount
    nodes {
      id
      kind
      name
      owner
      uri
      logoUri
      commissionFee
    }
  }
}
```

## Query specific NFT
```graphql showLineNumbers
{
  nftEntity(id: "100") {
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
```

## Query specific NFT history
```graphql showLineNumbers
{
  nftTransferEntities(
    orderBy: TIMESTAMP_DESC
    filter: { nftId: { equalTo: "1" } }
  ) {
    totalCount
    nodes {
      id
      blockId
      extrinsicId
      typeOfTransaction
      nftId
      seriesId
      from
      to
      amount
      timestamp
    }
  }
}
```