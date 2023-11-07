---
sidebar_position: 1
sidebar_label: Basics
---

# Basics

Ternoa’s NFT module provides basic functions to create and manage NFTs. These include the following:

**Mint, Burn, Transfer, Royalty, Delegation.**

Ternoa creates its own metadata model to provide minimum necessary to have the capability to augment it in highly secure way.

|  Field Name     | Description                    | Mutable/Immutable
| --------------- | ----------------------------- |---------------------
| owner        | Address of the current owner of the NFT                 | M
| creator | Address of the creator of the NFT and the receiver of the royalty         | I
| offchain_data         | Link/Text/IPFS hash of JSON   | I
| royalty     | Royalty fee associated to the NFT | M
| state        | These are the flags that defines the state of an NFT. An NFT could be a Capsule, or listed for sale on a marketplace, or have a secret, or is delegated to another wallet address or is a SBT. isCapsule, listedForSale, isSecret, isDelegated, isSoulbound| M
| collection_id       | Unique ID of the collection      | M(once) -> I

Ternoa NFT Off-Chain Metadata
Default Standard (Not enforceable) 

|      Field Name           |     Description                 |
| --------------- | ------------------------------------- |
| title         | Title of the NFT                              |
| description | Description of the NFT          |
| image       | An image for the item.   |
| properties      | Properties of the NFT, could be the power, speed, damage, etc |
| media *      | nested object, see details below        |

*media :

```bash showLineNumbers
{
    preview: Preview image IPFS link,
    mediaType: Type of media (file format),
    size: size of the encrypted media
}
```
# Basic TIP

[**View Basic TIP**](https://github.com/capsule-corp-ternoa/ternoa-proposals/blob/main/TIPs/tip-100-Basic-NFT.md) 