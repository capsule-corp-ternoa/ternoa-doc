---
sidebar_position: 2
---

# Paginated queries

In this section, you'll see how to paginate queries:

> You can try this directly in our **[alphanet indexer's playground](https://indexer-alphanet.ternoa.dev/)** or in our **[mainnet indexer's playground](https://indexer-mainnet.ternoa.network/)**

You can paginate all the request using regular “first” and “offset” parameter. Here is an example with the first basic query:

## Query paginated NFTs (first page)

```graphql showLineNumbers
query {
	nftEntities(
		filter: { listedForSale: { equalTo: true } }
		first: 10
		offset: 0
	) {
		totalCount
		nodes {
			nftId
			owner
			collectionId
			offchainData
		}
	}
}
```

This request fetches the first page with 10 items. For the next page you need to put an offset. For example in our case, qe addan offset of 10 in order to get the next 10 NFTs listed.

## Query paginated NFTs (second page)

```graphql showLineNumbers
query {
	nftEntities(
		filter: { listedForSale: { equalTo: true } }
		first: 10
		offset: 10
	) {
		totalCount
		nodes {
			nftId
			owner
			collectionId
			offchainData
		}
	}
}
```

## Query paginated NFTs (third page)

Again to get the third page, you need to **increase** offset. Here we increase by 10 (20 in total) in order to get the next 10 NFTs listed.

```graphql showLineNumbers
query {
	nftEntities(
		filter: { listedForSale: { equalTo: true } }
		first: 10
		offset: 20
	) {
		totalCount
		nodes {
			nftId
			owner
			collectionId
			offchainData
		}
	}
}
```
