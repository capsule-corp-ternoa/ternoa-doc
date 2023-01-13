---
sidebar_position: 1
---

# Basic queries

In this section, you'll make some simple and basic queries:

> You can try this directly in our **[alphanet indexer's playground](https://indexer-alphanet.ternoa.dev/)** or in our **[mainnet indexer's playground](https://indexer-mainnet.ternoa.network/)**

## Query owned NFTs on the nftEntities

```graphql showLineNumbers
query {
  nftEntities(
    first: 5,
    filter: {
      owner: { equalTo: "5CDGXH8Q9DzD3TnATTG6qm6f4yR1kbECBGUmh2XbEBQ8Jfa5" }
    }
  ) {
    totalCount
     nodes {
      nftId
      owner
      creator
      collectionId
      offchainData
    }
  }
}
```

To access the nodes information you want to display, you can look directly into the docs panel on the right side of the playground : 
> ![sortFields](./nodes-path.png)

## Query created NFTs on the nftEntities
```graphql showLineNumbers
query {
  nftEntities(
    first: 5,
    filter: {
      creator: { equalTo: "5CDGXH8Q9DzD3TnATTG6qm6f4yR1kbECBGUmh2XbEBQ8Jfa5" }
    }
  ) {
    totalCount
     nodes {
      nftId
      owner
      creator
      collectionId
      offchainData
    }
  }
}
```
<!-- 
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
``` -->
## Let's query the 10 first listed NFTs on the nftEntities

```graphql showLineNumbers
query {
  nftEntities(first: 10, filter: { listedForSale: { equalTo: true } }) {
    totalCount
    nodes {
      nftId
      listedForSale
      owner
      timestampList
      price
      marketplaceId
    }
  }
}
```
## Query marketplaces on the marketplaceEntities
```graphql showLineNumbers
query {
  marketplaceEntities{
    totalCount
    nodes {
      marketplaceId
      offchainData
      kind
      owner
      commissionFeeType
      commissionFee
      commissionFeeRounded
      listingFeeType
      listingFee
      listingFeeRounded
    }
  }
}
```

## Query a specific NFT on the nftEntity
```graphql showLineNumbers
query {
  nftEntity(id: "100") {
    nftId
    owner
    creator
    collectionId
    offchainData
  }
}
```

## Query specific NFT history on the nftOperationEntities
```graphql showLineNumbers
query {
  nftOperationEntities(
    orderBy: TIMESTAMP_DESC
    filter: { nftId: { equalTo: "100" } }
  ) {
    totalCount
    nodes {
      nftId
      blockId
      extrinsicId
      typeOfTransaction
      from
      to
      price
      priceRounded
      timestamp
    }
  }
}
```