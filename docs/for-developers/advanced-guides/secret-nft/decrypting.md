---
sidebar_position: 3
sidebar_label: Decrypting
---

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

## Custom and destructured flow

- How to retrieve Secret NFT assets

  - Ternoa IPFS Client

- How to prepare payloads for TEE enclaves

  - Enclave health status
  - Payload formatting
  - Get request

- How to retrive Secret Key

  - Shares combined

- How to decrypt the secret
