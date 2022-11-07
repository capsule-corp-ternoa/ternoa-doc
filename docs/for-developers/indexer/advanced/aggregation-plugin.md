---
sidebar_position: 1
---

# Aggregation

Some aggregation plugins are available to count some data. You can use them in simple queries.

If you look at the indexer playground docs and schema on the right panel, you can see some aggregate fields. 
They allow to make some mathematical calculations for some specific datas. Let's keep the example to query some NFT filtered by a specific owner and calculate the total amount in CAPS for each listed NFT. 

```graphql showLineNumbers
query {
  nftEntities(
    filter: {
      owner: { equalTo: "5CDGXH8Q9DzD3TnATTG6qm6f4yR1kbECBGUmh2XbEBQ8Jfa5" }
    }
  ) {
    totalCount
    aggregates {
      sum {
        priceRounded
      }
    }
    nodes {
      nftId
      owner
      creator
      collectionId
      offchainData
      priceRounded
    }
  }
}
```

The expected outcome will be : 

```graphql showLineNumbers
...
aggregates: {
        sum: {
          priceRounded: 39900
        }
      },
...
```

> ![filterFields](./aggregate.png)




<!-- To see more details about the corresponding code you can check **[this link](https://github.com/capsule-corp-ternoa/subql/blob/dev-update/packages/query/src/graphql/plugins/PgAggregateTransfer.ts)**.
___ 

## Most sold

The mostSold query return a ranking of most sold NFTs:
```graphql showLineNumbers
{
  mostSold(first: 10, offset: 0) {
    nodes {
      id
    }
  }
}
```
___
## Most sold series

The mostSoldSeries query return a ranking of most sold series NFTs:
```graphql showLineNumbers
{
  mostSoldSeries(first: 10, offset: 0) {
    nodes {
      id
    }
  }
}
```
___
## Top sellers

The topSeller query return a ranking of addresses which sold the most NFTs:
```graphql showLineNumbers
{
  topSeller(first: 10, offset: 0) {
    nodes {
      id
    }
  }
}
``` -->