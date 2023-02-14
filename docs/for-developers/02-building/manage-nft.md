---
sidebar_position: 8
sidebar_label: Manage your NFTs
---

# Manage your NFTs

Ternoa provides you with many NFT features. Not only creating an NFT can be done in just a few lines of code but we also cover many NFT basic usecases: Ternoa allows you to easily create functions to delegate, transfer, burn an NFT or even set the NFT royalty without using any smart contracts.

If you did not looked yet at the needed prerequisites before starting to code (a ternoa account, claimed some test caps, and installed the ternoa-js api with `npm install ternoa-js`), please look at the [Get Started]("") section. We also strongly recommand you to look at the good practice [section]("") to learn more about main concept you will see in the code below (**API initialization, Keyring** (...))

## How to delegate an NFT on-chain? 

### Code Snippet
This function delegates an NFT to someone else on the Ternoa chain. It returns an object promise containing the NFTDelegatedEvent provided by the Ternoa blockchain.
Use your own account by updating the //TernoaTestAccount with your account seed when retrieving the keyring from the example below. Since you are willing to delegate your NFT to someone else, **replace both variables delegatee and NFT_ID** with the data of your choice.

```typescript showLineNumbers
import { delegateNft, initializeApi, getKeyringFromSeed, WaitUntil} from "ternoa-js";

const delegateNFT = async () => {
	try {
		await initializeApi();
		const keyring = await getKeyringFromSeed("//TernoaTestAccount");
        const delegatee = "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY" // The destination account address.
        const NFT_ID = 1 // the NFT id you want to delegate
		const nftData = await delegateNft(NFT_ID, delegatee, keyring, WaitUntil.BlockInclusion);
		console.log(`NFT ${nftData.nftId} delegated to : ${nftData.recipient}`, );
	} catch (e) {
		console.error(e);
	}
};
```

### The expected params
```typescript
`id`: The ID of the NFT.
`recipient`: Destination account. If set to undefined this functions acts as a way to undelegate a delegated NFT.
`keyring`:  the provided keyring (containing the address) will be used to sign the transaction and pay the execution fee.
`waitUntil`: WaitUntil define at which point we want to get the results of the transaction execution: BlockInclusion or BlockFinalization.
```
### Response
The response provided from the blockchain event includes all the informations below according to the params provided when delegating/undelegating the NFT.

```typescript
`nftId`: ID of the delegated/undelegated NFT.
`recipient`: The address of the delegatee as string or null when the NFT is undelegated.
```

## How to undelegate a delegated NFT? 

To undelegate a delegated NFT, you just need to **run the same function** as before and replace the delegate variable by **undefined**.

```typescript showLineNumbers
import { delegateNft, initializeApi, getKeyringFromSeed, WaitUntil} from "ternoa-js";

const delegateNFT = async () => {
	try {
		await initializeApi();
		const keyring = await getKeyringFromSeed("//TernoaTestAccount");
        const delegatee = undefined // This will undelegate the NFT you will pass in params below.
        const NFT_ID = 1 // the NFT id you want to delegate
		const nftData = await delegateNft(NFT_ID, delegatee, keyring, WaitUntil.BlockInclusion);
		console.log(`NFT ${nftData.nftId} undelegated`, );
	} catch (e) {
		console.error(e);
	}
};
```
## How to retrieve a delegated/undelegated NFT using our Indexer? 

Ternoa indexer is **a record of the Ternoa Chain data.**
You can query data for some specific entities (NFT, Collection, Marketplace(...)) using graphql.
*In this exemple, we use the graphql-request library.*

You first need to prepare a stringified query to get NFT data from a specific NFT id, as we did in the query(id) function. 
Do not hesitate to adapt the information you require in your query. When the query is ready, you can make the request to our indexer by providing both the indexer endpoint and the query. To check if the NFT is delegated, just add the `**isDelegated**` and `**delegatee**`fields in the list.


```typescript showLineNumbers
import { request, gql } from "graphql-request";

const NFT_ID = 0;
const query = (id: number) => gql`
    {
      nftEntity(id: "${id}") {
        nftId
        owner
        creator
        isDelegated
        delegatee
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
	nftId: string;
    owner: string;
    creator: string;
    isDelegated: boolean;
    delegatee: string | null;
};
```
## How to burn an NFT? 

This function burns an NFT from the Ternoa chain. It returns an object promise containing the NFTBurnedEvent provided by the Ternoa blockchain.
Use your own account by updating the //TernoaTestAccount with your account seed when retrieving the keyring from the example below. **Replace the NFT_ID variable** with the ID you want to burn.

```typescript showLineNumbers
import { burnNft, initializeApi, getKeyringFromSeed, WaitUntil} from "ternoa-js";

const delegateNFT = async () => {
	try {
		await initializeApi();
		const keyring = await getKeyringFromSeed("//TernoaTestAccount");
        const NFT_ID = 1 // the NFT id to burn
		const nftData = await burnNft(NFT_ID, keyring, WaitUntil.BlockInclusion);
		console.log(`NFT ${nftData.nftId} undelegated`, );
	} catch (e) {
		console.error(e);
	}
};
```
### The expected params
```typescript
`id`: The ID of the NFT to burn.
`keyring`:  the provided keyring (containing the address) will be used to sign the transaction and pay the execution fee.
`waitUntil`: WaitUntil define at which point we want to get the results of the transaction execution: BlockInclusion or BlockFinalization.
```
### Response
The response provided from the blockchain event includes all the informations below according to the params provided when burning the NFT.

```typescript
`nftId`: ID of the burnt NFT.
```
## How to retrieve a burnt NFT using our Indexer? 

Ternoa indexer is **a record of the Ternoa Chain data.**
You can query data for some specific entities (NFT, Collection, Markeplace(...)) using graphql.
*In this exemple, we use the graphql-request library.*

You first need to prepare a stringified query to get NFT data from a specific NFT id, as we did in the query(id) function. 
Do not hesitate to adapt the information you require in your query. When the query is ready, you can make the request to our indexer by providing both the indexer endpoint and the query. To check if the NFT is burnt owner should be set to null, and a timestampBurn must be filled.

```typescript showLineNumbers
import { request, gql } from "graphql-request";

const NFT_ID = 0;
const query = (id: number) => gql`
    {
      nftEntity(id: "${id}") {
        nftId
        owner
        creator
        timestampBurn
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
	nftId: string;
    owner: string;
    creator: string;
    timestampBurn: string; #Date
};
```
## How to set the NFT royalty? 

This function sets the NFT royalty on the Ternoa chain. It returns an object promise containing the NFTRoyaltySetEvent provided by the Ternoa blockchain.
Use your own account by updating the //TernoaTestAccount with your account seed when retrieving the keyring from the example below. **Replace the NFT_ID, and royalty variables** with the ID you want to set the royalty and the royalty amount.

```typescript showLineNumbers
import { setRoyalty, initializeApi, getKeyringFromSeed, WaitUntil} from "ternoa-js";

const delegateNFT = async () => {
	try {
		await initializeApi();
		const keyring = await getKeyringFromSeed("//TernoaTestAccount");
        const NFT_ID = 1 // the NFT id to update the royalty
        const royalty = 10 
		const nftData = await setRoyalty(NFT_ID,royalty , keyring, WaitUntil.BlockInclusion);
		console.log(`NFT ${nftData.nftId} undelegated`, );
	} catch (e) {
		console.error(e);
	}
};
```
### The expected params
```typescript
`id`: The ID of the NFT to update the royalty.
`amount`: The new royalty value.
`keyring`:  the provided keyring (containing the address) will be used to sign the transaction and pay the execution fee.
`waitUntil`: WaitUntil define at which point we want to get the results of the transaction execution: BlockInclusion or BlockFinalization.
```
### Response
The response provided from the blockchain event includes all the informations below according to the params provided when updating the NFT's royalty.

```typescript
`nftId`: ID of the updated NFT.
`royalty`: The new royalty amount as a number.
```
## How to retrieve the NFT royalty using our Indexer? 

Ternoa indexer is **a record of the Ternoa Chain data.**
You can query data for some specific entities (NFT, Collection, Markeplace(...)) using graphql.
*In this exemple, we use the graphql-request library.*

You first need to prepare a stringified query to get NFT data from a specific NFT id, as we did in the query(id) function. 
Do not hesitate to adapt the information you require in your query. When the query is ready, you can make the request to our indexer by providing both the indexer endpoint and the query. Check the NFT royalty filed.


```typescript showLineNumbers
import { request, gql } from "graphql-request";

const NFT_ID = 0;
const query = (id: number) => gql`
    {
      nftEntity(id: "${id}") {
        nftId
        owner
        creator
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
	nftId: string;
    owner: string;
    creator: string;
    royalty: number;
};
```



