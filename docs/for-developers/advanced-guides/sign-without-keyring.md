---
sidebar_position: 1
sidebar_label: Sign a tx without keyring
---

# How to sign a transaction without keyring in a browser environment

The full transaction submitting process can only be achieved after its signature. It means that before submitting a transaction to the chain, a third party, we will called _"a signer"_ needs to sign the transaction to validate and register the transaction on the chain and pay the transaction fees.

If you already read some examples from the Guides section, you went through a parameter used in most of the functions called: **a Keyring**. The Keyring is responsible for managing a set of keypairs we use to sign the transaction.

If we use the keyring in our example to focus on the content we want to demonstrate, most real dApp use cases are different. Unless in certain circumstances, retrieving the keyring from seed is not a good practice you should include in your project and not something a dApp user will appreciate. You should neither ask nor provide a seed phrase unless it is completely riskless.

So how to sign a transaction without using the keyring retrieved from a seed phrase in a browser environment?

## Using a browser extension provider:

In the code snippet below, we will step by step cover a signing use-case to create a basic NFT on the chain using the @polkadot/extension-dapp and uploading your File and Metadata on IPFS.

Please, note that this solution is not the only one. **Feel free to use any provider that would suit best your dApp.**

_This code snipped is designed to work in a **Next-js environment**. According to Next-js server-side components rules, the import of the @polkadot/extension-dapp extension library might need to be slightly adapted to work in your javascript environment._

```typescript showLineNumbers
import {
  checkTransactionSuccess,
  createNftTx,
  Errors,
  getRawApi,
  NftMetadataType,
  query,
  submitTxBlocking,
  TernoaIPFS,
  WaitUntil,
  File,
  NFTCreatedEvent,
} from "ternoa-js";

export const createAndSignNFT = async (
  file: File,
  metadata: NftMetadataType,
  ipfsClient: TernoaIPFS,
  address: string
) => {
  try {
    //1 - Store the File and Metadata on IPFS
    const { Hash } = await ipfsClient.storeNFT(file, metadata);
    //2 - generate tx to sign
    const txHex = await createNftTx(Hash);

    //3.1 - Generate a nonce
    const nonce = (
      await query("system", "account", [address])
    ).nonce.toNumber();
    //3.2- Connect to the extension you want to use to get an injector (here we use directly Polkadot extension)
    const { web3FromAddress } = await import("@polkadot/extension-dapp");
    const injector = await web3FromAddress(address);
    const signer = injector?.signer;

    //4.1 - Retrieve Ternoa API
    const api = getRawApi();
    //4.2- Sign transaction using both the nonce and the signer
    const signedTx = (
      await api.tx(txHex).signAsync(address, { nonce, signer })
    ).toHex();

    //5.1 - Submit the signed transaction
    const { events } = await submitTxBlocking(
      signedTx,
      WaitUntil.BlockInclusion
    );
    //5.2 - Return the filtered NFTCreatedEvent
    return events.findEventOrThrow(NFTCreatedEvent);
  } catch (error) {
    console.log(error);
  }
};
```
