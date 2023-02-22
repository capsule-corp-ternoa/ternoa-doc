---
sidebar_position: 2
sidebar_label: How to retrieve an auctioned NFT
---

# How to retrieve an auctioned NFT using Ternoa Indexer

Ternoa indexer is **a record of the Ternoa Chain data.**
You can query data for some specific entities (NFT, Collection, Auction, Marketplace(...)) using graphql.
_In this exemple, we use the graphql-request library._

You first need to prepare a stringified query to get NFT and auction data from a specific marketplace id, as we did in the query(id) function.
Do not hesitate to adapt the information you require in your query. When the query is ready, you can make the request to our indexer by providing both the indexer endpoint and the query. To check if the NFT is listed for auction, you must be capable to access the auction information in the auctionEntites.

:::info
Because an NFT can be auctioned several times, you will find each auction in the result of your request. To access the running auction, add the filters "isCompleted" and "isCancelled" both equal to false. If no auction is running you can order them by timestampCreate for example.
:::

```typescript showLineNumbers
import { request, gql } from "graphql-request";

const NFT_ID = 0;
const query = (id: number) => gql`
    {
     auctionEntities(
        filter: {
            nftId: { equalTo: "${id}" }
            #isCompleted: { equalTo: false }
            #isCancelled: { equalTo: false }
        }
        #orderBy:TIMESTAMP_CREATE_DESC
        ) {
        totalCount
        nodes {
            nftId
            isCompleted
            isCancelled
            marketplaceId
            typeOfSale
            startPriceRounded
            timestampCreate
            }
        }
    }
`;

const getAuctionData = async () => {
	try {
		const response = await request<{ auctionEntities: AuctionType }>(
			"https://indexer-alphanet.ternoa.dev",
			query(NFT_ID)
		);
		console.log(response);
	} catch (error) {
		console.error(error);
	}
};

type AuctionType = {
	nftId: string;
	marketplaceId: string;
	isCompleted: boolean;
	isCancelled: boolean;
	typeOfSale: string;
	startPriceRounded: number;
	timestampCreate: Date;
};
```

:::info
You can also look if an NFT is auctioned in the nftEntity where the 'typeOfListing' should be set to "auction".
:::

## Support

If you face any trouble, feel free to reach out to our community engineers in our [Discord](https://discord.gg/fUmBkPpnRu).
