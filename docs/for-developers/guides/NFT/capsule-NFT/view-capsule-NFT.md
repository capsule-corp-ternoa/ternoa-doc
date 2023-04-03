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
    const REQUESTER_SEED = "//TernoaTestAccount"; // The NFT requester seed phrase.
    const NFT_ID = 74356; // The Capsule NFT ID.

    const requesterKeyring = await getKeyringFromSeed(REQUESTER_SEED);
    const requesterRole = "OWNER";

    const privateKey = await getCapsuleNFTPrivateKey(
      NFT_ID,
      requesterKeyring,
      requesterRole,
    );
    console.log("The capsule private key is: ", privateKey);
  } catch (e) {
    console.error(e);
  }
};
```

This program uses the Ternoa-js library to retrieve a Capsule NFT private key from the TEE enclaves. The function first sets several constants, including the owner's seed phrase, and the Capsule NFT ID, and then generates a keyring from the seed phrase. The function calls the `getCapsuleNFTPrivateKey` helper to retrieve the private key for a Capsule NFT with the given ID using the requester keyring, the requester role kind (e.g. **"OWNER"**), and the cluster-ID. The retrieved private key is then logged into the console. If there is any error during the execution, it will be logged into the console as well.

:::info

Use your own account by updating the `//TernoaTestAccount` with your account seed when retrieving the keyring from the example below.

:::

Here are detailed the `getCapsuleNFTPrivateKey` helper parameters:

```markdown
`nftId`: The Capsule NFT to retrieve the private key from TEE enclaves.
`requester`: The requester keyring to sign the transaction and authenticate. Only the requester address can be used if a signer method is provided as a parameter.
`requesterRole`: The requester role kind; it can be either "OWNER", "DELEGATEE" or "RENTEE".
`extensionInjector`: (Optional) The signer method retrieved from your extension: object must have a signer key.
`clusterId`: (Optional) The TEE Cluster ID of enclaves used to store private key shares. The default is 0.
```

The response returned is a string promise containing the capsule's private key.

The next step will be to retrieve the capsule off-chain data from IPFS.

## Step 2: Retrieve the capsule off-chain data CID hash using Ternoa Indexer

Ternoa indexer is **a record of the Ternoa Chain data.**
You can query data for some specific entities (NFT, Collection, Marketplace(...)) using GraphQL.
_In this example, we use the graphql-request library._

You first need to prepare a stringified query to get NFT data from a specific Capsule NFT id.

```typescript
{
  nftEntity(id: "NFT_ID") {
    owner
    nftId
    offchainData
    capsuleOffchainData
    isCapsule
    isCapsuleSynced
    collectionId
    royalty
    timestampCreated
  }
}
```

The data we will use in step 3 is `capsuleOffchainData` the IPFS CID hash of the Capsule NFT (e.g. "QmNM7fDadTjoLKqMi8i4Lyru4FUiKyQYpRmSoXnDjtgm6N").

:::info
Learn more about the [NFTEntity](/for-developers/guides/NFT/basic-NFT/get-NFT#step-1-nftentity-query-preparation) and how to fetch data from the Ternoa Indexer [here](/for-developers/guides/NFT/basic-NFT/get-NFT).
:::

## Step 3: Retrieve the Capsule NFT's content assets from IPFS

To retrieve a Capsule NFT's content assets from IPFS, Ternoa-JS provides you with an IPFS client `TernoaIPFS` to do so.

```typescript showLineNumbers
import { TernoaIPFS } from "ternoa-js";

const retrieveEncryptedAssets = async () => {
	try {
		// ...
		// fetching CAPSULE_OFFCHAIN_DATA in step 2

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

		// ...
	} catch (e) {
		console.error(e);
	}
};
```

This code snippet creates a new instance of `TernoaIPFS` using the IPFS node's URL and API key. It then calls the `getFile` method of the IPFS client to retrieve the metadata of a Capsule NFT with the given off-chain data retrieve in [Step 2](/for-developers/guides/NFT/capsule-NFT/view-capsule-NFT#step-2-retrieve-the-capsule-off-chain-data-cid-hash-using-ternoa-indexer). The metadata is then parsed to extract the list of encrypted media assets. The code then uses **Promise.all** and `getFile` method of the IPFS client to retrieve all of the encrypted files and stores them in an array. If there is any error during the execution, it will be logged into the console.

:::info
Please note that an _api-key_ is needed to store data on Ternoa IPFS gateways. Visit [IPFS Keymanager](https://ipfs-key-manager-git-dev-ternoa.vercel.app/) to get your API Key. Learn about the Ternoa IPFS client [here](/for-developers/advanced-guides/ipfs).
:::

The final step will be to decrypt the files.

## Step 4: Decrypt assets

```typescript showLineNumbers
import { decryptFile } from "ternoa-js";

const decrypt = async () => {
	// ...
	// capsule privateKey retrieved in step 1
	// encryptedFiles array prepared in step 2

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

The decrypt function calls the `decryptFile` helper from Ternoa-JS to decrypt the first encrypted asset of the capsule. The array of files is assumed to have been prepared in the previous [Step 3](/for-developers/guides/NFT/capsule-NFT/view-capsule-NFT#step-3-retrieve-the-capsule-nfts-content-assets-from-ipfs), and the capsule private key for decryption is assumed to have been retrieved in [Step 1](/for-developers/guides/NFT/capsule-NFT/view-capsule-NFT#step-1-obtain-the-private-key-associated-with-the-capsule-nft). The decrypted asset is in base 64 format. If there is any error during the execution, it will be logged into the console.

## Support

If you face any trouble, feel free to reach out to our community engineers in our [Discord](https://discord.gg/fUmBkPpnRu).
