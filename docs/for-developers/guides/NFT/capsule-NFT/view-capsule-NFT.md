---
sidebar_position: 3
sidebar_label: How to decrypt a Capsule NFT
---

# How to decrypt a Capsule NFT

## Prerequisites

Before getting started, make sure you have the following ready:

1. Create a [Ternoa account](/for-developers/get-started/create-account) with [Alphanet CAPS](/for-developers/get-started/create-account#step-2-get-some-free-test-caps-tokens)
2. Install and set up your editor of choice (we will use Visual Studio Code [VSC] in this tutorial)
3. Install [NodeJS v.14+](https://nodejs.org/en/download/) & NPM
4. [Install & initialize Ternoa-JS](/for-developers/get-started/install-ternoa-js)

## Decrypting a Capsule NFT using Ternoa-JS

If you want to decrypt the content of a Capsule NFT from the Ternoa chain, follow these steps:

-   Obtain the private key associated with the Capsule NFT. This key is necessary to decrypt the secret hashes that are nested in the NFT's metadata.
-   Retrieve the capsule off-chain data CID hash using Ternoa Indexer.
-   Retrieve the Capsule NFT's content assets from IPFS.
-   Decrypt each asset one by one and convert it into a base 64 format, as required. Note that you will need to use the private key obtained in step 1 to access and decrypt the content.

## Step 1: Obtain the private key associated with the Capsule NFT

To retrieve a Capsule NFT private key from the TEE enclaves, Ternoa-JS provides you with a `getCapsuleNFTPrivateKey` helper to do so. It returns a string promise containing the private key.

```typescript showLineNumbers
import { getKeyringFromSeed, getCapsuleNFTPrivateKey } from getKeyringFromSeed;

const retrievePrivateKey = async () => {
  try {
    const SEED = "//TernoaTestAccount"; // The NFT requester seed phrase.
    const CLUSTER_ID = 0; // The cluster of TEE enclaves used to store private key shares.
    const NFT_ID = 74356; // The Capsule NFT ID.

    const keyring = await getKeyringFromSeed(SEED);

    const privateKey = await getCapsuleNFTPrivateKey(
      NFT_ID,
      keyring,
      "OWNER",
      undefined,
      CLUSTER_ID
    );
    console.log("The capsule private key is: ", privateKey);
  } catch (e) {
    console.error(e);
  }
};
```

:::info

Use your own account by updating the `//TernoaTestAccount` with your account seed when retrieving the keyring from the example below.

:::

The response returned a decrypted base64 format of the Capsule NFT.

## Step 2: Retrieve the capsule off-chain data CID hash using Ternoa Indexer

Ternoa indexer is **a record of the Ternoa Chain data.**
You can query data for some specific entities (NFT, Collection, Marketplace(...)) using GraphQL.
_In this example, we use the graphql-request library._

You first need to prepare a stringified query to get NFT data from a specific Capsule NFT id.

## Step 3: Retrieve the Capsule NFT's content assets from IPFS

```typescript showLineNumbers
import { TernoaIPFS } from "ternoa-js";

const retrieveEncryptedAssets = async () => {
	try {
		const IPFS_NODE_URL = "IPFS_NODE_URL"; // The IPFS node used.
		const IPFS_API_KEY = "IPFS_API_KEY"; // The IPFS node API KEY if required.
		const CAPSULE_OFFCHAIN_DATA =
			"QmNM7fDadTjoLKqMi8i4Lyru4FUiKyQYpRmSoXnDjtgm6N"; // The Capsule NFT off-chain data.

		const ipfsClient = new TernoaIPFS(new URL(IPFS_NODE_URL), IPFS_API_KEY);

		const res = (await ipfsClient.getFile(
			CAPSULE_OFFCHAIN_DATA
		)) as NftMetadataType;
		const assets = res.properties?.encrypted_media as { hash: string }[];
		const encryptedFiles = await Promise.all(
			assets.map(
				async ({ hash }: { hash: string }) =>
					(await ipfsClient.getFile(hash)) as string
			)
		);
	} catch (e) {
		console.error(e);
	}
};
```

## Step 4: Decrypt assets

```typescript showLineNumbers
import { decryptFile } from "ternoa-js";

const decrypt = async () => {
	try {
		const decryptedAsset1 = await decryptFile(
			encryptedFiles[0],
			privateKey
		);
	} catch (e) {
		console.error(e);
	}
};
```

## Next

The next step will be getting the NFT data from the Ternoa Indexer using the NFT id just generated. Keep it and continue on the ["How to retrieve a Capsule NFT"](/for-developers/guides/NFT/capsule-NFT/get-NFT) guide.

## Support

If you face any trouble, feel free to reach out to our community engineers in our [Discord](https://discord.gg/fUmBkPpnRu).
