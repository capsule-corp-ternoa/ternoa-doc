---
sidebar_position: 3
sidebar_label: Secret NFT
---

# Secret NFT

A Ternoa Secret NFT is a unique type of NFT that incorporates encrypted data, making it more secure and exclusive than a Basic NFT. Only the current owner of the Secret NFT has access to the encrypted data at any given time.

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
