---
sidebar_position: 2
sidebar_label: How to retrieve a Secret NFT
---

# How to retrieve a Secret NFT using Ternoa Indexer

Ternoa indexer is **a record of the Ternoa Chain data.**
You can query data for some specific entities (NFT, Collection, Marketplace(...)) using GraphQL.
_In this example, we use the graphql-request library._

## Step 1: NftEntity query preparation

You first need to prepare a stringified query to get NFT data from a specific NFT id.
Here are detailed the parameters available for the `NftEntity`:

```markdown
`nftId`: The NFT id. - String
`auction`: The auction data if the NFT is auctioned; null otherwise. - AuctionEntity | null
`collection`: The collection data if the NFT is in a collection; null otherwise. - CollectionEntity | null
`owner`: The NFT owner; null if the NFT is burned. - String | null
`creator`: The NFT creator. - String
`delegatee`: The delegatee address if the NFT is delegated; null otherwise. - String | null
`royalty`: - The NFT royalty. - Number
`offchainData`: The NFT off-chain data (e.g. IPFS CID hash, a link, or any string). - String!
`secretOffchainData`: The Secret NFT off-chain data (e.g. IPFS CID hash, a link, or any string) if the NFT is a Secret NFT; null otherwise. - String | null
`capsuleOffchainData`: The Capsule NFT off-chain data (e.g. IPFS CID hash, a link, or any string) if the NFT is a Capsule NFT; null otherwise. - String | null
`isCapsule`: Boolean flag: true if the NFT is a Capsule NFT; false otherwise. - Boolean
`isCapsuleSynced`: Boolean flag: true if the NFT is a synced Capsule NFT; false otherwise. - Boolean
`isSecret`: Boolean flag: true if the NFT is a Secret NFT; false otherwise. - Boolean
`isSecretSynced`: Boolean flag: true if the NFT is a synced Secret NFT; false otherwise. - Boolean
`isDelegated`: Boolean flag: true if the NFT is delegated; false otherwise. - Boolean
`isTransmission`: Boolean flag: true if a transmission protocol is set for the NFT; false otherwise. - Boolean
`isSoulbound`: Boolean flag: true if the NFT is a Soulbound NFT; false otherwise. - Boolean
`isListed`: Boolean flag: true if a transmission protocol is set for the NFT; false otherwise. - Boolean
`isRented`: Boolean flag: true if a transmission protocol is set for the NFT; false otherwise. - Boolean
`rentee`: The rentee address if the NFT is rented; null otherwise. - String | null
`rentalContract`: The rental contract data if the NFT is rented; null otherwise. - RentEntity | null
`price`: The sale listing price in BN value if the NFT is listed for a direct sale; null otherwise. - String | null
`priceRounded`: The sale listing price if the NFT is listed for a direct sale; null otherwise. - Number | null
`marketplace`: The marketplace data if the NFT is listed; null otherwise. - MarketplaceEntity
`typeOfListing`: The NFT listing type if the NFT is listed (sale or auction); null otherwise. - String | null
`transmissionRecipient`: The recipient address to whom the NFT will be transmitted if a transmission protocol is defined for the NFT; null otherwise. - String | null
`transmissionProtocol`: - The transmission protocol data if a transmission protocol is defined for the NFT; null otherwise. TransmissionEntity | null
`timestampCreated`: - The creation timestamp. Date
`timestampBurned`: - The burning timestamp. Date | null
`timestampListed`: - The last listing timestamp. Date | null
`timestampRented`: - The last renting timestamp. Date | null
`timestampSecretAdded`: The last secret addition timestamp. - Date | null
`timestampConvertedToCapsule`: The last capsule conversion timestamp. - Date | null
```

For example, if we want to get the Secret NFT: owner / id / off-chain data / secret off-chain data / isSecret state / collection id / royalty; we have to prepare the following query by replacing _NFT_ID_ with the Secret NFT id you want to get the information from (e.g. the NFT id from the Secret NFT minted previously in ["How to mint a Secret NFT on-chain"](/for-developers/guides/NFT/secret-NFT/mint-secret-NFT)):

```typescript
{
  nftEntity(id: "NFT_ID") {
    owner
    nftId
    offchainData
    secretOffchainData
    isSecret
    collectionId
    royalty
  }
}
```

## Step 2: Sending the request to the Indexer

Once the query is ready, you can request our Indexer instances by providing both the indexer endpoint and the query.

Replace _NFT_ID_ in the following code snippet with the Secret NFT ID previously generated in ["How to mint a Secret NFT on-chain"](/for-developers/guides/NFT/secret-NFT/mint-secret-NFT):

```typescript showLineNumbers
import { request, gql } from "graphql-request";

const NFT_ID = 74260; // Use your Secret NFT id here
const query = (id: number) => gql`
    {
      nftEntity(id: "${id}") {
        owner
        nftId
        offchainData
        secretOffchainData
        isSecret
        isSecretSynced
        collectionId
        royalty
      }
    }
`;

const getNftData = async () => {
  try {
    const response = await request<{ nftEntity: NftType }>(
      "https://indexer-alphanet.ternoa.dev",
      query(NFT_ID)
    );
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

type NftType = {
  owner: string;
  nftId: string;
  offchainData: string;
  secretOffchainData: string;
  isSecret: boolean;
  collectionId: string;
  royalty: number;
};
```

The `getNftData` function is an asynchronous function that sends a GraphQL request using the `request` function from the **"graphql-request"** library. Here we are using the Ternoa Alphanet instance at **"https://indexer-alphanet.ternoa.dev"** with the NFT ID 0 as the query parameter (you can try with your id). The response from the server is an object with a property nftEntity that has the data of the requested NFT entity.

The response for the NFT id 74,260 the Alphanet Network is:

```json
{
  "data": {
    "nftEntity": {
      "owner": "5Cf8PBw7QiRFNPBTnUoks9Hvkzn8av1qfcgMtSppJvjYcxp6",
      "nftId": "74260",
      "offchainData": "public",
      "secretOffchainData": "secret",
      "isSecret": true,
      "isSecretSynced": false,
      "collectionId": null,
      "royalty": 0.001
    }
  }
}
```

## How to retrieve the last NFT minted using Ternoa Indexer

Ternoa Indexer comes with filtering and ordering options. Instead of requesting a single `NftEntity` with a specific NFT ID, you can filter all `NftEnties`:

```typescript
{
  nftEntities(orderBy: [TIMESTAMP_CREATED_DESC]) {
    nodes {
      owner
      nftId
      timestampCreated
    }
  }
}
```

The NFT in the response will be ordered by creation timestamp descendent with `orderBy: [TIMESTAMP_CREATED_DESC]`.

The response on the Alphanet Network when this document is written is:

```json
{
  "data": {
    "nftEntities": {
      "nodes": [
        {
          "owner": "5EU1EDxRBpoq48HXLvLfVyGJfrz5p3hGkQC46XJFTHS1mohb",
          "nftId": "74260",
          "timestampCreated": "2023-03-27T08:43:18.002"
        },
        ...
      ]
    }
  }
}
```

The last NFT minted on the Ternoa chain is the NFT 74,260.

## Support

If you face any trouble, feel free to reach out to our community engineers in our [Discord](https://discord.gg/fUmBkPpnRu).
