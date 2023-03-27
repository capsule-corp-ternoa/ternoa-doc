---
sidebar_position: 1
sidebar_label: How to mint a Secret NFT on-chain
---

# How to mint a Secret NFT on-chain

## Prerequisites

Before getting started, make sure you have the following ready:

1. Create a [Ternoa account](/for-developers/get-started/create-account) with [Alphanet CAPS](/for-developers/get-started/create-account#step-2-get-some-free-test-caps-tokens)
2. Install and set up your editor of choice (we will use Visual Studio Code [VSC] in this tutorial)
3. Install [NodeJS v.14+](https://nodejs.org/en/download/) & NPM
4. [Install & initialize Ternoa-JS](/for-developers/get-started/install-ternoa-js)

## Minting a Secret NFT on-chain using Ternoa-JS

In order to create an NFT on the Ternoa chain, Ternoa-JS provides you with a `mintSecretNFT` helper to do so.

:::info
Please note that an _api-key_ is needed to store data on Ternoa IPFS gateways. Visit [IPFS Keymanager](https://ipfs-key-manager-git-dev-ternoa.vercel.app/) to get your API Key.
:::

```typescript showLineNumbers
import fs from "fs";
import {
  getKeyringFromSeed,
  mintSecretNFT,
  File,
  TernoaIPFS,
  WaitUntil,
} from "ternoa-js";

const main = async () => {
  try {
    const ipfsClient = new TernoaIPFS(new URL("IPFS_NODE_URL"), "IPFS_API_KEY");
    const keyring = await getKeyringFromSeed("//TernoaTestAccount");

    const CLUSTER_ID = 0; // The cluster of TEE enclaves used to store private key shares
    const SECRET_NFT_ROYALTY = 10; // Percentage of all second sales that the secret NFT creator will receive - 10%.
    const COLLECTION_ID = undefined; // The collection to which the secret NFT belongs. Optional Parameter: Default is undefined.
    const IS_SOULBOUND = false; // If true, makes the Secret NFT a Soulbound token. Default is false.

    const NFTFile = new File(
      [await fs.promises.readFile("FILE_NAME")],
      "FILE_NAME",
      {
        type: "FILE_TYPE",
      }
    );
    const secretNFTFile = new File(
      [await fs.promises.readFile("SECRET_FILE_NAME")],
      "SECRET_FILE_NAME",
      {
        type: "SECRET_FILE_TYPE",
      }
    );

    const nftMetadata = {
      title: "Nice souvenir",
      description: "This is my first Secret NFT on Ternoa.",
    };

    const secretNftMetadata = {
      title: "(OPTIONAL) Something strong.",
      description: "(OPTIONAL) This description is public.",
    };

    const secretNftData = await mintSecretNFT(
      NFTFile,
      nftMetadata,
      secretNFTFile,
      secretNftMetadata,
      ipfsClient,
      keyring,
      CLUSTER_ID,
      SECRET_NFT_ROYALTY,
      COLLECTION_ID,
      IS_SOULBOUND,
      WaitUntil.BlockInclusion
    );
    console.log("The on-chain Secret NFT id is: ", secretNftData.event.nftId);
  } catch (e) {
    console.error(e);
  }
};
```

This program uses the Ternoa-js library to mint a new Secret NFT on the Ternoa blockchain. The program first creates an instance of the TernoaIPFS class that connects to a specified IPFS node using a given API key. This instance allows the user to interact with the IPFS network and store NFT metadata. Then the program retrieves a keyring to sign the on-chain minting transaction. It also sets various options such as the cluster ID and royalty percentage for the Secret NFT creator. The program then creates a new instance of the File class for both the public file and the secret file with their respective filenames and file types. The program sets the metadata for the NFT and secret NFT and finally calls the mintSecretNFT function with the necessary parameters, which mints the new Secret NFT and returns its ID, printed to the console. If there is an error during the execution of the program, it will be caught by the catch block and logged to the console.

:::info

Use your own account by updating the `//TernoaTestAccount` with your account seed when retrieving the keyring from the example below.

:::

Here are detailed the `mintSecretNFT` helper parameters:

```markdown
`NFTFile`: File to upload as the preview of the encrypted NFT.
`nftMetadata`: NFT metadata (Title, Description).
`secretNFTFile`: File to encrypt and then upload on IPFS.
`secretNftMetadata`: Secret NFT metadata (Title, Description).
`ipfsClient`: A TernoaIPFS class instance to interact and store metadata on IPFS.
`keyring`: the provided keyring (containing the address) will be used to sign the transaction and pay the execution fee.
`clusterId`: the TEE Cluster ID of enclaves used to store private key shares. Default is 0.
`royalty`: a number (in percentage between 0 an 100) to set the royalties taken by the owner for each NFT sale.
`collectionId`: an optional parameter. If you want your NFT to belong to a collection, add the collection id here otherwise keep it undefined.
`isSoulbound`: (boolean): when set to true, the NFT will be a soulbound NFT. Default is false.
`waitUntil`: WaitUntil define at which point we want to get the results of the transaction execution: BlockInclusion or BlockFinalization.
```

The response returned is an object promise containing:

- `event` - the Secret NFT creation event (a combinaison of the **NFTCreatedEvent** & the **SecretAddedToNFTEvent** returned by the Ternoa blockchain) with the following data:

```markdown
`nftId`: The ID of the Secret NFT.
`owner`: The owner of the Secret NFT.
`creator`: The creator of the Secret NFT.
`offchainData`: The NFT off-chain data CID hash.
`secretOffchainData`: The Secret NFT off-chain data CID hash.
`royalty`: The royalty fee set for the Secret NFT.
`collectionId`: The ID of the collection the Secret NFT belongs.
`isSoulbound`: True if the Secret NFT is soulbound. False if the NFT is not soulbound.
```

- `clusterResponse` - the response of the TEE cluster which is an array of enclaves responses that are objects with the following data:

```markdown
`status`: The enclave key share storing status.
`description`: The enclave response description.
`isError`: True if status is different from "STORESUCCESS".
`enclave_id`: The enclave ID where a private key share is stored.
`nft_id`: The ID of the Secret NFT.
`owner_address`: The owner of the Secret NFT.
`signer_address`: The temporary signer authentication message used to store all private key shares on the enclaves.
`signersig`: The signature of the 'signer_address' message by the owner of the Secret NFT.
`data`: The data containing the share to store on the enclave.
`signature`: The signature of the data by the temporary signer account.
```

## Next

Next step will be getting the NFT data from the Ternoa Indexer using the NFT id just generated. Keep it and continue on the ["How to retrieve a Basic NFT"](/for-developers/guides/NFT/basic-NFT/get-NFT) guide.

## Support

If you face any trouble, feel free to reach out to our community engineers in our [Discord](https://discord.gg/fUmBkPpnRu).
