---
sidebar_position: 2
---

# Marketplace 

## Simple Summary

NFTs represent proof of ownership on the blockchain. Creators need a way to group NFTs in a higher order entity. This entity is a collection. If a collection is created, NFTs can be put in it at its creation or after.
**Marketplaces are entities used, primarily, to sell and buy NFTs.** A marketplace's ownership and rules are also defined by the chain.
## Abstract

In the objective of seeling and buying NFTs, we created the marketplace entity. Each user can create his own marketplace and define rules that apply to who can put on sale, what is the listing (putting on sale) cost and what is the commission fee. **This document descrive the motivation and specification of the marketplace entity.**

## Motivation

The main objective of marketplaces is to have a support / media to exchange NFTs other than plain P2P transfer. Having marketplaces allows user to define price for their NFTs. **Those NFTs can be art, gaming items, tickets or any asset that can be represneted by a digital entity.**

## Workflows

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
