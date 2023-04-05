---
sidebar_position: 4
sidebar_label: How to retrieve a bid
---

# How to retrieve the auction bids using Ternoa Indexer

Ternoa indexer is **a record of the Ternoa Chain data.**
You can query data for some specific entities (NFT, Collection, Auction, Marketplace(...)) using graphql.
_In this example, we use the graphql-request library._

## Step 1: AuctionEntity query preparation

You first need to prepare a stringified query to get NFT data from a specific marketplace id. Here are detailed the parameters available for the `AuctionEntity` concerning the NFT auction on a marketplace:

```markdown
`nftId`: The NFT id to be auctioned - String
`marketplaceId`: The Marketplace id list the NFT on - String
`creator`: The auction creator address - String
`startPrice`: The auction initial price in Big Number format - String
`startPriceRounded`: The auction initial price in a basic number format - Float
`buyItNowPrice`: The auction direct buying price in Big Number format - String
`buyItNowPriceRounded`: The auction direct buying price in a basic number format - Float
`startBlockId`: The auction starting block id - Number
`endBlockId`: The auction ending block id - Number
`isCompleted`: Boolean flag: true if the auction is completed, false otherwise - Boolean
`isCancelled`: Boolean flag: true if the auction has been canceled, false otherwise - Boolean
`isExtendedPeriod`: Boolean flag: true if the auction is in the extending period, false otherwise - Boolean
`bidders`: The bidders' list of addresses - [Bidder]
`nbBidders`: The current number of bidders - Number
`topBidAmount`: The auction best offer received in Big Number format - String
`topBidAmountRounded`: The auction best offer received in a basic number format - Float
`typeOfSale`: The type of listing: auction or sale - String
`timestampCreated`: The auction creation timestamp. Date
`timestampEnded`: The auction end timestamp. Date
`timestampLastBid`: The last bid received timestamp. Date
`timestampCancelled`: The auction cancellation timestamp. Date
```

:::info
Because an NFT can be auctioned several times, you will find each auction as the result of your request. To access the running auction, add the filters "isCompleted" and "isCancelled" both equal to false. If no auction is running you can order them by timestampCreate for example.
:::

Do not hesitate to adapt the information you require in your query. Replace NFT_ID with the NFT id you want to get the information from (e.g. the NFT id from the NFT previously used in ["How to add or remove a bid on an auction"](/for-developers/guides/marketplace/auction/bid)):

```typescript
{
      nftEntity(id: "${id}") {
        nftId
        marketplaceId
        startPriceRounded
        topBidAmountRounded
        timestampLastBid
      }
    }
```

## Step 2: Sending the request to the Indexer

Once the query is ready, you can request our indexer by providing both the indexer endpoint and the query.

Replace NFT_ID in the following code snippet with the NFT ID previously used in ["How to add or remove a bid on an auction"](/for-developers/guides/marketplace/auction/bid):

```typescript showLineNumbers
import { request, gql } from "graphql-request";

const NFT_ID = 0;
const query = (id: number) => gql`
    {
     auctionEntities(
         filter: {
            and: [
                nftId: { equalTo: "${id}" }
                isCompleted: { equalTo: false }
                isCancelled: { equalTo: false }
            ]
        }
        #orderBy:TIMESTAMP_CREATE_DESC
        ) {
        totalCount
        nodes {
            nftId
            marketplaceId
            startPriceRounded
            topBidAmountRounded
            timestampLastBid
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
	startPriceRounded: number;
	topBidAmountRounded: number;
	timestampLastBid: Date;
};
```

The `getAuctionData` function is an asynchronous function that sends a GraphQL request using the `request` function from the **"graphql-request"** library. The response from the server is an object with a property auctionEntities that has the data of the auctioned NFT.

## Support

If you face any trouble, feel free to reach out to our community engineers in our [Discord](https://discord.gg/fUmBkPpnRu).
