---
sidebar_position: 3
---

# IPFS

The media associated with NFTs, and other associated metadata, are stored offchain in a decentralised storage network: **IPFS**, Interplanetary File Systems. Only the link to this metadata is stored on-chain as part of the NFT. This link is frequently a fingerprint called a cryptographic hash ID (e.g. `Qmf5RHhnUjSCfCN9d1Ee6sUWxe3Eqvogw1cTsssrxAxtPn`). IPFS files are accessible using those hashes.

On Ternoa NFTs are composed of two files: an asset file (e.g. image, video, music) and a metadata json file. The asset file hash is nested into the metadata file and both are stored on IPFS with their dedicated hashes.

Ternoa provides its own IPFS public node thru this HTTP gateaway: **ipfs-mainnet.trnnfr.com**.
