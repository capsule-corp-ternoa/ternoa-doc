---
sidebar_position: 1
sidebar_label: How to prepare Capsule NFT assets
---

# How to prepare Capsule NFT assets

A Ternoa Capsule NFT is a new kind of token that allows users to store unlimited confidential data transferable on time. Only the current owner of the Capsule NFT has access to the encrypted data at any given time. The content of a Capsule NFT can be updated at any time by the owner as opposed to Basic NFT and Secret NFT.

There are two ways to create a Capsule NFT: either by extending an existing Basic NFT or by creating a new Capsule NFT from scratch. In both cases, you will need to [prepare the Basic NFT assets](/for-developers/guides/NFT/basic-NFT/prepare-assets) beforehand.

A Ternoa Capsule NFT comprises additional files: several asset files (such as an image, video, or music file) and a metadata JSON file for the capsule. To ensure maximum security and exclusivity, asset files must be encrypted, and the encrypted files are nested within the metadata file. Both files are stored on IPFS (Interplanetary File Systems) with unique hashes dedicated to each file.

IPFS (Interplanetary File Systems) is one of the solutions we recommend to upload NFTs media and other associated metadata. Thus off-chain data are stored in a fully decentralized way and only the link to this metadata is stored on-chain as part of the NFT. This link is frequently a fingerprint called a cryptographic ID (e.g. `Qmf5RHhnUjSCfCN9d1Ee6sUWxe3Eqvogw1cTsssrxAxtPn`). IPFS files are accessible using those hashes.

Ternoa provides its own IPFS public nodes on different HTTP gateways based on the network environment:

-   MAINNET: **ipfs-mainnet.trnnfr.com**
-   ALPHANET: **ipfs-alphanet.trnnfr.com**

:::info

Please note that an _api-key_ is needed to store data on those gateways. Visit [IPFS Keymanager](https://ipfs-key-manager-git-dev-ternoa.vercel.app/) to get your API Key.

:::

## Off-Chain Metadata

An NFT is a unique ID. On-chain data contains this ID coupled with additional important information like ownership, royalties, and more. However, media and metadata are stored off-chain for performance and flexibility. These data must be carefully written to guarantee compatibility across the tools and dApps of the ecosystem. [Ternoa Improvement Proposals](https://github.com/capsule-corp-ternoa/ternoa-proposals/tree/main/TIPs) (TIPs) propose structures adopted from ERC-1155 to ensure this compatibility.

Here below is the expected format for capsule NFT:

### Capsule NFT

```json
{
  "title": "(OPTIONAL) Title of the Capsule NFT",
  "description": "(OPTIONAL) Description of the Capsule NFT",
  "properties": {
    "encrypted_media": [
      {
        "hash": "CID Hash of the encrypted media",
        "type": "Type of the encrypted media (file format)",
        "size": "Size of the encrypted media",
        "name": "(OPTIONAL) Name of the encrypted media",
        "description": "(OPTIONAL) Description of the encrypted media"
      },
      ...
    ],
    "public_key_of_nft": "Public key associated with the Capsule NFT"
  }
}
```

## Ternoa IPFS Client

> Prerequisites:
>
> -   [NodeJS v.14+](https://nodejs.org/en/download/) & NPM
> -   Install and set up your editor of choice (for example Visual Studio Code [VSC])
> -   [Install Ternoa-JS](/for-developers/get-started/install-ternoa-js#step-1-install-ternoa-js)

An IPFS client is available on Ternoa-JS SDK to make IPFS upload simple with only one line of code.

Place any assets you want to use at the root of your project and use the following code snippet by completing _FILE_NAME_ & _FILE_TYPE_. A _PUBLIC_PGP_KEY_ is also required to encrypt assets before uploading them to IPFS.

```typescript showLineNumbers
import fs from "fs";
import { encryptFile, TernoaIPFS, File } from "ternoa-js";

const main = async () => {
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

	const ipfsClient = new TernoaIPFS(new URL("IPFS_NODE_URL"), "IPFS_API_KEY");

	const capsuleMetadata = {
		title: "(OPTIONAL) A secret stash.",
		description: "(OPTIONAL) This is my first Capsule NFT on Ternoa.",
	};

	const { Hash } = await ipfsClient.storeCapsuleNFT(
		keys.publicKey,
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
		capsuleMetadata
	);
	console.log("The off-chain metadata CID hash is ", Hash);
};
```

First, both asset files are read from the file system and wrapped in a specific `File` instance imported from the Ternoa-JS library. The `encryptFile` function is used to encrypt files using a specified public PGP key. The `TernoaIPFS` class is then used to create an IPFS client that connects to a specified IPFS node using a given API key. The metadata for the capsule is then defined in an object and passed to the `storeCapsuleNFT` method of the client along with the encrypted file, the file type, and the public PGP key. The resulting `Hash` of the off-chain metadata is logged to the console.

The `storeCapsuleNFT` method handles two IPFS uploads under the hood: a first one with the NFT media (e.g. the image) and a second one with the JSON metadata file, including the media's hash from the first upload response. This method also validates the metadata structure to ensure TIPs compatibility.

:::info

You can generate a PGP key pair using the `generatePGPKeys` helper from Ternoa-JS.

:::

## Next

The next step will be the on-chain minting using `Hash` previously generated. Keep it and continue on the ["How to mint a Capsule NFT on-chain"](/for-developers/guides/NFT/capsule-NFT/mint-NFT) guide.

## Support

If you face any trouble, feel free to reach out to our community engineers in our [Discord](https://discord.gg/fUmBkPpnRu).
