---
sidebar_position: 2
sidebar_label: IPFS
---

# IPFS

## Overview

IPFS (Interplanetary File Systems) is one of the solution we recommend to upload NFTs medias and other associated metadatas. Thus offchain datas are stored in a fully decentralized way and only the link to this metadata is stored on-chain as part of the NFT. This link is frequently a fingerprint called a cryptographic hash ID (e.g. `Qmf5RHhnUjSCfCN9d1Ee6sUWxe3Eqvogw1cTsssrxAxtPn`). IPFS files are accessible using those hashes.

On Ternoa NFTs are composed of two files: an asset file (e.g. image, video, music) and a metadata json file. The asset file hash is nested into the metadata file and both are stored on IPFS with their dedicated hashes.

Ternoa provides its own IPFS public nodes on different HTTP gateways based on the network environement:

- MAINNET: **ipfs-mainnet.trnnfr.com**
- ALPHANET: **ipfs-alphanet.trnnfr.com**

Please note that an _api-key_ is needed to store data on those gateways.

## Off-Chain Metadata

An NFT is an unique ID. On-chain data contains this ID couple with additionnal important information like ownership, royalties and more. However medias and metadatas are stored off-chain for performance and flexibility. These data must be carefully written to guaranty a compatibility accross the tools and dApps of the ecosystem.[Ternoa Improvement Proposal](https://github.com/capsule-corp-ternoa/ternoa-proposals/tree/main/TIPs) (TIPs) propose structures adopted from ERC-1155 to ensure this compatibility.

Here below are listed the expected format for each feature:

### Basic NFT

```json
{
  "title": "Title of the NFT",
  "description": "Description of the NFT",
  "image": "Hash of the media",
  "properties": {
    "media": {
      "hash": "Hash of the media",
      "type": "Type of the media (file format)",
      "size": "Size of the media"
    }
  }
}
```

### Secret NFT

```json
{
  "title": "(OPTIONAL) Title of the Secret NFT",
  "description": "(OPTIONAL) Description of the Secret NFT",
  "properties": {
    "encrypted_media": {
      "hash": "Hash of the encrypted media",
      "type": "Type of the encrypted media (file format)",
      "size": "Size of the encrypted media",
      "name": "(OPTIONAL) Name of the encrypted media",
      "description": "(OPTIONAL) Description of the encrypted media"
    },
    "public_key_of_nft": "Public key associated with the Secret NFT"
  }
}
```

### Collection

```json
{
  "name": "Name of the collection",
  "description": "Description of the collection",
  "banner_image": "Hash of the collection's banner image",
  "profile_image": "Hash of the collection's profile image"
}
```

### Marketplace

```json
{
  "name": "Name of the marketplace",
  "logo": "Hash of the marketplace's logo"
}
```

## Ternoa IPFS Client

An IPFS client is available on ternoa-js SDK to make IPFS upload simple with only one line of code.

Here is an example uploading an image "shining.jpg" from the movie:

```typescript
import { TernoaIPFS, File } from "ternoa-js";

const main = async () => {
  const file = new File(
    [await fs.promises.readFile("shining.jpg")],
    "shining.jpg",
    {
      type: "image/jpg",
    }
  );

  const ipfsClient = new TernoaIPFS(new URL("IPFS_NODE_URL"), "IPFS_API_KEY");

  const nftMetadata = {
    title: "Shining, a nice movie",
    description: "This is (not) my first Ternoa's NFT",
  };

  const { Hash } = await ipfsClient.storeNFT(file, nftMetadata);
  console.log("The off-chain metadata hash is ", Hash);
};
```

First the JPG image file named "shining.jpg" is read from the file system and wrapped in a specific `File` instance. The TernoaIPFS class is then used to create an IPFS client that connects to a specified IPFS node using a given API key. The metadata for the file is then defined in an object and passed to the `storeNFT` method of the client along with the `File` instance. The resulting `Hash` of the off-chain metadata is logged to the console.

The `storeNFT` method handles two IPFS uploads under the hood: a first one with the NFT media (e.g. the image) and a second one with the JSON metadata file, including the media's hash from the first upload response. This method also validates the metadata structure to ensure TIPs compatibility.

Additional methods are provided to handle secret NFTs, collections and marketplace. They worked in the same manner and are respectively: `storeSecretNFT`, `storeCollection` and `storeMarketplace`.
