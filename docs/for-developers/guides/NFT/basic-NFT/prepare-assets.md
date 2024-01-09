---
sidebar_position: 1
sidebar_label: How to prepare Basic NFT assets
---

# How to prepare Basic NFT assets

A Ternoa NFT is composed of two files: an asset file (e.g. image, video, music) and a metadata JSON file. The asset file CID is nested into the metadata file and both are stored on IPFS (Interplanetary File Systems) with their dedicated hashes.

IPFS (Interplanetary File Systems) is one of the solutions we recommend to upload NFTs media and other associated metadata. Thus off-chain data are stored in a fully decentralized way and only the link to this metadata is stored on-chain as part of the NFT. This link is frequently a fingerprint called a cryptographic ID (e.g. `Qmf5RHhnUjSCfCN9d1Ee6sUWxe3Eqvogw1cTsssrxAxtPn`). IPFS files are accessible using those hashes.

Ternoa provides its own IPFS public nodes on different HTTP gateways based on the network environment:

- MAINNET: **ipfs-mainnet.trnnfr.com**
- ALPHANET: **ipfs-dev.trnnfr.com**

:::info
Please note that an _api-key_ is needed to store data on those gateways. Visit [IPFS Keymanager](https://ipfs-key-manager-git-dev-ternoa.vercel.app/) to get your API Key.
:::

## Off-Chain Metadata

An NFT is a unique ID. On-chain data contains this ID coupled with additional important information like ownership, royalties, and more. However, media and metadata are stored off-chain for performance and flexibility. These data must be carefully written to guarantee compatibility across the tools and dApps of the ecosystem. [Ternoa Improvement Proposals](https://github.com/capsule-corp-ternoa/ternoa-proposals/tree/main/TIPs) (TIPs) propose structures adopted from ERC-1155 to ensure this compatibility.

Here below is the expected format for basic NFT:

### Basic NFT

```json
{
  "title": "Title of the NFT",
  "description": "Description of the NFT",
  "image": "CID Hash of the media",
  "properties": {
    "media": {
      "hash": "CID Hash of the media",
      "type": "Type of the media (file format)",
      "size": "Size of the media"
    }
  }
}
```

## Ternoa IPFS Client

> Prerequisites:
>
> - [NodeJS v.14+](https://nodejs.org/en/download/) & NPM
> - Install and set up your editor of choice (for example Visual Studio Code [VSC])
> - [Install Ternoa-JS](/for-developers/get-started/install-ternoa-js#step-1-install-ternoa-js)

An IPFS client is available on Ternoa-JS SDK to make IPFS upload simple with only one line of code.

Place any asset you want to use at the root of your project and use this code snippet by completing _FILE_NAME_ & _FILE_TYPE_:

```typescript showLineNumbers
import fs from "fs";
import { TernoaIPFS, File } from "ternoa-js";

const main = async () => {
  const file = new File(
    [await fs.promises.readFile("FILE_NAME")],
    "FILE_NAME",
    {
      type: "FILE_TYPE",
    }
  );

  const ipfsClient = new TernoaIPFS(new URL("IPFS_NODE_URL"), "IPFS_API_KEY");

  const nftMetadata = {
    title: "NFT TITLE",
    description: "NFT DESCRIPTION",
  };

  const { Hash } = await ipfsClient.storeNFT(file, nftMetadata);
  console.log("The off-chain metadata CID hash is ", Hash);
};
```

First, the asset file is read from the file system and wrapped in a specific `File` instance imported from the Ternoa-JS library. The `TernoaIPFS` class is then used to create an IPFS client that connects to a specified IPFS node using a given API key. The metadata for the file is then defined in an object and passed to the `storeNFT` method of the client along with the `File` instance. The resulting `Hash` of the off-chain metadata is logged to the console.

The `storeNFT` method handles two IPFS uploads under the hood: a first one with the NFT media (e.g. the image) and a second one with the JSON metadata file, including the media's hash from the first upload response. This method also validates the metadata structure to ensure TIPs compatibility.

## Next

The next step will be the on-chain minting using the `Hash` previously generated. Keep it and continue on the ["How to mint a Basic NFT on-chain"](/for-developers/guides/NFT/basic-NFT/mint-NFT) guide.

## Support

If you face any trouble, feel free to reach out to our community engineers in our [Discord](https://discord.gg/fUmBkPpnRu).
