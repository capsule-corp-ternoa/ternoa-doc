---
title: NFT Type
sidebar_label: "NFT Type"
sidebar_position: 1
---

NFTs are digital assets representing ownership of a one-of-a-kind item or piece of content, ranging from art to video game items or credentials. At Ternoa, we currently support: Basic NFTs, Secret NFTs, and soon Capsule NFTs.

Learn how to create your own with our [Developer Guides.](https://docs.ternoa.network/for-developers/guides/) 

## Basic NFT ##

Basic NFTs are digital assets on the blockchain that represent ownership of a digital or physical asset, with associated metadata stored on-chain and off-chain. They can be minted, transferred, listed, sold, auctioned, burned and can have royalties associated with them. Basic NFTs  involve storing the media file on a decentralized storage network and storing off-chain metadata in IPFS. 

Use cases for Basic NFTs include: digital artwork, music, video clips, memes, avatars, video games, trading cards, metaverse land, virtual fashion, text-based NFTs, ticket & membership NFTs, and real-world assets. 

Ternoa Network supports the creation and trading of Basic NFTs. If a Basic NFT includes royalties, Ternoa facilitates the automatic payment of royalties on each sale through embedding it in the minting process, ensuring that creators receive payment for each sale of their NFT.


## Secret NFT ##

Secret NFTs give creators the ability to add private data in their NFTs, including images, videos, audio, or documents. Secret NFTs can be transferred peer-to-peer or traded in marketplaces. There are infinite ways in which secret NFTs can be utilized and transform how we store our private data. Now let's go into more technical detail on how we ensure privacy with Secret NFTs. Secret NFTs are an addition to the Basic NFTs; the secret data is stored in a decentralized manner using IPFS protocol. The secret consists of a media that is encrypted using generated PGP keys. After encrypting the media, the PGP private key is split into shares using Shamir's Secret Sharing algorithm. Each share is securely stored in an enclave using the TEE technology, where individuals or centralized entities other than the current owner of the Secret NFT cannot access them. 

To view a secret, the NFT owner will request the shares for each enclave. The request consists of the NFT id and a signed message. Once the NFT ownership is verified, the TEE enclaves will return the shares. The PGP Private Key can be reconstructed with the shares, and the secret media is decrypted.

Secret NFTs can revolutionize several industries by providing an extra layer of privacy to creators and collectors. They can be used to store and transfer exclusive content, such as music tracks, backstage photos, and gaming items, and ensure that the content is only accessible to verified fans or collectors. Secret NFTs also enable creators to hide their NFT content, protecting their work from unauthorized duplication or hacking. Ternoa has developed Secret NFTs to address the need for additional privacy on data and creations, and this innovation will give control back to NFT owners and creators.



