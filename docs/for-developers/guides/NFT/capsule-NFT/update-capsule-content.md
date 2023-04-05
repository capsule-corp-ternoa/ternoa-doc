---
sidebar_position: 4
sidebar_label: How to update a Capsule NFT content
---

# How to update a Capsule NFT content

## Prerequisites

Before getting started, make sure you have the following ready:

1. Create a [Ternoa account](/for-developers/get-started/create-account) with [Alphanet CAPS](/for-developers/get-started/create-account#step-2-get-some-free-test-caps-tokens)
2. Install and set up your editor of choice (we will use Visual Studio Code [VSC] in this tutorial)
3. Install [NodeJS v.14+](https://nodejs.org/en/download/) & NPM
4. [Install & initialize Ternoa-JS](/for-developers/get-started/install-ternoa-js)

## Update a Capsule NFT using Ternoa-JS: Add a new asset to the Capsule

If you want to update the content of a Capsule NFT on the Ternoa chain by adding a new asset, follow these steps:

-   Retrieve the capsule off-chain data CID hash using Ternoa Indexer.
-   Prepare new asset: encryption and storage on IPFS.
-   Prepare new capsule metadata with the new encrypted media added to the content array.
-   Update the capsule off-chain data CID hash on-chain.

## Step 1: Retrieve the capsule off-chain data CID hash using Ternoa Indexer

Ternoa indexer is **a record of the Ternoa Chain data.**
You can query data for some specific entities (NFT, Collection, Marketplace(...)) using GraphQL.

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

The data we will use in step 2 is `capsuleOffchainData` the IPFS CID hash of the Capsule NFT (e.g. "QmNM7fDadTjoLKqMi8i4Lyru4FUiKyQYpRmSoXnDjtgm6N").

:::info
Learn more about the [NFTEntity](/for-developers/guides/NFT/basic-NFT/get-NFT#step-1-nftentity-query-preparation) and how to fetch data from the Ternoa Indexer [here](/for-developers/guides/NFT/basic-NFT/get-NFT).
:::

## Step 2: Prepare new asset - encryption and stored on IPFS

Before adding a new asset to an existing Capsule NFT you have to encrypt the asset and store it on IPFS. Ternoa-JS provides you with an `encryptFile` helper to do so. It uses a specified public PGP key to encrypt the asset. You can generate a PGP key pair using the `generatePGPKeys` helper from Ternoa-JS. To store the encrypted asset on IPFS you can use the `storeFile` method from the `TernoaIPFS` client. Here is an example of a code snippet:

```typescript showLineNumbers
import fs from "fs";
import { encryptFile, TernoaIPFS, File } from "ternoa-js";

const prepareAsset = async () => {
	try {
		const IPFS_NODE_URL = "IPFS_NODE_URL"; // The IPFS node used.
		const IPFS_API_KEY = "IPFS_API_KEY"; // The IPFS node API KEY if required.
		const PUBLIC_PGP_KEY = "PUBLIC_PGP_KEY"; // The public PGP key used to encrypt the new asset to add.

		const newAsset = new File(
			[await fs.promises.readFile("FILE_NAME_1")],
			"FILE_NAME_1",
			{
				type: "FILE_TYPE_1",
			}
		);

		const newEncryptedAsset = await encryptFile(newAsset, "PUBLIC_PGP_KEY");

		const ipfsClient = new TernoaIPFS(new URL(IPFS_NODE_URL), IPFS_API_KEY);
		const { Hash: ASSET_HASH, Size: ASSET_SIZE } =
			await ipfsClient.storeFile(newEncryptedAsset);

		// Encrypted asset ASSET_HASH & ASSET_SIZE will be used in step 3
		// ...
	} catch (e) {
		console.error(e);
	}
};
```

:::info

Learn more about on [How to prepare Capsule NFT assets](/for-developers/advanced-guides/capsule-nft/prepare-assets).

:::

## Step 3: Prepare new capsule metadata with the new encrypted media added to the content array

A Ternoa Capsule NFT comprises additional files: several asset files (such as an image, video, or music file) and a metadata JSON file for the capsule. To ensure maximum security and exclusivity, asset files must be encrypted, and the encrypted files are nested within the metadata file. Both files are stored on IPFS (Interplanetary File Systems) with unique hashes dedicated to each file.

```typescript showLineNumbers
import fs from "fs";
import { encryptFile, TernoaIPFS, File } from "ternoa-js";

const updateCapsuleMetadata = async () => {
	try {
		// ...
		// fetching CAPSULE_OFFCHAIN_DATA in step 1
		// Encrypted asset ASSET_HASH & ASSET_SIZE retrieved in step 2

		const res = (await ipfsClient.getFile(
			CAPSULE_OFFCHAIN_DATA
		)) as NftMetadataType;

		const newAsset = {
			hash: ASSET_HASH,
			size: Number(ASSET_SIZE),
			type: "text/plain",
		};

		const capsuleMetadata = {
			...res,
			properties: {
				...res?.properties,
				encrypted_media: [...encrypted_media, newAsset],
			},
		};

		const capsuleNFTMetadataBlob = new Blob(
			[JSON.stringify(capsuleMetadata)],
			{
				type: "application/json",
			}
		);
		const capsuleNFTMetadataFile = new File(
			[capsuleNFTMetadataBlob],
			"Capsule NFT metadata"
		);
		const { Hash: NEW_CAPSULE_OFFCHAIN_DATA } = await TernoaIPFS.storeFile(
			service,
			capsuleNFTMetadataFile
		);

		// NEW_CAPSULE_OFFCHAIN_DATA will be used in step 4
		// ...
	} catch (e) {
		console.error(e);
	}
};
```

This function retrieves first the current capsule metadata from IPFS using the `getFile` method from the `TernoaIPFS` client. Next, a new asset is added to the **encrypted_media** array within the metadata object using object and array spreading. The new metadata is stored as a JSON-formatted Blob object then as a File instance. The updated metadata JSON File is then stored on IPFS using the `storeFile` method from the `TernoaIPFS` client, which returns a hash value for the new metadata object. This hash is saved for use in the final [Step 4](/for-developers/guides/NFT/capsule-NFT/update-capsule-content#step-4-update-the-capsule-off-chain-data-cid-hash-on-chain). If any errors occur during this process, they are logged to the console using "console.error".

:::info

Learn more about [How to prepare Capsule NFT assets](/for-developers/advanced-guides/capsule-nft/prepare-assets).

:::

## Step 4: Update the capsule off-chain data CID hash on-chain

```typescript showLineNumbers
import {
	getKeyringFromSeed,
	setCapsuleOffchaindata,
	WaitUntil,
} from "ternoa-js";

const setCapsuleMetadata = async () => {
	try {
		// ...
		// fetching NEW_CAPSULE_OFFCHAIN_DATA in step 3

		const SEED = "//TernoaTestAccount"; // The Capsule NFT owner seed phrase.
		const keyring = await getKeyringFromSeed(SEED);

		await setCapsuleOffchaindata(
			NFT_ID,
			NEW_CAPSULE_OFFCHAIN_DATA,
			keyring,
			WaitUntil.BlockInclusion
		);
	} catch (e) {
		console.error(e);
	}
};
```

This program uses the `setCapsuleOffchaindata` function to update the off-chain data associated with the NFT capsule. This function takes several parameters including the NFT ID, the new off-chain data hash value retrieved in [Step 3](/for-developers/guides/NFT/capsule-NFT/update-capsule-content#step-3-prepare-new-capsule-metadata-with-the-new-encrypted-media-added-to-the-content-array), the keyring associated with the capsule owner, and a WaitUntil block inclusion option. If any errors occur during this process, they will be logged to the console using "console.error".

:::info

Use your own account by updating the `//TernoaTestAccount` with your account seed when retrieving the keyring from the example below.

:::

## Support

If you face any trouble, feel free to reach out to our community engineers in our [Discord](https://discord.gg/fUmBkPpnRu).
