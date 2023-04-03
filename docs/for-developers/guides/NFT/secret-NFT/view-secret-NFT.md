---
sidebar_position: 3
sidebar_label: How to decrypt a Secret NFT
---

# How to decrypt a Secret NFT

## Prerequisites

Before getting started, make sure you have the following ready:

1. Create a [Ternoa account](/for-developers/get-started/create-account) with [Alphanet CAPS](/for-developers/get-started/create-account#step-2-get-some-free-test-caps-tokens)
2. Install and set up your editor of choice (we will use Visual Studio Code [VSC] in this tutorial)
3. Install [NodeJS v.14+](https://nodejs.org/en/download/) & NPM
4. [Install & initialize Ternoa-JS](/for-developers/get-started/install-ternoa-js)

## Decrypting a Secret NFT using Ternoa-JS

To decrypt a Secret NFT from the Ternoa chain, Ternoa-JS provides you with a `viewSecretNFT` helper to do so. It returns a string promise containing the decrypted base 64 file.

```typescript showLineNumbers
import { getKeyringFromSeed } from "./account";
import { viewSecretNFT, TernoaIPFS } from "./helpers";

const main = async () => {
	try {
		const SEED = "//TernoaTestAccount"; // The NFT owner seed phrase.
		const IPFS_NODE_URL = "IPFS_NODE_URL"; // The IPFS node used.
		const IPFS_API_KEY = "IPFS_API_KEY"; // The IPFS node API KEY if required.
		const CLUSTER_ID = 0; // The cluster of TEE enclaves used to store private key shares.
		const NFT_ID = 0; // The Secret NFT ID.

		const ipfsClient = new TernoaIPFS(new URL(IPFS_NODE_URL), IPFS_API_KEY);
		const keyring = await getKeyringFromSeed(SEED);

		const decryptedBase64Secret = await viewSecretNFT(
			NFT_ID,
			ipfsClient,
			keyring,
			"OWNER",
			CLUSTER_ID
		);
		console.log(
			"The secret asset base 64 format is: ",
			decryptedBase64Secret
		);
	} catch (e) {
		console.error(e);
	}
};
```

The program starts defining some required variables such as **SEED**, **IPFS_NODE_URL**, **IPFS_API_KEY**, **CLUSTER_ID**, and **NFT_ID**. It then creates a new instance of `TernoaIPFS` using the IPFS node's URL and API key. It then uses `getKeyringFromSeed` function to retrieve the keyring from a provided seed phrase, and finally calls the `viewSecretNFT` function to decrypt a Secret NFT with the given ID using the keyring, IPFS client, and cluster-ID. The decrypted base64 format of the Secret NFT is then logged to the console. If there is any error during the execution, it will be logged into the console as well.

:::info

Use your own account by updating the `//TernoaTestAccount` with your account seed when retrieving the keyring from the example below.

:::

Here are detailed the `viewSecretNFT` helper parameters:

```markdown
`nftId`: The ID of the NFT.
`ipfsClient`: A TernoaIPFS class instance to interact and store metadata on IPFS.
`requesterPair`: The decrypter keyring (containing the address) will be used to sign data submitted to enclaves to retrieve the shares of the private key.
`requesterRole`: The role kind of the secret NFT's decrypter: it can be either "OWNER", "DELEGATEE" or "RENTEE".
`clusterId`: the TEE Cluster ID of enclaves used to store private key shares. The default is 0.
```

The response returned a decrypted base64 format of the Secret NFT.

## Next

The next step will be getting the NFT data from the Ternoa Indexer using the NFT id just generated. Keep it and continue on the ["How to retrieve a Secret NFT"](/for-developers/guides/NFT/secret-NFT/get-NFT) guide.

## Support

If you face any trouble, feel free to reach out to our community engineers in our [Discord](https://discord.gg/fUmBkPpnRu).
