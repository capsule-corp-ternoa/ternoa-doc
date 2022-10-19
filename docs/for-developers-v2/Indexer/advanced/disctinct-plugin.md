---
sidebar_position: 1
---


# Distinct NFTs

When we query NFTs from the db, we get all NFTs corresponding to our criteria. An issue can happen with filtering and pagination when NFTs have many copies (i.e., many NFTs belong to one series).

>Let’s take a simple example: 
>We have 3 series of 10 NFTs each. We want to display all NFTs paginated in our application. If we fetch the 10 first NFTs for the first page, we will get 10 > copies of the same NFTs and display the exact same component 10 times.

The solution is to get the NFTs distinct by their series. To do that, we developed a custom PostGraphile plugin (following this **[postgraphile documentation](https://www.graphile.org/postgraphile/make-extend-schema-plugin/)** that we append to our graphql query module.
It makes a new type available on the graphql playground: “distinctSerieNfts”
It works the same way as the nftEntities type that we used until here. The difference is that before applying any filters / sort / pagination, it will get the NFTs distinct by their series.

This introduces a new concept pre-distinct filter / sorting. We customized our plugin so that it accepts pre-distinct criteria. We need this feature because the distinct can occult some of the data we actually need. 

> We can take a simple example with 10 NFTs in the same series. 5 of these NFTs are not listed, the 5 others are listed for sale. When we use the distinctSerieNfts we will first distinct by series, we’ll have the first of the 10 NFTs, which is not listed. We will then apply a filter, “get listed NFT”, and this one won’t be fetched event if 5 of the 10 copies are listed. 

___
### Resolve it 
To resolve that we can use the pre-distinct criteria instead of using the regular graphql filter. We have at our disposal:
-	Listed
-	Owner
-	MarketplaceId
-	IsCapsule
-	PriceStartRange
-	PriceEndRange
-	TimestampCreateStartRange
-	TimestampCreateEndRange
-	Viewer
-	PriceSortOrder
-	TimestampCreateSortOrder
-	ListedSortOrder
-	IsCapsuleSortOrder

To see more details about the corresponding code you can check **[this link](https://github.com/capsule-corp-ternoa/subql/blob/dev-update/packages/query/src/graphql/plugins/PgDistinct.ts)**

___

### Here is an example of a request with all those fields: 
```graphql showLineNumbers
{
  distinctSerieNfts(
    marketplaceId: "0"
    listed: 1
    isCapsule: false
    owner: "5CDGXH8Q9DzD3TnATTG6qm6f4yR1kbECBGUmh2XbEBQ8Jfa5"
    viewer: "5CDGXH8Q9DzD3TnATTG6qm6f4yR1kbECBGUmh2XbEBQ8Jfa5"
    priceStartRange: 456
    priceEndRange: 789
    timestampCreateStartRange: "2022-02-04T00:00:00.000Z"
    timestampCreateEndRange: "2022-02-17T00:00:00.000Z"
    priceSortOrder: "desc"
    timestampCreateSortOrder: "desc"
  ) {
    totalCount
    pageInfo { hasNextPage hasPreviousPage }
    nodes {
      id
      # ...
    }
  }
}
```
