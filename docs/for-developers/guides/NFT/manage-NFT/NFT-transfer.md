---
sidebar_position: 1
sidebar_label: How to transfer an NFT
---

# Manage NFT - Transfer

Ternoa provides you with many NFT features. Not only creating an NFT can be done in just a few lines of code but we also cover many NFT basic usecases: Ternoa allows you to easily create functions to delegate, transfer, burn an NFT or even set the NFT royalty without using any smart contracts.

## Prerequisites

Before getting started, make sure you have the following ready:

1. Create a [Ternoa account](/for-developers/get-started/create-account) with [Alphanet CAPS](/for-developers/get-started/create-account#step-2-get-some-free-test-caps-tokens)
2. Install and set up your editor of choice (we will use Visual Studio Code [VSC] in this tutorial)
3. Install [NodeJS v.14+](https://nodejs.org/en/download/) & NPM
4. [Install & initialize Ternoa-JS](/for-developers/get-started/install-ternoa-js)

## How to transfer an NFT using Ternoa-JS

The `transferNft` helpers transfers an NFT from the Ternoa chain. It returns an object promise containing the `NFTTransferredEvent` provided by the Ternoa blockchain.
Use your own account by updating the //TernoaTestAccount with your account seed when retrieving the keyring from the example below. **Replace the NFT_ID variable** with the NFT ID you want to transfer.

```typescript showLineNumbers
import { transferNft, getKeyringFromSeed, WaitUntil } from "ternoa-js";

const main = async () => {
	try {
		// The known accounts we want to use
		const keyring = await getKeyringFromSeed("//TernoaTestAccount");
		const TO_ADDRESS = "RECIPIENT_ADDRESS";

		// The NFT id to transfer
		const NFT_ID = NFT_ID;

		const nftData = await transferNft(
			NFT_ID,
			TO_ADDRESS,
			keyring,
			WaitUntil.BlockInclusion
		);
		console.log(`NFT ${nftData.nftId} transferred`);
	} catch (e) {
		console.error(e);
	}
};
```

### The expected params

```markdown
`id`: The ID of the NFT to transfer.
`recipient`: The recipient address.
`keyring`: The provided keyring (containing the address) will be used to sign the transaction and pay the execution fee.
`waitUntil`: WaitUntil define at which point we want to get the results of the transaction execution: BlockInclusion or BlockFinalization.
```

### Response

The response provided from the blockchain event includes all the informations below according to the params provided when transferring the NFT.

```markdown
`nftId`: ID of the transferred NFT.
`sender`: The sender address.
`recipient`: The recipient address.
```

## How to retrieve a transferred NFT using Ternoa Indexer

Ternoa indexer is **a record of the Ternoa Chain data.**
You can query data for some specific entities (NFT, Collection, Markeplace(...)) using graphql.
_In this example, we use the graphql-request library._

You first need to prepare a stringified query to get NFT data from a specific NFT id, as we did in the query(id) function.
Do not hesitate to adapt the information you require in your query. You can check all the fields queryable for the [NftEntity](/for-developers/guides/NFT/basic-NFT/get-NFT#step-1-nftentity-query-preparation).

When the query is ready, you can make the request to our indexer by providing both the indexer endpoint and the query.

```typescript showLineNumbers
import { request, gql } from "graphql-request";

// The NFT id to get data from Indexer
const NFT_ID = NFT_ID;
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
	timestampBurn: string;
	#Date;
};
```

## Support

If you face any trouble, feel free to reach out to our community engineers in our [Discord](https://discord.gg/fUmBkPpnRu).
