---
sidebar_position: 4
---

# Filtered queries

In this section, you'll see how to filter queries:

> You can try this directly in our **[alphanet indexer's playground](https://indexer-alphanet.ternoa.dev/)** or in our **[mainnet indexer's playground](https://indexer-mainnet.ternoa.network/)**

You can use any of the graphql generated filters to filter your data depending on your requirements:

## Query NFTs filtered by Owner and by price field.
(PriceRounded = to CAPS amount)

```graphql showLineNumbers
query {
  nftEntities(
    filter: {
      and: [
        { priceRounded: { greaterThanOrEqualTo: 1000 } }
        {
          owner: { equalTo: "5E4FWi7Vo8mFvSB1xNz3pMXodR3WDJ3TASgkeP8jDuB3dG1Y" }
        }
      ]
    }
    first: 10
    offset: 0
  ) {
    totalCount
    nodes {
      nftId
      owner
      timestampList
      priceRounded
      marketplaceId
    }
  }
}

```

> You can access all the different filter in the schema tab on the right panel of the graphql playground.

> ![filterFields](./filters-playground.png)