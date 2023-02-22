---
sidebar_position: 3
sidebar_label: How to retrieve a listed for sale NFT
---

# How to retrieve a listed for sale NFT using Ternoa Indexer

Ternoa indexer is **a record of the Ternoa Chain data.**
You can query data for some specific entities (NFT, Collection, Marketplace(...)) using graphql.
_In this exemple, we use the graphql-request library._

You first need to prepare a stringified query to get NFT data from a specific marketplace id, as we did in the query(id) function.
Do not hesitate to adapt the information you require in your query. You can check all the fields queryable for the [NftEntity](/for-developers/guides/NFT/basic-NFT/get-NFT#step-1-nftentity-query-preparation).

When the query is ready, you can make the request to our indexer by providing both the indexer endpoint and the query. To check if the NFT is listed for sale, the **marketplaceId** field should not be null, **isListed** should be true and a **timestampList** should be filled.

```typescript showLineNumbers
import { request, gql } from "graphql-request";

const NFT_ID = 0;
const query = (id: number) => gql`
    {
      nftEntity(id: "${id}") {
        nftId
		owner
		marketplaceId
		isListed
		timestampList
		typeOfListing
		price
		priceRounded
      }
    }
`;

const getNftData = async () => {
	try {
		const response = await request<{ nftEntity: NFTType }>(
			"https://indexer-alphanet.ternoa.dev",
			query(NFT_ID)
		);
		console.log(response);
	} catch (error) {
		console.error(error);
	}
};

type NFTType = {
    nftId: string;
	owner: string;
	marketplaceId: string | null;
	isListed: boolean;
	typeOfListing: string | null;
	price: string | null;
	priceRounded; number | null;
	timestampList: Date | null;
};
```

## Support

If you face any trouble, feel free to reach out to our community engineers in our [Discord](https://discord.gg/fUmBkPpnRu).
