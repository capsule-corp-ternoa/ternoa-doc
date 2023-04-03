---
sidebar_position: 1
sidebar_label: How to mint a Capsule NFT on-chain
---

# How to mint a Capsule NFT on-chain

## Prerequisites

Before getting started, make sure you have the following ready:

1. Create a [Ternoa account](/for-developers/get-started/create-account) with [Alphanet CAPS](/for-developers/get-started/create-account#step-2-get-some-free-test-caps-tokens)
2. Install and set up your editor of choice (we will use Visual Studio Code [VSC] in this tutorial)
3. Install [NodeJS v.14+](https://nodejs.org/en/download/) & NPM
4. [Install & initialize Ternoa-JS](/for-developers/get-started/install-ternoa-js)

## Minting a Capsule NFT on-chain using Ternoa-JS

To create a Capsule NFT on the Ternoa chain, Ternoa-JS provides you with a `mintCapsuleNFT` helper to do so.

:::info
Please note that an _api-key_ is needed to store data on Ternoa IPFS gateways. Visit [IPFS Keymanager](https://ipfs-key-manager-git-dev-ternoa.vercel.app/) to get your API Key.
:::

```typescript showLineNumbers
import fs from "fs";
import {
	encryptFile,
	getKeyringFromSeed,
	mintCapsuleNFT,
	File,
	TernoaIPFS,
	WaitUntil,
} from "ternoa-js";

const main = async () => {
	try {
		const SEED = "//TernoaTestAccount"; // The owner seed phrase.
		const IPFS_NODE_URL = "IPFS_NODE_URL"; // The IPFS node used.
		const IPFS_API_KEY = "IPFS_API_KEY"; // The IPFS node API KEY if required.
		const CLUSTER_ID = 0; // The cluster of TEE enclaves used to store private key shares.
		const CAPSULE_NFT_ROYALTY = 10; // Percentage of all second sales that the capsule NFT creator will receive - 10%.
		const COLLECTION_ID = undefined; // The collection to which the capsule NFT belongs. Optional Parameter: Default is undefined.
		const IS_SOULBOUND = false; // If true, makes the Capsule NFT a Soulbound token. The default is false.

		const ipfsClient = new TernoaIPFS(new URL(IPFS_NODE_URL), IPFS_API_KEY);
		const keyring = await getKeyringFromSeed(SEED);

		const keys = {
			privateKey: "PRIVATE_PGP_KEY",
			publicKey: "PUBLIC_PGP_KEY",
		};

		const NFTFile = new File(
			[await fs.promises.readFile("FILE_NAME")],
			"FILE_NAME",
			{
				type: "FILE_TYPE",
			}
		);

		const nftMetadata = {
			title: "Nice souvenir",
			description: "This is my first Capsule NFT on Ternoa.",
		};

		const file1 = new File(
			[await fs.promises.readFile("FILE_NAME_1")],
			"FILE_NAME_1",
			{
				type: "FILE_TYPE_1",
			}
		);
		const file2 = new File(
			[await fs.promises.readFile("FILE_NAME_2")],
			"FILE_NAME_2",
			{
				type: "FILE_TYPE_2",
			}
		);

		const encryptedFile1 = await encryptFile(file1, "PUBLIC_PGP_KEY");
		const encryptedFile2 = await encryptFile(file2, "PUBLIC_PGP_KEY");

		const capsuleMetadata = {
			title: "(OPTIONAL) A secret stash.",
			description: "(OPTIONAL) This is my first Capsule NFT on Ternoa.",
		};

		const capsuleNftData = await mintCapsuleNFT(
			keyring,
			ipfsClient,
			keys,
			NFTFile,
			nftMetadata,
			[
				{
					encryptedFile: encryptedFile1,
					type: file1.type,
				},
				{
					encryptedFile: encryptedFile2,
					type: file2.type,
				},
			],
			capsuleMetadata,
			CLUSTER_ID,
			CAPSULE_NFT_ROYALTY,
			COLLECTION_ID,
			IS_SOULBOUND,
			WaitUntil.BlockInclusion
		);
		console.log(
			"The on-chain Capsule NFT id is: ",
			capsuleNftData.event.nftId
		);
	} catch (e) {
		console.error(e);
	}
};
```

This program uses the Ternoa-js library to mint a new Capsule NFT on the Ternoa blockchain. The function first sets several constants, including the owner's seed phrase, an IPFS node URL, an IPFS API key, a TEE enclave cluster ID, and various metadata about the NFT and capsule. It then creates an instance of the TernoaIPFS class, which provides access to the IPFS node, and generates a keyring from the seed phrase. The function reads two files from the file system, encrypts them with a given PGP key, and creates a new Capsule NFT with the mintCapsuleNFT function. The mintCapsuleNFT function takes several parameters, including the keyring, IPFS client, NFT and capsule metadata, and the encrypted files, and returns an object containing information about the newly created NFT, including its ID. The function logs this ID to the console upon successful completion. If any errors occur during the execution of the function, they are caught and logged into the console as well.

:::info

Use your own account by updating the `//TernoaTestAccount` with your account seed when retrieving the keyring from the example below.

:::

Here are detailed the `mintCapsuleNFT` helper parameters:

```markdown
`keyring`: the provided keyring (containing the address) will be used to sign the transaction and pay the execution fee.
`ipfsClient`: A TernoaIPFS class instance to interact and store metadata on IPFS.
`keys`: The PGP key pair (public and private keys) used to encrypt the file.
`nftFile`: File to upload as the preview of the encrypted NFT.
`nftMetadata`: NFT metadata (Title, Description).
`encryptedMedia`: The array containing all the Capsule NFT encrypted assets.
`capsuleMetadata`: Capsule NFT metadata (Title, Description).
`clusterId`: the TEE Cluster ID of enclaves used to store private key shares. The default is 0.
`royalty`: a number (in percentage between 0 and 100) to set the royalties taken by the owner for each NFT sale.
`collectionId`: an optional parameter. If you want your NFT to belong to a collection, add the collection id here otherwise keep it undefined.
`isSoulbound`: (boolean): when set to true, the NFT will be a soulbound NFT. The default is false.
`waitUntil`: WaitUntil defines at which point we want to get the results of the transaction execution: BlockInclusion or BlockFinalization.
```

The response returned is an object promise containing:

-   `event` - the Capsule NFT creation event (a combination of the **NFTCreatedEvent** & the **NFTConvertedToCapsuleEvent** returned by the Ternoa blockchain) with the following data:

```markdown
`nftId`: The ID of the Capsule NFT.
`owner`: The owner of the Capsule NFT.
`creator`: The creator of the Capsule NFT.
`offchainData`: The NFT off-chain data CID hash.
`capsuleOffchainData`: The Capsule NFT off-chain data CID hash.
`royalty`: The royalty fee set for the Capsule NFT.
`collectionId`: The ID of the collection to the Capsule NFT belongs.
`isSoulbound`: True if the Capsule NFT is soulbound. False if the NFT is not soulbound.
```

-   `clusterResponse` - the response of the TEE cluster which is an array of responses from the enclaves containing objects with the following data:

```markdown
`status`: The enclave key share storing status.
`description`: The enclave response description.
`isError`: True if the status is different from "STORESUCCESS".
`enclave_id`: The enclave ID where a private key share is stored.
`nft_id`: The ID of the Capsule NFT.
`owner_address`: The owner of the Capsule NFT.
`signer_address`: The temporary signer authentication message used to store all private key shares on the enclaves.
`signersig`: The signature of the 'signer_address' message by the owner of the Capsule NFT.
`data`: The data containing the share to store on the enclave.
`signature`: The signature of the data by the temporary signer account.
```

## Next

The next step will be getting the NFT data from the Ternoa Indexer using the NFT id just generated. Keep it and continue on the ["How to retrieve a Basic NFT"](/for-developers/guides/NFT/capsule-NFT/get-NFT) guide.

## Support

If you face any trouble, feel free to reach out to our community engineers in our [Discord](https://discord.gg/fUmBkPpnRu).
