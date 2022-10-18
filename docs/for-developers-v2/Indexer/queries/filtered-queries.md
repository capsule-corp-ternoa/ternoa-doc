---
sidebar_position: 4
---

# Filtered queries

In this section, you'll see how to filter queries:

> You can try this directly in our [indexer's playground](https://indexer.testnet.ternoa.com/)

You can use any of the graphql generated filters to filter your data depending on your requirements:

## Query NFTs filtered by listed field, owner and isCapsule field

```graphql
{
  nftEntities(
    filter: {
      and:[
      	    { listed: { equalTo: 1 } }
            { owner: {equalTo: "5CDGXH8Q9DzD3TnATTG6qm6f4yR1kbECBGUmh2XbEBQ8Jfa5"}}
            { isCapsule: {equalTo: false }}
    	]
    }
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

> You can access all the different filter in the schema tab on the right panel of the graphql playground.

> ![filterFields](./filter-fields.png)