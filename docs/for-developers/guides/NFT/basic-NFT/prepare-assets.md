---
sidebar_position: 1
sidebar_label: How to prepare Basic NFT assets
---

# How to prepare Basic NFT assets

Ternoa NFT are composed of two files: an asset file (e.g. image, video, music) and a metadata json file. The asset file CID is nested into the metadata file and both are stored on IPFS (Interplanetary File Systems) with their dedicated hashes.

IPFS (Interplanetary File Systems) is one of the solution we recommend to upload NFTs medias and other associated metadatas. Thus offchain datas are stored in a fully decentralized way and only the link to this metadata is stored on-chain as part of the NFT. This link is frequently a fingerprint called a cryptographic ID (e.g. `Qmf5RHhnUjSCfCN9d1Ee6sUWxe3Eqvogw1cTsssrxAxtPn`). IPFS files are accessible using those hashes.

Ternoa provides its own IPFS public nodes on different HTTP gateways based on the network environement:

- MAINNET: **ipfs-mainnet.trnnfr.com**
- ALPHANET: **ipfs-alphanet.trnnfr.com**

:::info
Please note that an _api-key_ is needed to store data on those gateways. Visit [IPFS Keymanager](https://ipfs-key-manager-git-dev-ternoa.vercel.app/) to get your API Key.
:::

## Off-Chain Metadata

An NFT is an unique ID. On-chain data contains this ID couple with additionnal important information like ownership, royalties and more. However medias and metadatas are stored off-chain for performance and flexibility. These data must be carefully written to guaranty a compatibility accross the tools and dApps of the ecosystem. [Ternoa Improvement Proposals](https://github.com/capsule-corp-ternoa/ternoa-proposals/tree/main/TIPs) (TIPs) propose structures adopted from ERC-1155 to ensure this compatibility.

Here below is the expected format for basic NFT:

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

## Ternoa IPFS Client

> Prerequisites:
>
> - [NodeJS v.14+](https://nodejs.org/en/download/) & NPM
> - Install and set up your editor of choice (for example Visual Studio Code [VSC])

An IPFS client is available on Ternoa-JS SDK to make IPFS upload simple with only one line of code.

Place any asset you want to use at the root of your project and use this code snippet by completing `FILE_NAME` & `FILE_TYPE`:

```typescript
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
    title: "Shining, a nice movie",
    description: "This is (not) my first Ternoa's NFT",
  };

  const { Hash } = await ipfsClient.storeNFT(file, nftMetadata);
  console.log("The off-chain metadata CID is ", Hash);
};
```

First the JPG image file named "shining.jpg" is read from the file system and wrapped in a specific `File` instance. The TernoaIPFS class is then used to create an IPFS client that connects to a specified IPFS node using a given API key. The metadata for the file is then defined in an object and passed to the `storeNFT` method of the client along with the `File` instance. The resulting `Hash` of the off-chain metadata is logged to the console.

The `storeNFT` method handles two IPFS uploads under the hood: a first one with the NFT media (e.g. the image) and a second one with the JSON metadata file, including the media's hash from the first upload response. This method also validates the metadata structure to ensure TIPs compatibility.
