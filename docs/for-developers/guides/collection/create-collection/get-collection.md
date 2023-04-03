---
sidebar_position: 3
sidebar_label: How to retrieve a Collection
---

# How to retrieve a Collection using Ternoa Indexer

Ternoa indexer is **a record of the Ternoa Chain data.**
You can query data for some specific entities (NFT, Collection, Marketplace(...)) using GraphQL.
_In this example, we use the graphql-request library._

## Step 1: CollectionEntity query preparation

You first need to prepare a stringified query to get Collection data from a specific collection id.
Here are detailed the parameters available for the `CollectionEntity`:

```markdown
`collectionId`: The collection id.- String
`owner`: The collection owner; null if the collection is burned. - String | null
`offchainData`: The collection off-chain data (e.g. IPFS CID hash, a link, or any string). - String
`nfts`: An array of the NFT ids in the collection - String[]
`nbNfts`: The number of NFT in the collection. - Number
`limit`: The collection limit if set; null otherwise. - Number | null
`hasReachedLimit`: true if the Collection has reached its limit; false otherwise. - Boolean
`isClosed`: - Boolean flag: true if the Collection is closed; false otherwise. - Boolean
`timestampCreated`: The creation timestamp. - Date
`timestampBurned`: The burning timestamp. - Date | null
`timestampClosed`: The closing timestamp.- Date | null
`timestampLimited`: The limit setting timestamp. - Date | null
```

For example, if we want to get the Collection: owner / id; we have to prepare the following query by replacing _COLLECTION_ID_ with the collection id you want to get the information from (e.g. the collection id from the Collection minted previously in ["How to mint a Collection on-chain"](/for-developers/guides/collection/create-collection/mint-collection)):

```typescript
{
  collectionEntity(id: "_COLLECTION_ID_") {
    owner
    collectionId
    offchainData
  }
}
```

## Step 2: Sending the request to the Indexer

Once the query is ready, you can request our Indexer instances by providing both the indexer endpoint and the query.

Replace _COLLECTION_ID_ in the following code snippet with the collection ID previously generated in ["How to mint a Collection on-chain"](/for-developers/guides/collection/create-collection/mint-collection)):

```typescript showLineNumbers
import { request, gql } from "graphql-request";

const COLLECTION_ID = 0;
const query = (id: number) => gql`
    {
      collectionEntity(id: "${id}") {
        owner
        collectionId
        offchainData
      }
    }
`;

const getCollectionData = async () => {
	try {
		const response = await request<{ collectionEntity: CollectionType }>(
			"https://indexer-alphanet.ternoa.dev",
			query(COLLECTION_ID)
		);
		console.log(response);
	} catch (error) {
		console.error(error);
	}
};

type CollectionType = {
	owner: string;
	offchainData: string;
	collectionId: string;
};
```

The `getCollectionData` function is an asynchronous function that sends a GraphQL request using the `request` function from the **"graphql-request"** library. Here we are using the Ternoa Alphanet instance at **"https://indexer-alphanet.ternoa.dev"** with the Collection ID 0 as the query parameter (you can try with your id). The response from the server is an object with a property collectionEntity that has the data of the requested Collection entity.

The response for the collection id 0 the Alphanet Network is:

```json
{
	"data": {
		"collectionEntity": {
			"owner": "5DoaPm79MrWUQpFSDBhpmotRp344dc9eM4NV8aRb3vHEuzxH",
			"collectionId": "0",
			"offchainData": "test"
		}
	}
}
```

## How to retrieve the last Collection minted using Ternoa Indexer

Ternoa Indexer comes with filtering and ordering options. Instead of requesting a single `CollectionEntity` with a specific collection ID, you can filter all `CollectionEnties`:

```typescript
{
  collectionEntities(orderBy: [TIMESTAMP_CREATE_DESC]) {
    nodes {
      owner
      collectionId
      timestampCreate
    }
  }
}
```

The NFT in the response will be ordered by creation timestamp descendent with `orderBy: [TIMESTAMP_CREATE_DESC]`.

The response on the Alphanet Network when this document is written is:

```json
{
  "data": {
    "collectionEntities": {
      "nodes": [
        {
          "owner": "5DZimWjGDoeEtaUJo5DaFZQdHWGBd3wHjZokDqZjCzYFEuYb",
          "collectionId": "585",
          "timestampCreate": "2023-02-22T12:17:00.001"
        },
        {
          "owner": "5DZimWjGDoeEtaUJo5DaFZQdHWGBd3wHjZokDqZjCzYFEuYb",
          "collectionId": "584",
          "timestampCreate": "2023-02-22T12:16:48.001"
        },
        ...
      ]
    }
  }
}
```

The last Collection minted on the Ternoa chain is collection 585.

## Support

If you face any trouble, feel free to reach out to our community engineers in our [Discord](https://discord.gg/fUmBkPpnRu).
