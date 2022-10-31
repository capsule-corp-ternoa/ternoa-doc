---
sidebar_position: 2
---

# 🖼️ Marketplace 

## Simple Summary

NFTs represent proof of ownership on the blockchain. Creators need a way to group NFTs in a higher order entity. This entity is a collection. If a collection is created, NFTs can be put in it at its creation or after.
**Marketplaces are entities used, primarily, to sell and buy NFTs.** A marketplace's ownership and rules are also defined by the chain.
## Abstract

In the objective of seeling and buying NFTs, we created the marketplace entity. Each user can create his own marketplace and define rules that apply to who can put on sale, what is the listing (putting on sale) cost and what is the commission fee. **This document descrive the motivation and specification of the marketplace entity.**

## 🎯 Motivation

The main objective of marketplaces is to have a support / media to exchange NFTs other than plain P2P transfer. Having marketplaces allows user to define price for their NFTs. **Those NFTs can be art, gaming items, tickets or any asset that can be represneted by a digital entity.**

___

## 👾 NFT Types

- **Digital Artwork** - This is one of the most popular forms of NFT. Think of it as a digital version of physical paintings, drawings and photographs

- **Music NFTs** - By selling music in the form of NFTs, artists can benefit from reaching their fans directly, avoiding concerns about music piracy and intermediaries. Example: Deadmau, Snoop Dogg

- **Video Clips and Gifs** - These NFTs can be motion version of paintings and digital drawings. But they can be loop version of videos or memorable sports moments, among many other. Example: NBA TopShot

- **Memes** - NFT memes are funny as regular ones, with difference that they can be minted, traded or owned. Example: Doge, Shiba, Pepe

- **Avatars/PFPs** - Profile Pictures collections (PFPs) often have many unique avatars that vary in rarity according to their traits. Example: BAYC, Crypto Kitties

- **Video Games NFTs** - Blockchain games allow players to buy, collect and trade NFTs in multiple forms such as characters, virtual weapons, power ups, skins, etc. Example: Axie Infinity

- **Trading Cards** - These NFTs are the evolution of the traditional collectible cards and have a dual use: to play in the game and as a collectible. Example: MetaFight, Sorare

- **Metaverse Land** - Metaverse allows users to interact with a virtual ecosystem, where they can buy, sell, trade and own virtual real estate. Example: Decentraland, Sandbox

- **Virtual Fashion** - Consider this type of NFT as a digital closet for the virtual life, where a user can find anything to wear: sneakers, hoodies, sunglasses, even skins for the avatar. Example: Adidas dressing Bored Apes

- **Text Based NFTs** - Literary works to a single text, anything written can be minted as a NFT. Example: 20mint, Jack Dorsey’s tweet

- **Ticket & Membership NFTs** - These NFTs can serve as entry tickets for events within a certain metaverse or as commemorative tickets for physical events, like concerts or sport matches. Example: 2022 Super Bowl received a commemorative NFT virtual ticket

- **Real-World Assets** - Anything physical can be represented by an NFT. This tokenization of real world assets introduces flexibility and record keeping of ownership. Example: Cars, houses, lands can be represented by an NFT certificate

___

## 🛠️ Specification

### Marketplace Types
```rust
types {
	/// Possible operations.
	pub enum ConfigOp {
		Noop, // Don't change.
		Set(T), // Set the given value.
		Remove, // Remove the value.
	}

	/// Multiple form of fees
	pub enum CompoundFee<Balance> {
		Flat(Balance) // A flat amount of token,
		Percentage(Permill) // A percentage of token,
	}
}
```
### Marketplace External Interfaces
Marketplaces support the following onchain interfaces:
```rust
interface {
  /// Interface Id: TIP200-01
  /// Description: User can create a marketplace specifying the kind.
  /// 	The kind is the type of marketplace, it can be public or private. 
  /// 	Public mean that anyone can list except the addresses put in the account_list (ban_list).
  /// 	Private mean that no one can list except the addresses put in the account_list (allow_list).
  /// Constraint(s): 
  ///       - The user must have enough funds to cover for the marketplace mint fee
  create_marketplace(kind: MarketplaceType);
  
  /// Interface Id: TIP200-02
  /// Description: User can transfer ownership of a marketplace.
  /// Constraint(s): 
  ///       - User must be the owner of the marketplace
  set_marketplace_owner(marketplace_id: MarketplaceId, recipient: AccountId);
  
  /// Interface Id: TIP200-03
  /// Description: User can change the kind (type) of a marketplace.
  /// 	The kind is the type of marketplace, it can be public or private. 
  /// 	Public mean that anyone can list except the addresses put in the account_list (ban_list).
  /// 	Private mean that no one can list except the addresses put in the account_list (allow_list).
  /// Constraint(s): 
  ///       - User must be the owner of the marketplace
  ///	    - If public -> private, accout_list becomes an allow list instead of a ban list
 ///	    - If private -> public, accout_list becomes a ban list instead of an allow list
  set_marketplace_kind(marketplace_id: MarketplaceId, recipient: AccountId);

  /// Interface Id: TIP200-04
  /// Description: User can change the configuration option of the marketplace. He can change the commission_fee, the listing_fee, the account_list and the offchain data.
  /// Constraint(s): 
  ///       - User must be the owner of the marketplace
  set_marketplace_configuration(marketplace_id: MarketplaceId, commission_fee: ConfigOp<CompoundFee<Balance>>, listing_fee: ConfigOp<CompoundFee<Balance>>, account_list: ConfigOp<BoundedVec<AccountId, AccountSizeLimit>>, offchain_data: ConfigOp<BoundedVec<u8, offchainDataLimit>>);

  /// Interface Id: TIP200-05
  /// Description: User can list an NFT for direct sale if authorized in the marketplace.
  /// Constraint(s): 
  ///		- NFT must be available
  ///       	- User must be the owner of the NFT
  ///		- User must be authorized
  ///		- User must have enough funds to cover for listing fee in case it exists
  ///		- User must have enough funds to cover for the flat commission fee if it exists
  list_nft(nft_id: NFTId, marketplace_id: MarketplaceId, price: Balance);

  /// Interface Id: TIP200-06
  /// Description: User can unlist a listed NFT.
  /// Constraint(s): 
  ///		- NFT must to be on sale
  ///       - User must to be the owner of the NFT
  unlist_nft(nft_id: NFTId);
  
  /// Interface Id: TIP200-07
  /// Description: User can buy a listed NFT.
  /// Constraint(s): 
  ///		- NFT needs to be on sale
  ///       	- User must not be the owner of the NFT
  ///		- User must have enough funds to pay the NFT price
  buy_nft(nft_id: NFTId);
}
```

___
## Constraints
 - User must have enough funds to cover for marketplace creation fee to create a marketplace.
 - User must be owner of marketplace to change marketplace configuration.
 - User must be owner of marketplace to change kind.
 - User must be owner of marketplace to change marketplace ownership.
 - User must be authorized to list an NFT.
 - User must be the owner of the NFT to list it for sale.
 - User must have enough funds to cover for the listing fee in case it exists.
 - User must have enough funds to cover for the flat commission fee if it exists.
 - User must be the owner of the NFT to unlist it
 - NFT must be on sale to be unlisted.
 - NFT must be on sale to be bought.
 - User must not be the owner of the NFT to buy it.
 - User must have enough caps to pay for the price to buy an NFT.

___

## Additional Info

## Metadata

Marketplaces, like NFTs and collections, have their own metadata that are stored in json in either IPFS, a private server, any other type of storage. Metadatas cannot be enforced but we suggest this format:
```json
{
	"name":"This the title of the collection",
	"logo":"Hash / Link to the logo",
}
```
This metadata is stored offchain and only the CID (in case of IPFS), the link or the string corresponding to offchain data, will be stored on chain.

___
## 🌊 End-to-end workflows (Ternoa-specific)

<details className="toggle">
  <summary>Creating a marketplace</summary>
  <div>
    <div>
    <p>
      The following is the workflow proposed for creating a marketplace:
    </p>
    <ol>
      <li>User create the marketplace specifying the kind.</li>
      <li>User retrieves the marketplace id.</li>
    </ol>
    </div>
  </div>
</details>

<details className="toggle">
  <summary>Transferring a marketplace ownership</summary>
  <div>
    <div>
    <p>
      The following is the workflow proposed for transferring a marketplace ownership:
    </p>
    <ol>
      <li>User has already created a marketplace and knows its id.</li>
      <li>User calls the "set_marketplace_owner" function with the address of the recipient.</li>
      <li>The recipient is now the owner of the marketplace.</li>
    </ol>
    </div>
  </div>
</details>

<details className="toggle">
  <summary>Changing the kind/type of a marketplace</summary>
  <div>
    <div>
    <p>
      The following is the workflow proposed for changing the kind / type of a marketplace:
    </p>
    <ol>
      <li>User has already created a marketplace and knows its id.</li>
      <li>User calls the "set_marketplace_kind" specifying private of public.</li>
      <li>The marketplace is now private or public. The account_list is respectively an allow list or ban list.</li>
    </ol>
    </div>
  </div>
</details>

<details className="toggle">
  <summary>Changing the comission fee to a pecentage</summary>
  <div>
    <div>
    <p>
      The following is the workflow proposed for changing the commission fee to a percentage:
    </p>
    <ol>
      <li>User has already created a marketplace and knows its id.</li>
      <li>User calls the "set_marketplace_configuration" function with the parameters (Set(Percentage(200000)), NoOp, NoOp, NoOp).</li>
      <li>The commission fee is now changed to 20% while other values did not.</li>
    </ol>
    </div>
  </div>
</details>

<details className="toggle">
  <summary>Changing the listing_fee to a flat amount of token</summary>
  <div>
    <div>
    <p>
    The following is the workflow proposed for changing the listing_fee to a flat amount of token:
    </p>
    <ol>
      <li>User has already created a marketplace and knows its id.</li>
      <li>User calls the "set_marketplace_configuration" function with the parameters (NoOp, Set(Flat(10_000_000_000_000_000_000)), NoOp, NoOp).</li>
      <li>The listing_fee is now changed to 10 CAPS while other values did not change.</li>
    </ol>
    </div>
  </div>
</details>

<details className="toggle">
  <summary>Removing the listing_fee</summary>
  <div>
    <div>
    <p>
      The following is the workflow proposed for removing the listing_fee:
    </p>
    <ol>
      <li>User has already created a marketplace and knows its id.</li>
      <li>User calls the "set_marketplace_configuration" function with the parameters (NoOp, Remove, NoOp, NoOp).</li>
      <li>The listing_fee is now removed.</li>
    </ol>
    </div>
  </div>
</details>

<details className="toggle">
  <summary>Setting the account_list</summary>
  <div>
    <div>
    <p>
      The following is the workflow proposed for setting the account_list:
    </p>
    <ol>
      <li>User has already created a marketplace and knows its id.</li>
      <li>User calls the "set_marketplace_configuration" function with the parameters (NoOp, NoOp, Set(BoundedVec::try_from(vec![5CDG..., 5Haz...])), NoOp).</li>
      <li>The account_list is now set.</li>
    </ol>
    </div>
  </div>
</details>

<details className="toggle">
  <summary>Setting offchain data</summary>
  <div>
    <div>
    <p>
      The following is the workflow proposed for setting offchain data:
    </p>
    <ol>
      <li>User has already created a marketplace and knows its id.</li>
      <li>User prepares the metadata file in JSON format.</li>
      <li>User uploads it on IPFS retrieving the CID.</li>
      <li>User calls the "set_marketplace_configuration" function with the parameters (NoOp, NoOp, NoOp, Set(CID)).</li>
      <li>The marketplace has offchain data set.</li>
    </ol>
    </div>
  </div>
</details>

<details className="toggle">
  <summary>Listing an NFT</summary>
  <div>
    <div>
    <p>
      The following is the workflow proposed for listing an NFT:
    </p>
    <ol>
      <li>User has already created an NFT and knows its id.</li>
      <li>User knows the marketplace id on which he wants to list.</li>
      <li>User calls the "list_nft" function with the nft id, the marketplace id and the price.</li>
      <li>The NFT is now listed on the specified marketplace.</li>
    </ol>
    </div>
  </div>
</details>

<details className="toggle">
  <summary>Unlisting an NFT</summary>
  <div>
    <div>
    <p>
      The following is the workflow proposed for unlisting an NFT:
    </p>
    <ol>
      <li>User has already created and listed an NFT and knows its id.</li>
      <li>User calls the "unlist_nft" function with the nft id.</li>
      <li>The NFT is now unlisted.</li>
    </ol>
    </div>
  </div>
</details>

<details className="toggle">
  <summary>Buying an NFT</summary>
  <div>
    <div>
    <p>
      The following is the workflow proposed for buying an NFT:
    </p>
    <ol>
      <li>User knows the NFT he wants to buy.</li>
      <li>User has enough funds to buy the NFT.</li>
      <li>User calls the "buy_nft" function with the nft id.</li>
      <li>The NFT is now owned by the buyer.</li>
    </ol>
    </div>
  </div>
</details>

___
## Test cases

* User can create a marketplace.
* User can transfer a marketplace ownership.
* User can change the marketplace kind.
* User can change the marketplace configuration.
* User can list an NFT if authorized.
* User can unlist a listed NFT.
* User can buy an NFT if he has enough funds.

## References
TBD

## Copyright
TBD
