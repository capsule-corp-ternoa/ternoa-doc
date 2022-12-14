---
sidebar_position: 5
---

# 🔐 Secret NFT

## Simple Summary
NFTs represent proof of ownership on the blockchain. the media associated with the NFTs are public in nature and can be viewed by anyone. Secret NFTs are a special kind of NFTs in Ternoa that support encrypted data. Only the current owner of the secret NFT can decrypt the secret NFT at any point.

## Abstract
Secret NFTs require the generation , exchange and storage of cryptographic keys stored in an offchain enclave running within a Trusted execution environment. The keys to encrypt and decrypt the data associated with the Secret NFTs are generated within the wallet or dApp, and transferred to the TEE enclave in a secure manner. The owner of the NFT can request the TEE enclave to retrieve the decryption key associated with the NFT, and use it to view the unencrypted data. Secret NFTs can be transferred peer-to-peer or traded in marketplaces. As an additional layer of security, TEE enclaves are configured in clusters that support Shamir secret sharing scheme.

## Motivation
While the blockchain as a public ledger of transactions provides irrefutable proof of ownership of NFTs, it does not meet the privacy of data needed for many NFT use cases. Secret NFTs have been designed by Ternoa with this in mind. Examples of private data that can be stored in NFTs include private images or videos, limited edition audio releases by music artists, private documents with long-term storage such as legal deed containing inheritance details and confidential company details.