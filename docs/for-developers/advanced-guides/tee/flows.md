---
sidebar_position: 1
sidebar_label: Minting & Decrypting flows
---

# Minting & Decrypting flows

:::info
The following schemas and descriptions mention the Secret NFT as an example. Nevertheless, those schemas as also valuable for the Capsule NFT as the concept behind the two flows is the same for both of them.
:::

## Minting a Secret NFT

```mermaid
		graph TD;
		A[Init API]-->B;
	  B[Create Keyring]-->F;
	  B-->W;
	  S[Temporary Signer account creation] --> W;

	  CC[Enclaves health check] --> C
	  C[Create PGP Key Pair] -- public PGP Key -->D;
	  C -- secret PGP Key --> V;
	  D[Encrypt Secret] --> E;
	  E[IPFS upload: Secret + Public PGP Key] --> F;
	  F[On-chain: Mint/Add Secret NFT] --> W;

	  V[Generate SSS] --> W;
	  W[Format TEE Payload: Data + Signature + Signer auth + Validity] -- payload --> Y;
	  X[On-chain: Get Enclaves] -- base url --> Y[TEE upload];


	  style A fill:#fff,stroke:#333,color: #000,stroke-dasharray: 5,stroke-width:2px
	  style B fill:#fff,stroke:#333,color: #000,stroke-dasharray: 5,stroke-width:2px
```

### Custom and destructured mint flow

- How to generate the Secret key

  - PGP Key Pair creation
  - Secret Shamir Shares generation

- How to prepare Secret NFT assets

  - Off-Chain Metadata: Secret NFT metadata, Secret Media Metadata
  - Secret file encryption
  - Ternoa IPFS Client

- How to mint a Secret NFT on-chain using Ternoa-JS: injecting a Signer account

- How to prepare payloads for TEE enclaves

  - Temporary signer account creation
  - Payload formatting

- How to store shares on TEE enclaves
  - Enclave health status
  - Post request

# Decrypting a Secret NFT

```mermaid
		graph TD;
		Z[Init API]-->Y;
	  Y[Create Keyring]-->XX;
	  CC[TEE: Enclaves health check] --> XX
	  XX[Format TEE Payload: Data + Signature + Requester] -- payload -->X;
	  X[TEE: Retrieve SSS]-->W;
	  W[Construct PGP Private Key] --> F;

	  V[NFT ID] --> XX
	  V --> C

	  C[On-chain storage: Retrieve Secret NFT off-chain data] -- IPFS hash --> D;
	  D[IPFS: Get Secret metadata] -- IPFS hash --> E;
	  E[IPFS: Get encrypted Secret file] --> F;
	  F[Decrypt Secret file]


	  style Z fill:#fff,stroke:#333,color: #000,stroke-dasharray: 5,stroke-width:2px
	  style Y fill:#fff,stroke:#333,color: #000,stroke-dasharray: 5,stroke-width:2px
	  style V fill:#fff,stroke:#333,color: #000,stroke-dasharray: 5,stroke-width:2px
```

### Custom and destructured decryption flow

- How to retrieve Secret NFT assets

  - Ternoa IPFS Client

- How to prepare payloads for TEE enclaves

  - Enclave health status
  - Payload formatting
  - Get request

- How to retrieve Secret Key

  - Shares combined

- How to decrypt the secret
