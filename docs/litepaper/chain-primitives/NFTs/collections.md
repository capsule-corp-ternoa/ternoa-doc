---
sidebar_position: 2
sidebar_label: Collections
---

# Collections

Ternoa has developed a protocol that creates digital assets, and allows you to interact with and manage ownership of them.

These digital items are distinguishable from one another by a unique number. That number or serial number for NFTs is a token ID, which is stored on the blockchain. The serial number works in the same way as a barcode and the code corresponds to the metadata about that particular item: how it looks, its distinguishing attributes, the artist or organization that made it, and more.

# Collections On-Chain Metadata
Default Standard*

|  Field Name     | Description                    | Mutable/Immutable
| --------------- | ----------------------------- |---------------------
| owner        | Owner of the NFT collection                 | I
| offchain_data | Link/Json to the collection’s offchain metadata. More information below.        | I
| nfts         | List of NFTs belonging to the collection   | M
| limit    | Limit defines the total number of NFTs a collection can have. Limit is optional at the time of collection creation and thus can only be defined once. | M(once), if limit is set or the collection is closed → I
| is_closed       | Creator of the collection cannot add more NFTs to the collection if marked as closed. At the time of the collection creation this parameter is set to default: false. However, creator can chose to close the collection at any point of time after the collection has been created.| M only once, if not set during NFT creation.

# Collections Off-Chain Metadata 
Default Standard (Not enforceable)

|      Field Name           |     Description                 |
| --------------- | ------------------------------------- |
| banner_image         | Banner image for the collection  |
| name | Name of the collection          |
| description      | Description of the collection  |
| profile_image     | Avatar/Profile image assigned to the collection |

# Collections TIP

[**View Collections TIP**](https://github.com/capsule-corp-ternoa/ternoa-proposals/blob/main/TIPs/tip-101-Collection.md) 



