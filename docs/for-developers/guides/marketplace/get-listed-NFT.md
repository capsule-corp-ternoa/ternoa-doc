---
sidebar_position: 3
sidebar_label: How to retrieve a listed for sale NFT
---

# How to retrieve a listed for-sale NFT using Ternoa Indexer

Ternoa indexer is **a record of the Ternoa Chain data.**
You can query data for some specific entities (NFT, Collection, Marketplace(...)) using graphql.
_In this example, we use the graphql-request library._

## Step 1: nftEntity query preparation

You first need to prepare a stringified query to get NFT data from a specific marketplace id. Here are detailed the parameters available for the `nftEntity` concerning the NFT listing on a marketplace:

```markdown
`isListed`: Boolean flag: true if the NFT is listed on a Marketplace, false otherwise - Boolean
`typeOfListing`: The type of listing: auction or sale - String
`marketplaceId`: The marketplace id where the NFT has been listed - String
`price`: The listing price in Big Number format - String
`priceRounded`: The listing price in a basic number format - Float
`timestampListed`: The listing timestamp. Date
```

Do not hesitate to adapt the information you require in your query. You can check all the fields queryable for the [NftEntity](/for-developers/guides/NFT/basic-NFT/get-NFT#step-1-nftentity-query-preparation). Replace NFT_ID with the NFT id you want to get the information from (e.g. the NFT id from the NFT previously used in ["How to list for sale an NFT on a marketplace"](/for-developers/guides/marketplace/sale-NFT)):

```typescript
{
      nftEntity(id: "${id}") {
        nftId
        owner
        isListed
        typeOfListing
        marketplaceId
        price
        priceRounded
        timestampListed
      }
    }
```

## Step 2: Sending the request to the Indexer

Once the query is ready, you can request our indexer by providing both the indexer endpoint and the query. To check if the NFT is listed for sale, the **marketplaceId** field should not be null, **isListed** should be true and a **timestampList** should be filled.

Replace NFT_ID in the following code snippet with the NFT ID previously used in ["How to list for sale an NFT on a marketplace"](/for-developers/guides/marketplace/sale-NFT):

```typescript showLineNumbers
import { request, gql } from "graphql-request";

const NFT_ID = 0;
const query = (id: number) => gql`
    {
      nftEntity(id: "${id}") {
        nftId
        owner
        isListed
        typeOfListing
        marketplaceId
        price
        priceRounded
        timestampListed
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
    nftId: string
    owner: string
    isListed: boolean
    typeOfListing: string | null;
    marketplaceId: string | null;
    price: string | null;
    priceRounded; number | null;
    timestampList: Date | null;
};
```

The `getNftData` function is an asynchronous function that sends a GraphQL request using the `request` function from the **"graphql-request"** library. The response from the server is an object with a property nftEntity that has the data of the listed NFT.

## Support

If you face any trouble, feel free to reach out to our community engineers in our [Discord](https://discord.gg/fUmBkPpnRu).
