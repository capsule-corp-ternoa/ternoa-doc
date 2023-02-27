---
sidebar_position: 1
sidebar_label: How to prepare Collection assets
---

# How to prepare Collection assets

A Ternoa Collection is composed of three files: a profile picture image, a banner image and a metadata json file. The image files CID is nested into the metadata file and all are stored on IPFS (Interplanetary File Systems) with their dedicated hashes.

IPFS (Interplanetary File Systems) is one of the solution we recommend to upload NFTs medias and other associated metadatas. Thus offchain data are stored in a fully decentralized way and only the link to this metadata is stored on-chain as part of the NFT. This link is frequently a fingerprint called a cryptographic ID (e.g. `Qmf5RHhnUjSCfCN9d1Ee6sUWxe3Eqvogw1cTsssrxAxtPn`). IPFS files are accessible using those hashes.

Ternoa provides its own IPFS public nodes on different HTTP gateways based on the network environement:

- MAINNET: **ipfs-mainnet.trnnfr.com**
- ALPHANET: **ipfs-alphanet.trnnfr.com**

:::info
Please note that an _api-key_ is needed to store data on those gateways. Visit [IPFS Keymanager](https://ipfs-key-manager-git-dev-ternoa.vercel.app/) to get your API Key.
:::

## Off-Chain Metadata

A collection has a unique ID. On-chain data contains this ID couple with additionnal important information like ownership. However medias and metadatas are stored off-chain for performance and flexibility. These data must be carefully written to guaranty a compatibility accross the tools and dApps of the ecosystem. [Ternoa Improvement Proposals](https://github.com/capsule-corp-ternoa/ternoa-proposals/tree/main/TIPs) (TIPs) propose structures adopted from ERC-1155 to ensure this compatibility.

Here below is the expected format for collection:

### Collection

```json
{
  "name": "Name of the collection",
  "description": "Description of the collection",
  "banner_image": "Hash of the collection's banner image",
  "profile_image": "Hash of the collection's profile image"
}
```

## Ternoa IPFS Client

> Prerequisites:
>
> - [NodeJS v.14+](https://nodejs.org/en/download/) & NPM
> - Install and set up your editor of choice (for example Visual Studio Code [VSC])
> - [Install Ternoa-JS](/for-developers/get-started/install-ternoa-js#step-1-install-ternoa-js)

An IPFS client is available on Ternoa-JS SDK to make IPFS upload simple with only one line of code.

Place any asset you want to use at the root of your project and use this code snippet by completing _PROFILE_PICTURE_FILE_NAME_, _BANNER_FILE_NAME_, _PROFILE_PICTURE_FILE_TYPE_ & _BANNER_FILE_TYPE_:

```typescript showLineNumbers
import fs from "fs";
import { TernoaIPFS, File } from "ternoa-js";

const main = async () => {
  const profilePicture = new File(
    [await fs.promises.readFile("_PROFILE_PICTURE_FILE_NAME_")],
    "_PROFILE_PICTURE_FILE_NAME_",
    {
      type: "_PROFILE_PICTURE_FILE_TYPE_",
    }
  );

  const bannerPicture = new File(
    [await fs.promises.readFile("_BANNER_FILE_NAME_")],
    "_BANNER_FILE_NAME_",
    {
      type: "_BANNER_FILE_TYPE_",
    }
  );

  const ipfsClient = new TernoaIPFS(new URL("IPFS_NODE_URL"), "IPFS_API_KEY");

  const collectionMetadata = {
    name: "Collection TITLE",
    description: "Collection DESCRIPTION",
  };

  const { Hash } = await ipfsClient.storeCollection(
    profilePicture,
    bannerPicture,
    collectionMetadata
  );
  console.log("The off-chain metadata CID hash is ", Hash);
};
```

First both image files are read from the file system and wrapped in a specific `File` instance imported from the Ternoa-JS library. The `TernoaIPFS` class is then used to create an IPFS client that connects to a specified IPFS node using a given API key. The metadata for both files is then passed to the `storeCollection` method of the client along with the `File` instance. The resulting `Hash` of the off-chain metadata is logged to the console.

The `storeCollection` method handles three IPFS uploads under the hood: a first one with the collection profile picture, a second one with the collection banner picture and a third one with the JSON metadata file, including the picture hashes from the two first upload responses. This method also validates the metadata structure to ensure TIPs compatibility.

## Next

Next step will be the on-chain minting using `Hash` previously generated. Keep it and continue on the ["How to mint a Collection on-chain"](/for-developers/guides/collection/create-collection/mint-collection) guide.

## Support

If you face any trouble, feel free to reach out to our community engineers in our [Discord](https://discord.gg/fUmBkPpnRu).
