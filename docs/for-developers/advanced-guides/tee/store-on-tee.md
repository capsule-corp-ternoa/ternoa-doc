---
sidebar_position: 3
sidebar_label: Store encrypted key to TEE
---

# Interacting with Ternoa SGX Enclaves

This section is the last step to _store and secure private content on the Ternoa chain_. Again, it is strongly recommended to read the first two sections, to familiarize yourself with the key concepts and steps:

- [**Introduction to TEE clusters**](/for-developers/advanced-guides/tee/cluster)
- [**Generate keys & Encryption**](/for-developers/advanced-guides/tee/encrpypt)

Now the assets are prepared and content is uploaded on IPFS. We can handle the last two steps of the process: **Creating the NFT** with encrypted content and **store the private key on our TEE cluster**.

## Creating the Secret NFT or the Capsule NFT

Depending of the use-case you are in, creating a Secret or a Capsule NFT can be done by different way using the blockchain extinsics.

<details className="toggle">
    <summary>Creating a Capsule NFT with extrinsics</summary>
    <ul>
        <li>createCapsule(): If your dApp can access the SEED of the signer to create the Capsule NFT.</li>
        <li>createCapsuleTx(): If your dApp relies on a wallet or extension to sign and create the Capsule NFT. You will need to manually handle the signature and on-chain submission.</li>
        <li>You can also convert an existing NFT to a Capsule NFT using one of the two following helpers: convertNftToCapsule() or convertNftToCapsuleTx(), depending on whether the signer can be provided from a SEED or through a wallet/extension.</li>
    </ul>
</details>

<details className="toggle">
    <summary>Creating a Secret NFT with extrinsics</summary>
    <ul>
        <li>createSecretNft(): If your dApp can access the SEED of the signer to create the Secret NFT.</li>
        <li>createSecretNftTx(): If your dApp relies on a wallet or extension to sign and create the Secret NFT. You will need to manually handle the signature and on-chain submission.</li>
        <li>You can also convert an existing NFT to a Secret NFT using one of the two following helpers: addSecretToNft() or addSecretToNftTx(), depending on whether the signer can be provided from a SEED or through a wallet/extension.</li>
    </ul>
</details>

_To maintain consistency with the first steps, we will continue by building a Secret NFT, retrieving the keyring directly from the SEED._

We are about to add a couple of pieces of code to our `encryptAndStoreContent()` function implemented in [Generate keys & Encrypt](/for-developers/advanced-guides/tee/encrpypt):

- Set and upload content for the public part of the NFT.
- Submit the extrinsic with the off-chain & secret off-chain metadata stored on IPFS.

Copy and paste the following code after the log of the _secretOffchainDataHash_ in the [encryptAndStoreContent function](/for-developers/advanced-guides/tee/encrpypt#encrypt-content-and-store-it-on-ipfs). Don't forget to add imports and update the SEED argument in the `getKeyringFromSeed()` function.

```typescript showLineNumbers
// ...
// PREPARE AND UPLOAD TO IPFS THE NFT PUBLIC METADATA
const nftFile = new File(
  [await fs.promises.readFile("PUBLIC_FILE.jpg")],
  "PUBLIC_FILE",
  {
    type: "image/jpg",
  }
);

const nftMetadata = {
  title: "Public NFT Title",
  description: "Public description of your NFT",
};

const { Hash: offchainDataHash } = await ipfsClient.storeNFT(
  nftFile,
  nftMetadata
);
console.log(
  `PUBLIC HASH: https://ipfs-dev.trnnfr.com/ipfs/${offchainDataHash}`
);

// RETRIEVE THE KEYRING FROM THE SEED
const keyring = await getKeyringFromSeed("UPDATE_WITH_YOUR_SEED");

// SUBMIT EXTRINSIC TO CHAIN
const secretNftEvent = await createSecretNft(
  offchainDataHash,
  secretOffchainDataHash,
  0, // Royalty
  undefined, // Collection
  false, // Soulbound
  keyring, // Signer account
  WaitUntil.BlockInclusion // Execution preference
);

console.log(secretNftEvent);
//...
```

## Send the private key to the SGX Enclaves

Now that the Secret NFT is created, and its content is encrypted and stored, the last step consists of securing the private key. We want our **private key** to be split into five Shamir shares, submitted, and stored in each of the five enclaves of an [SGX cluster.](/for-developers/advanced-guides/tee/cluster).

No worries, we've got you covered again with the most user-friendly helper ever: **`prepareAndStoreKeyShares()`**

To get a deep understanding of how this helpers work, we invite you to look a the Ternoa JS SDK code [here](https://github.com/capsule-corp-ternoa/ternoa-js/blob/main/src/helpers/nft.ts#L73).

This helper, behind the scenes, does the following tasks: it creates a temporary and derived account based on the transaction signer, eliminating the need to sign multiple key share submissions. It generates the Shamir shares from the private key, organizes the shares into a formatted payload, and then uploads them to the TEE Cluster enclaves. First, let's examine the code in detail before we delve into the upload process.

Once again copy and past the following code after the **`secretNftEvent`** response implemented earlier.

```typescript showLineNumbers
// ...

// GET THE PUBLIC CLUSTER ID AND VERIFY CLUSTER STATUS
const CLUSTER_ID = await getFirstPublicClusterAvailable();
if (!CLUSTER_ID) throw new Error("CLUSTER ID IS UNDEFINED");

await getEnclaveHealthStatus(CLUSTER_ID);

// SEND PRIVATE KEY TO CLUSTER
const teeRes = await prepareAndStoreKeyShares(
  keys.privateKey,
  keyring,
  secretNftEvent.nftId,
  "secret",
  undefined,
  CLUSTER_ID
);

console.log("The TEE/SGX Cluster response: ", teeRes);
console.log(
  "Oh yeah! We just created a secret NFT with encrypted content and secured our private key on the SGX enclaves."
);
```

About the `prepareAndStoreKeyShares()` arguments:

- **privateKey**: The private key to be split with Shamir algorithm.
- **signer**: Provide the account owner of the private key to split either with the keyring or with the account address only (string).
- **nftId**: The Capsule NFT id or Secret NFT id to link to the private key.
- **kind**: The kind of nft linked to the key to upload: "secret" or "capsule".
- **extensionInjector**: (Optional) If the signer is retrived from an extension to sign the transaction with a wallet you will need to provide the injector. We recommand Polkadot extention: object must have a key named "signer". _In case your transaction is signed using the SEED to create your keyring like we did in our exemple, you can set this one as undefined._
- **clusterId**: (Optional)The TEE Cluster id retrived with `getFirstPublicClusterAvailable()`.

## About the Shamir Shares Upload on SGX machines

**Advanced concept:** The **`prepareAndStoreKeyShares()`** helper relies on the **`teeKeySharesStore()`** function to upload the Shamir shares to a cluster. We recommend taking a quick look at _how it works [here](https://github.com/capsule-corp-ternoa/ternoa-js/blob/main/src/helpers/tee.ts#L371)_. Additionally, `teeKeySharesStore()` functions as an atomic helper that you may need to use in case of failures during the upload of the shares to the SGX enclaves. This helper already includes a retry mechanism, with the default set to 3 retries. The last two optional arguments are **_`nbRetry`_** and **_`enclavesIndex`_**. These options allow you to specify the number of retries you want to perform and an array of index IDs. The **_`payloads`_** argument expects you to provide the formatted payloads, similar to the ones generated in the **`prepareAndStoreKeyShares()`** function. In case you encounter failures from the enclaves in response to **`prepareAndStoreKeyShares()`**, you can store the payloads and submit them again later, providing the index of the failed enclave in the **_`enclavesIndex`_** argument to only retry storing the failed uploads from the previous attempt.

_**Exemple**: Enclave 3 and Enclave 4 in cluster 0 failed to perform the upload, while enclaves 1, 2, and 5 succeeded. You can store the complete payloads and resubmit them by specifying **`[2, 3]`** as the **`enclavesIndex`** agrument._
