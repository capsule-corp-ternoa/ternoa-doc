---
sidebar_position: 1
---

# 🔰 Collections

## 🤔 What is an NFT collection?

These digital items are distinguishable from one another by a unique number. That number or serial number for NFTs is a token ID, which is stored on the blockchain. The serial number works in the same way as a barcode and the code corresponds to the information about that particular item: how it looks, its distinguishing attributes, the artist or organization that made it, and more.

NFTs represent proof of ownership on the blockchain. Creators need a way to group NFTs in a higher order entity. This entity is a collection. If a collection is created, NFTs can be put in it at its creation or after.

##  How to create a NFT Collection ? 

<nav class="pagination-nav">
  <div class="pagination-nav__item">
    <a class="pagination-nav__link" href="https://www.youtube.com/watch?v=fzH7Gjadmj0&ab_channel=HashLipsNFT">
      <div class="pagination-nav__label">How to create an NFT collection - Ultimate guide</div>
    </a>
  </div>
</nav>

## Abstract

In EVM / Smart Contract based, collection are represented by smart contract. It implies some advantages and drawback. "Buyers" need to mint their NFT themselves, each contract will have its own set of rules, the smart contract can follow or not some standards.
At Ternoa, you can create and be the owner of a collection. When minting NFTs, you can specify this collection and put it on sale. The NFTs will always be part of this collection and it's origin / grouping can be ensured over time. Collections will always follow the same set of rules.

## 🎯 Objective 

Collections are used to represent all the assets in a single (or multiple) contract addresses and help users group items from the same creator. They have one or more owners and are typically associated with important metadata such as creator royalties and descriptions.

The main objective of collections are to give a way to group NFTs. Grouping can have multiple meaning, eg. having the same NFT in a high quantity grouped in the same collection or having multiple NFTs sharing the same types of attributes, while still being different, gathered in one entity. This can ease navigation in dApps and more generally improve user experience while using Ternoa's chain.
___

## Specification

### Collection External Interfaces
Collections support the following onchain interfaces:
```rust
interface { 
  /// Interface Id: TIP101-01
  /// Description: User can create a new collection.
  /// Constraint(s): 
  ///		- None
  create_collection(offchain_data, BoundedVec<u8, CollectionOffchainDataLimit>, limit: Option<u32>);


  /// Interface Id: TIP101-02
  /// Description: User can add NFTs to his collection.
  /// Constraint(s):  
  ///		- The collection must not be closed.
  ///		- The collection must not have reached limit if it has one.
  ///		- NFT must not already be in a collection.
  ///		- NFT must be owned.
  ///		- Collection must be owned.
  add_nft_to_collection(nft_id: NFTId, collection_id: CollectionId);

  /// Interface Id: TIP101-03
  /// Description: User can add NFTs to his collection.
  /// Constraint(s):  
  ///		- Collection must be owned.
  ///		- The collection must be empty. (If NFTs are in the collection, they need to be burned)
  burn_collection(collection_id: CollectionId);

  /// Interface Id: TIP101-04
  /// Description: User can close a collection signalling that no more NFTs will be added in the collection.
  /// Constraint(s):  
  ///		- Collection must be owned.
  ///		- Collection must not be already closed.
  close_collection(collection_id: CollectionId);
  
  /// Interface Id: TIP101-05
  /// Description: User can add a maximum number of NFTs as a limit to his collection. Once the collection reaches that number of collection, it will be considered limited (complete)
  /// Constraint(s):  
  ///		- Collection must be owned.
  ///		- Collection must not be closed.
  ///		- Collection must not already have a limit (it can be set on collection creation).
  ///		- Collection must have an inferior amount of NFTs that the speified limit.
  limit_collection(collection_id: CollectionId, limit: u32);
}
```

### Existing Interfaces changed for collections
```rust
interface {
  /// Interface Id: TIP101-06
  /// Description: User can create an NFT with any existing collection he owns.
  /// Constraint(s): 
  ///		- The collection must not be closed.
  ///		- The collection must not have reached limit if it has one.
  ///		- Collection must be owned.
  create_nft(owner: AccountId, offchain_data: BoundedVec<u8, NFTOffchainDataLimit>, royalty: Permill, collection_id: Option<CollectionId>, is_soulbound: bool);
}
```
___

## 💾 Ternoa Collection Metadata

###  🔢 On-Chain Metadata - Collection

| **Field Name**    | **Description** | **Mutable/Immutable**
| ----------- | ----------- | ----------- |
| `owner`      | Owner of the NFT collection     | I
| `offchain_data`    | Link/Json to the collection’s offchain metadata. More information below.       | I
| `nfts`    | List of NFTs belonging to the collection      | M
| `limit`    | Limit defines the total number of NFTs a collection can have. Limit is optional at the time of collection creation and thus can only be defined once.    | M(once), if limit is set or the collection is closed → I
| `is_closed`    | 	Creator of the collection cannot add more NFTs to the collection if marked as closed. At the time of the collection creation this parameter is set to default: false. However, creator can chose to close the collection at any point of time after the collection has been created.       | M(once), if the collection is closed → I

###  🔢 Off-Chain Metadata - Collection - Not Enforceable

Collection, like NFTs, have their own metadata that are store in json in either IPFS, a private server, any other type of storage. Metadatas cannot be enforced but we suggest this format:

| **Field Name**    | **Description** 
| ----------- | ----------- 
| `name`      | Name of the collection
| `description`    | Description of the collectionbelow.       
| `profile_image`    | Avatar/Profile image assigned to the collection
| `banner_image`    | Banner image for the collection

**off-chain metadata example :**

```json showLineNumbers
{
    "name": "My Awesome collection",
    "description": "A cool description of my collection",
    "profile_image": "Profile picture of the collection (Link / IPFS / Any)",
    "banner_image": "Banner picture of the collection (Link / IPFS / Any)"
}
```

This metadata is stored offchain and only the CID (in case of IPFS), the link or the string corresponding to offchain data, will be stored on chain.
___
## Constraints

 - Collection must not be close or limited to add an NFT in it
 - Collection must be owned to add NFT in it
 - Collection must be owned to close it
 - Collection must be owned to add a limit
 - Collection must be empty to be burned

 | **Features**    | **Constraints** 
| ----------- | ----------- 
| CREATION     | <ul><li>Have enough CAPS to create a collection</li></ul>
| BURN    | <ul><li>All NFTs should be burned before burning the collection</li><li>A collection needs to be owned in order to be burned </li></ul>     
| CLOSE   | <ul><li>Only an owner can close the collection</li><li>Owner can close a closed collection</li></ul>   
| LIMIT    | <ul><li>Only an owner can limit the collection</li><li>A collection can only be limited once</li><li>A closed collection cannot be limited</li></ul>

___
## 🌊 Workflows

<details className="toggle">
  <summary>Creating a collection</summary>
  <div>
    <div>
    <p>
      The following is the workflow proposed for creating a collection:
    </p>
    <ol>
      <li>User create his metadata in a json format</li>
      <li>User upload it to IPFS retrieving the CID</li>
      <li>User create the collection spcifying the CID and the optional desired limit</li>
      <li>User retrieves the collection id</li>
    </ol>
    </div>
  </div>
</details>

<details className="toggle">
  <summary>Minting an NFT with a collection</summary>
  <div>
    <div>
    <p>
      The following is the workflow proposed for minting an NFT with a collection:
    </p>
    <ol>
      <li>User has already created a collection and knows the corresponding id</li>
      <li>User create his NFT metadata in a json format</li>
      <li>User upload the metadata to IPFS retrieving the CID</li>
      <li>User create his NFT by specifying the CID, royalties, soulbound flag but most importantly the collection id.</li>
    </ol>
    </div>
  </div>
</details>

<details className="toggle">
  <summary>Adding an NFT to a collection</summary>
  <div>
    <div>
    <p>
      The following is the workflow proposed for adding an NFT to a collection:
    </p>
    <ol>
      <li>User has already created a collection and knows the corresponding id</li>
      <li>User has already created an NFT and knows the corresponding id</li>
      <li>User triggers the "add_nft_to_collection" function specifying the nft id and the collection id</li>
    </ol>
    </div>
  </div>
</details>

<details className="toggle">
  <summary>Adding a limit to a collection</summary>
  <div>
    <div>
    <p>
      The following is the workflow proposed for adding a limit to a collection:
    </p>
    <ol>
      <li>User has already create a collection WITHOUT specifying a limit and know the corresponding id</li>
      <li>User triggers the "limit_collection" function specifying the collection id and the maximum number of NFTs in the collection.</li>
      <li>Collection now has a maximum number (limit)</li>
    </ol>
    </div>
  </div>
</details>

<details className="toggle">
  <summary>Closing a collection</summary>
  <div>
    <div>
    <p>
      The following is the workflow proposed for closing a collection:
    </p>
    <ol>
      <li>User has already created a collection and knows the corresponding id</li>
      <li>User triggers the "close_collection" function specifying the collection id</li>
      <li>Collection is now close and can't accept any more NFTs</li>
    </ol>
    </div>
  </div>
</details>

<details className="toggle">
  <summary>Burning a collection</summary>
  <div>
    <div>
    <p>
      The following is the workflow proposed for burning a collection:
    </p>
    <ol>
      <li>User has already created a collection (EMPTY) and knows the corresponding id</li>
      <li>User triggers the "burn_collection" function specifying the collection id</li>
      <li>Collection does not exist anymore</li>
    </ol>
    </div>
  </div>
</details>

<details className="toggle">
  <summary>Burning a collection with NFT in it</summary>
  <div>
    <div>
    <p>
      The following is the workflow proposed for burning a collection with NFT in it:
    </p>
    <ol>
      <li>User has already created a collection and has NFTs in it and knows the corresponding id</li>
      <li>User triggers the "burn_nft" function for each NFTs in the collection. If he doesn't own all the NFTs, hs won't be able to burn them and burn the collection.</li>
      <li>User triggers the "burn_collection" function specifying the collection id</li>
      <li>Collection does not exist anymore</li>
    </ol>
    </div>
  </div>
</details>
