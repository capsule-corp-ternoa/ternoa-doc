---
sidebar_position: 4
sidebar_label: Browser, wallet & extension
---

# Creating a Secret NFT in a Browser Environment Without Keyring

This section provides a comprehensive guide on creating a Secret NFT on the Ternoa chain without using a keyring. To successfully follow this process, it is recommended that you have a basic understanding of the concepts explained step by step in the following pages:

- [**Introduction to TEE clusters**](/for-developers/advanced-guides/tee/cluster)
- [**Generate keys & Encryption**](/for-developers/advanced-guides/tee/encrpypt)
- [**Storing a private key on the Ternoa SGX Enclaves**](/for-developers/advanced-guides/tee/store-on-tee)

If this is your first time interacting with the Ternoa chain in a browser environment and using a wallet or extension to sign a transaction, it is advisable to begin with a simpler code example and read through this [section beforehand](/for-developers/advanced-guides/sign-without-keyring).

:::info
We also assume you are familiar with the Ternoa IPFS client. Use the Ternoa IPFS node endpoint, with a key generated from our [key generator](https://ipfs-key-manager-git-dev-ternoa.vercel.app/), or your own storage provider. Read more about the [Ternoa IPFS client](/for-developers/advanced-guides/ipfs). Read more about [storage options.](/for-developers/developer-tools/ipfs-quick-guide)
:::

## Utilizing Polkadot extension, Next.js, and TypeScript:

In the following code snippet, we will walk through a step-by-step process for a use case to create a Secret NFT on the chain. This involves using the @polkadot/extension-dapp and uploading your files and metadata to IPFS.

It's important to note that this solution is not the only option available. Feel free to choose any provider that best suits your dApp and adjust your code accordingly to match your technical stack.

This code snippet is specifically designed to function within a Next.js environment. Depending on Next.js server-side component rules, you may need to make slight adaptations when importing the @polkadot/extension-dapp extension library to work seamlessly in your JavaScript environment.

```typescript showLineNumbers
import { SecretNFTResponse } from "@/components/base/Forms/SecretNFT/types";
import {
  NFTCreatedEvent,
  NftMetadataType,
  SecretAddedToNFTEvent,
  TernoaIPFS,
  WaitUntil,
  createSecretNftTx,
  generatePGPKeys,
  getEnclaveHealthStatus,
  getFirstPublicClusterAvailable,
  getRawApi,
  prepareAndStoreKeyShares,
  query,
  secretNftEncryptAndUploadFile,
  submitTxBlocking,
} from "ternoa-js";

export const mintSecretNFT = async (
  address: string,
  nftFile: File,
  nftMetadata: NftMetadataType,
  secretNftFile: File,
  secretNftMetadata: NftMetadataType,
  ipfsClient: TernoaIPFS,
  royalty: number,
  collection: number | undefined,
  isSoulbound: boolean
): Promise<SecretNFTResponse> => {
  try {
    const clusterId = await getFirstPublicClusterAvailable();
    await getEnclaveHealthStatus(clusterId);

    console.log("Uploading content on IPFS.");

    const { privateKey, publicKey } = await generatePGPKeys();
    const { Hash: offchainDataHash } = await ipfsClient.storeNFT(
      nftFile,
      nftMetadata
    );
    const { Hash: secretOffchainDataHash } =
      await secretNftEncryptAndUploadFile(
        secretNftFile,
        publicKey,
        ipfsClient,
        secretNftMetadata
      );

    console.log(
      "USER_ACTION: Sign transaction with your extension to create your secret NFT."
    );

    const txHex = await createSecretNftTx(
      offchainDataHash,
      secretOffchainDataHash,
      royalty,
      collection,
      isSoulbound
    );

    const nonce = (
      (await query("system", "account", [address])) as any
    ).nonce.toNumber();

    const { web3FromAddress } = await import("@polkadot/extension-dapp");
    const injector = (await web3FromAddress(address)) as Record<string, any>;
    const signer = injector?.signer;

    const api = getRawApi();

    const signedTx = (
      await api.tx(txHex).signAsync(address, { nonce, signer })
    ).toHex();

    console.log("Submitting transaction to the Ternoa chain.");

    const { events, blockInfo, txHash } = await submitTxBlocking(
      signedTx,
      WaitUntil.BlockInclusion
    );

    const nftEvent = events.findEventOrThrow(NFTCreatedEvent);
    const secretNftEvent = events.findEventOrThrow(SecretAddedToNFTEvent);

    console.log(
      "USER_ACTION: Sign transaction with your extension to securize your content and upload key on Ternoa SGX clusters."
    );

    const teeRes = await prepareAndStoreKeyShares(
      privateKey,
      address,
      nftEvent.nftId,
      "secret",
      injector,
      clusterId
    );

    return {
      event: secretNftEvent,
      clusterResponse: teeRes,
      blockInfo,
      txHash,
    };
  } catch (error) {
    console.log(error);
    const errorDescription = `SECRET_NFT_MINT_ERROR: ${
      error instanceof Error ? error.message : JSON.stringify(error)
    }`;
    throw new Error(errorDescription);
  }
};
```

_We suggest breaking down certain portions of this function into multiple modular and reusable atomic functions. This example illustrates a comprehensive and complete workflow to enhance comprehension._
