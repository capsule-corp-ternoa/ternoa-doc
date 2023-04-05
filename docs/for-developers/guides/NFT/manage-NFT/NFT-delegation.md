---
sidebar_position: 2
sidebar_label: How to delegate an NFT
---

# Manage NFT - Delegation

Ternoa provides you with many NFT features. Not only creating an NFT can be done in just a few lines of code but we also cover many NFT basic use cases: Ternoa allows you to easily create functions to delegate, transfer, burn an NFT, or even set the NFT royalty without using any smart contracts.

## Prerequisites

Before getting started, make sure you have the following ready:

1. Create a [Ternoa account](/for-developers/get-started/create-account) with [Alphanet CAPS](/for-developers/get-started/create-account#step-2-get-some-free-test-caps-tokens)
2. Install and set up your editor of choice (we will use Visual Studio Code [VSC] in this tutorial)
3. Install [NodeJS v.14+](https://nodejs.org/en/download/) & NPM
4. [Install & initialize Ternoa-JS](/for-developers/get-started/install-ternoa-js)

## How to delegate an NFT using Ternoa-JS

This function delegates an NFT to someone else on the Ternoa chain. It returns an object promise containing the NFTDelegatedEvent provided by the Ternoa blockchain.
Use your own account by updating the //TernoaTestAccount with your account seed when retrieving the keyring from the example below. Since you are willing to delegate your NFT to someone else, **replace both variables delegatee and NFT_ID** with the data of your choice.

```typescript showLineNumbers
import {
	delegateNft,
	initializeApi,
	getKeyringFromSeed,
	WaitUntil,
} from "ternoa-js";

const delegateNFT = async () => {
	try {
		await initializeApi();
		const keyring = await getKeyringFromSeed("//TernoaTestAccount");
		const delegatee = "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY"; // The destination account address.
		const NFT_ID = 1; // the NFT id you want to delegate
		const nftData = await delegateNft(
			NFT_ID,
			delegatee,
			keyring,
			WaitUntil.BlockInclusion
		);
		console.log(`NFT ${nftData.nftId} delegated to : ${nftData.recipient}`);
	} catch (e) {
		console.error(e);
	}
};
```

### The expected params

```markdown
`id`: The ID of the NFT.
`recipient`: Destination account. If set to undefined this function acts as a way to undelegate a delegated NFT.
`keyring`: the provided keyring (containing the address) will be used to sign the transaction and pay the execution fee.
`waitUntil`: WaitUntil defines at which point we want to get the results of the transaction execution: BlockInclusion or BlockFinalization.
```

### Response

The response provided from the blockchain event includes all the information below according to the parameters provided when delegating/undelegating the NFT.

```markdown
`nftId`: ID of the delegated/undelegated NFT.
`recipient`: The address of the delegatee as string or null when the NFT is undelegated.
```

## How to undelegate an NFT using Ternoa-JS

To undelegate a delegated NFT, you just need to **run the same function** as before and replace the delegate variable with **undefined**.

```typescript showLineNumbers
import {
	delegateNft,
	initializeApi,
	getKeyringFromSeed,
	WaitUntil,
} from "ternoa-js";

const delegateNFT = async () => {
	try {
		await initializeApi();
		const keyring = await getKeyringFromSeed("//TernoaTestAccount");
		const delegatee = undefined; // This will undelegate the NFT you will pass in the params below.
		const NFT_ID = 1; // the NFT id you want to delegate
		const nftData = await delegateNft(
			NFT_ID,
			delegatee,
			keyring,
			WaitUntil.BlockInclusion
		);
		console.log(`NFT ${nftData.nftId} undelegated`);
	} catch (e) {
		console.error(e);
	}
};
```

## How to retrieve a delegated/undelegated NFT using Ternoa Indexer

Ternoa indexer is **a record of the Ternoa Chain data.**
You can query data for some specific entities (NFT, Collection, Marketplace(...)) using graphql.
_In this example, we use the graphql-request library._

You first need to prepare a stringified query to get NFT data from a specific NFT id, as we did in the query(id) function.
Do not hesitate to adapt the information you require in your query. You can check all the fields queryable for the [NftEntity](/for-developers/guides/NFT/basic-NFT/get-NFT#step-1-nftentity-query-preparation).

When the query is ready, you can request our indexer by providing both the indexer endpoint and the query. To check if the NFT is delegated, just add the `**isDelegated**` and `**delegatee**`fields in the list.

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

## Support

If you face any trouble, feel free to reach out to our community engineers in our [Discord](https://discord.gg/fUmBkPpnRu).
