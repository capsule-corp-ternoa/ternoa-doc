---
sidebar_position: 2
sidebar_label: Generate keys & Encrypt
---

# Generate keys & Encrypt

This section follows the first step to interact with the TEE, to store and secure private content on the Ternoa chain. We recommend reading the [**cluster section**](/for-developers/advanced-guides/tee/cluster) first, to familiarize yourself with the process of encrypting your content with a public key.

## How to generate keys and encrypt content on IPFS

### Generate some PGP keys

Here you can use the Ternoa helper

```typescript showLineNumbers
import { generatePGPKeys } from "ternoa-js";

const getPGPKeys = async () => {
  try {
    const { privateKey, publicKey } = await generatePGPKeys();
    console.log(privateKey, publicKey); // Output expected is two strings under the following fomat:
    // -----BEGIN PGP PRIVATE KEY BLOCK-----
    // xVgEZZgHdBYJKwYBBAHaRw8BAQdAeOzyPsxdJ9/s1FiYbE7pziJrING8EGhN
    // ...
    // U5n1IAjQkCvJsdrJBNYynTnMTBmrd079dMufBw===afDl
    // -----END PGP PRIVATE KEY BLOCK-----

    // -----BEGIN PGP PUBLIC KEY BLOCK-----
    // xjMEZZgHdBYJKwYBBAHaRw8BAQdAeOzyPsxdJ9/s1FiYbE7pziJrING8EGhN
    // ...
    // PjQP/lIzerB6OgD/SvxPeVOZ9SAI0JArybHayQTWMp05zEwZq3dO/XTLnwc==Ap5s
    // -----END PGP PUBLIC KEY BLOCK-----

    process.exit(0);
  } catch (error) {
    process.exit(1);
  }
};
```

### Encrypt content and store it on IPFS

:::info
We assume you are familiar with the Ternoa IPFS client. Use the Ternoa IPFS node endpoint, with a key generated from our [key generator](https://ipfs-key-manager-git-dev-ternoa.vercel.app/), or your own storage provider. Read more about the [Ternoa IPFS client](/for-developers/advanced-guides/ipfs). Read more about [storage options.](/for-developers/developer-tools/ipfs-quick-guide)
:::

The process of encryption requires a few steps: preparing your file (_do not forget to import File from the ternoa-js library_), preparing your metadata and generating your storage solution (here we use the Ternoa IPFS client).

Example using the `secretNftEncryptAndUploadFile()` helper, to encrypt the content of a Secret NFT.

```typescript showLineNumbers
import {
  TernoaIPFS,
  generatePGPKeys,
  initializeApi,
  secretNftEncryptAndUploadFile,
  File,
} from "ternoa-js";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const getPGPKeys = async () => {
  try {
    await initializeApi();
    // IPFS
    const IPFS_URL = process.env.IPFS_NODE_URL as string; // we recommand you to store the IPFS endpoint in an .env variable.
    const IPFS_API_KEY = process.env.IPFS_API_KEY as string; // we recommand you to store the IPFS key in an .env variable.
    const ipfsClient = new TernoaIPFS(new URL(IPFS_URL), IPFS_API_KEY);

    // GENERATE YOUR KEYS SET
    const keys = await generatePGPKeys();

    // PREPARE YOUR FILE
    // Do not forget to import File from the ternoa-js library
    const secretNFTFile = new File(
      [await fs.promises.readFile("SECRET_FILE.jpg")],
      "SECRET_FILE",
      {
        type: "image/jpg", //the FILE_TYPE in this exemple SECRET_FILE.jpg is of type "image/jpg",
      }
    );

    // OPTIONAL - PREPARE YOUR SECRET NFT AND/OR MEDIA METADATA
    // Optional metadata for the secret NFT
    const secretNftMetadata = {
      title: "(OPTIONAL) Secret NFT Title.",
      description: "(OPTIONAL) This is my first Secret NFT on Ternoa.",
    };

    // Optional metadata for the media of the secret NFT
    const secretMediaMetadata = {
      name: "(OPTIONAL) SECRET_FILE_NAME",
    };

    const { Hash: secretOffchainDataHash } =
      await secretNftEncryptAndUploadFile(
        secretNFTFile,
        keys.publicKey,
        ipfsClient,
        secretNftMetadata,
        secretMediaMetadata
      );
    console.log(
      `https://ipfs-mainnet.trnnfr.com/ipfs/${secretOffchainDataHash}`
    );

    // ...
    process.exit(0);
  } catch (error) {
    process.exit(1);
  }
};
```

Under the hood the `secretNftEncryptAndUploadFile()` executes the following code. It utilizes another user-friendly atomic helper,`encryptFile()`, that you can use at your convenience to encrypt the content of your Capsule, for example. You can simply replace the helper by this piece of code:

```typescript showLineNumbers
...
const encryptedFile = await encryptFile(secretNFTFile, keys.publicKey);
const { Hash: secretOffchainDataHash } = await ipfsClient.storeSecretNFT(
  encryptedFile,
  secretNFTFile.type,
  keys.publicKey,
  secretNftMetadata,
  secretMediaMetadata
);
console.log(
    `https://ipfs-mainnet.trnnfr.com/ipfs/${secretOffchainDataHash}`
);
...
```

The flow to encrypt the content of a Capsule NFT is quite similar.

Depending on the kind of NFT you want to create, wether a Capsule NFT or a Secret NFT, you will find the corresponding detailed code sections here:

- [How to prepare Secret NFT assets](/for-developers/guides/NFT/secret-NFT/prepare-assets)
- [How to prepare Capsule NFT assets](/for-developers/guides/NFT/capsule-NFT/prepare-assets)

Try to open the encrypted_media hash from the generated Secret NFT IPFS hash on https://ipfs-mainnet.trnnfr.com/ipfs/repalce-with-your-hash. You can see that the content is encrypted.

Now that your content is stored and encrypted, you can proceed to the final step to [secure your NFT on the TEE](/for-developers/advanced-guides/tee/store-on-tee).
