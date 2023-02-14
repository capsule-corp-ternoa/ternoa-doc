---
sidebar_position: 8
sidebar_label: Manage your Collections
---

# Manage your Collections

Ternoa provides you with many NFT Collection features. Not only creating a collection of NFT can be done in just a few lines of code but we also cover many NFT collection basic usecases: Ternoa allows you to easily create functions to limit, burn or even close a collection of NFT without using any smart contracts.

If you did not looked yet at the needed prerequisites before starting to code (a ternoa account, claimed some test caps, and installed the ternoa-js api with `npm install ternoa-js`), please look at the [Get Started]("") section. We also strongly recommand you to look at the good practice [section]("") to learn more about main concept you will see in the code below (**API initialization, Keyring** (...))
## How to close a collection of NFT on-chain? 
### Code Snippet
This function closes a collection of NFT on the Ternoa chain. It returns an object promise containing the CollectionClosedEvent provided by the Ternoa blockchain.
Use your own account by updating the //TernoaTestAccount with your account seed when retrieving the keyring from the example below. **Replace the COLLECTION_ID** with the one to close.

```typescript showLineNumbers
import { closeCollection, initializeApi, getKeyringFromSeed, WaitUntil} from "ternoa-js";

const closeCollection = async () => {
	try {
		await initializeApi();
		const keyring = await getKeyringFromSeed("//TernoaTestAccount");
        const COLLECTION_ID = 1 // the collection id you want to close
		const collectionData = await closeCollection(COLLECTION_ID, keyring, WaitUntil.BlockInclusion);
		console.log(`Collection ${collectionData.collectionId} closed`, );
	} catch (e) {
		console.error(e);
	}
};
```
### The expected params
```typescript
`id`: The ID of the Collection.
`keyring`:  the provided keyring (containing the address) will be used to sign the transaction and pay the execution fee.
`waitUntil`: WaitUntil define at which point we want to get the results of the transaction execution: BlockInclusion or BlockFinalization.
```
### Response
The response provided from the blockchain event includes all the informations below according to the params provided when closing a collection of NFT.

```typescript
`collectionId`: ID of the closed collection.
```
## How to retrieve a closed collection using our Indexer? 

Ternoa indexer is **a record of the Ternoa Chain data.**
You can query data for some specific entities (NFT, Collection, Marketplace(...)) using graphql.
*In this exemple, we use the graphql-request library.*

You first need to prepare a stringified query to get collection data from a specific collection id, as we did in the query(id) function. 
Do not hesitate to adapt the information you require in your query. When the query is ready, you can make the request to our indexer by providing both the indexer endpoint and the query. To check if the collection is closed, just add the `**isClosed**` and `**timestampClose**`fields in the list.

```typescript showLineNumbers
import { request, gql } from "graphql-request";

const COLLECTION_ID = 0;
const query = (id: number) => gql`
    {
      collectionEntity(id: "${id}") {
        collectionId
        nbNfts
        isClosed
        timestampClose
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
	collectionId: string;
    nbNfts: number;
    isClosed: boolean;
    timestampClose: string | null;
};
```
## How to burn a collection of NFT on-chain? 
### Code Snippet
This function burns a collection of NFT on the Ternoa chain. It returns an object promise containing the CollectionBurnedEvent provided by the Ternoa blockchain.
Use your own account by updating the //TernoaTestAccount with your account seed when retrieving the keyring from the example below. **Replace the COLLECTION_ID** with the one to burn.

```typescript showLineNumbers
import { burnCollection, initializeApi, getKeyringFromSeed, WaitUntil} from "ternoa-js";

const burnCollection = async () => {
	try {
		await initializeApi();
		const keyring = await getKeyringFromSeed("//TernoaTestAccount");
        const COLLECTION_ID = 1 // the collection id you want to burn
		const collectionData = await burnCollection(COLLECTION_ID, keyring, WaitUntil.BlockInclusion);
		console.log(`Collection ${collectionData.collectionId} burned`, );
	} catch (e) {
		console.error(e);
	}
};
```
### The expected params
```typescript
`id`: The ID of the Collection.
`keyring`:  the provided keyring (containing the address) will be used to sign the transaction and pay the execution fee.
`waitUntil`: WaitUntil define at which point we want to get the results of the transaction execution: BlockInclusion or BlockFinalization.
```
### Response
The response provided from the blockchain event includes all the informations below according to the params provided when burning a collection of NFT.

```typescript
`collectionId`: ID of the burned collection.
```
## How to retrieve a burned collection using our Indexer? 

Ternoa indexer is **a record of the Ternoa Chain data.**
You can query data for some specific entities (NFT, Collection, Marketplace(...)) using graphql.
*In this exemple, we use the graphql-request library.*

You first need to prepare a stringified query to get collection data from a specific collection id, as we did in the query(id) function. 
Do not hesitate to adapt the information you require in your query. When the query is ready, you can make the request to our indexer by providing both the indexer endpoint and the query. To check if the collection is burned, the `**owner**` should be set to null and the `**timestampBurn**` must be filled.

```typescript showLineNumbers
import { request, gql } from "graphql-request";

const COLLECTION_ID = 0;
const query = (id: number) => gql`
    {
      collectionEntity(id: "${id}") {
        collectionId
        nbNfts
        owner
        timestampBurn
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
	collectionId: string;
    nbNfts: number;
    owner: string | null;
    timestampBurn: string | null;
};
```
## How to limit a collection of NFT on-chain? 
### Code Snippet
This function limits a collection of NFT on the Ternoa chain. It returns an object promise containing the CollectionLimitedEvent provided by the Ternoa blockchain.
Use your own account by updating the //TernoaTestAccount with your account seed when retrieving the keyring from the example below. **Replace the COLLECTION_ID** with the one to limit.

```typescript showLineNumbers
import { limitCollection, initializeApi, getKeyringFromSeed, WaitUntil} from "ternoa-js";

const limitCollection = async () => {
	try {
		await initializeApi();
		const keyring = await getKeyringFromSeed("//TernoaTestAccount");
        const COLLECTION_ID = 1 // the collection id you want to limit
		const collectionData = await limitCollection(COLLECTION_ID, keyring, WaitUntil.BlockInclusion);
		console.log(`Collection ${collectionData.collectionId} limited to : ${collectionData.limit}`, );
	} catch (e) {
		console.error(e);
	}
};
```
### The expected params
```typescript
`id`: The ID of the Collection.
`keyring`:  the provided keyring (containing the address) will be used to sign the transaction and pay the execution fee.
`waitUntil`: WaitUntil define at which point we want to get the results of the transaction execution: BlockInclusion or BlockFinalization.
```
### Response
The response provided from the blockchain event includes all the informations below according to the params provided when limiting a collection of NFT.

```typescript
`collectionId`: ID of the limited collection.
`limit`: the limit set for the collection.
```
## How to retrieve a limited collection using our Indexer? 

Ternoa indexer is **a record of the Ternoa Chain data.**
You can query data for some specific entities (NFT, Collection, Marketplace(...)) using graphql.
*In this exemple, we use the graphql-request library.*

You first need to prepare a stringified query to get collection data from a specific collection id, as we did in the query(id) function. 
Do not hesitate to adapt the information you require in your query. When the query is ready, you can make the request to our indexer by providing both the indexer endpoint and the query. To check if the collection is limited, the `**limit**` should be set and the `**timestampLimit**` must be filled.

```typescript showLineNumbers
import { request, gql } from "graphql-request";

const COLLECTION_ID = 0;
const query = (id: number) => gql`
    {
      collectionEntity(id: "${id}") {
        collectionId
        nbNfts
        limit
        timestampLimit
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
	collectionId: string;
    nbNfts: number;
    limit: number;
    timestampLimit: string | null;
};
```
