---
sidebar_position: 2
---

# Aggregation

Some aggregations plugins are available to count some data. You can use them in simple queries.

To see more details about the corresponding code you can check [this link](https://github.com/capsule-corp-ternoa/subql/blob/dev-update/packages/query/src/graphql/plugins/PgAggregateTransfer.ts)

## Most sold

The mostSold query return a ranking of most sold NFTs:
```graphql
{
  mostSold(first: 10, offset: 0) {
    nodes {
      id
    }
  }
}
```

## Most sold series

The mostSoldSeries query return a ranking of most sold series NFTs:
```graphql
{
  mostSoldSeries(first: 10, offset: 0) {
    nodes {
      id
    }
  }
}
```

## Top sellers

The topSeller query return a ranking of addresses which sold the most NFTs:
```graphql
{
  topSeller(first: 10, offset: 0) {
    nodes {
      id
    }
  }
}
```