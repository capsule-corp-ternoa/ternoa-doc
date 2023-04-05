---
sidebar_position: 4
sidebar_label: Marketplace
---

# Marketplace & Auctions

Ternoa provides you with many basic and advanced marketplace features. Not only creating an NFT can be done in just a few lines of code but we also cover many marketplace use cases: Ternoa allows you to easily create functions to list for sale, English auction, unlist and NFT, and manage a marketplace.

## What is an NFT Marketplace? Why Auctions?

To sell and buy NFTs, we created the marketplace entity. Each user can create his own marketplace and define rules that apply to who can put on sale, what is the listing (putting on sale) costs and what is the commission fee.

Ternoa also offers different ways to sell an NFT: auctions. Auctions are a type of sale where the NFT seller sets a minimum price they are willing to sell their NFT by defining the time duration. Buyers can place bids with the amount they are willing to pay for the NFT as long as it is above the minimum price. At the end of the period, the NFT is sold to the highest bidder. Auctions are a great way to hype the project or an NFT.

## Marketplace features

<details className="toggle">
    <summary>Creating a marketplace</summary>
    <div>Create a Marketplace on the chain.</div>
</details>

<details className="toggle">
    <summary>Setting the Marketplace Configuration</summary>
    <div>Set or Remove the marketplace parameters configuration : 
        <ul>
            <li>Commission fee</li>
            <li>Listing fee</li>
            <li>Accounts list</li>
            <li>offchain data</li>
            <li>Collection list</li>
        </ul>
    </div>
     <a to="/for-developers/guides/marketplace/manage-marketplace" className='button purpleBtn noUnderline my2'>
        View code
    </a>
</details>

<details className="toggle">
  <summary>Changing the kind/type of a marketplace</summary>
  <div>Set the new marketplace kind on the chain.</div>
</details>

<details className="toggle">
  <summary> Transferring a marketplace ownership</summary>
  <div>Set the new marketplace owner on the chain.</div>
</details>

<details className="toggle">
  <summary>Listing an NFT</summary>
  <div>List an NFT on a marketplace.</div>
  <a to="/for-developers/guides/marketplace/sale-NFT#list-for-sale-an-nft-on-a-marketplace-using-ternoa-js" className='button purpleBtn noUnderline my2'>
      View code
  </a>
</details>

<details className="toggle">
  <summary>Unlisting an NFT</summary>
  <div>Unlist an NFT from a marketplace.</div>
  <a to="/for-developers/guides/marketplace/sale-NFT#unlist-an-nft-on-a-marketplace-using-ternoa-js" className='button purpleBtn noUnderline my2'>
      View code
  </a>
</details>

<details className="toggle">
  <summary>Buying an NFT</summary>
  <div>Buy an NFT on a marketplace.</div>
  <a to="/for-developers/guides/marketplace/buy-NFT" className='button purpleBtn noUnderline my2'>
      View code
  </a>
</details>

## Auctions features

<details className="toggle">
    <summary>Creating an Auction</summary>
    <div>Create an auction for an NFT.</div>
    <a to="/for-developers/guides/marketplace/auction/create-auction" className='button purpleBtn noUnderline my2'>
        View code
    </a>
</details>

<details className="toggle">
    <summary>Cancelling an Auction</summary>
    <div>Cancel an auction for an NFT.</div>
    <a to="/for-developers/guides/marketplace/auction/manage-auction#cancel-an-auction-on-a-marketplace-using-ternoa-js" className='button purpleBtn noUnderline my2'>
        View code
    </a>
</details>

<details className="toggle">
  <summary>Ending an Auction</summary>
  <div>End an auction for an NFT</div>
  <a to="/for-developers/guides/marketplace/auction/manage-auction#end-an-auction-on-a-marketplace-using-ternoa-js" className='button purpleBtn noUnderline my2'>
        View code
    </a>
</details>

<details className="toggle">
  <summary>Adding a Bid</summary>
  <div>The bidder adds a new bid offer.</div>
  <a to="/for-developers/guides/marketplace/auction/bid#bid-on-an-auction-using-ternoa-js" className='button purpleBtn noUnderline my2'>
    View code
  </a>
</details>

<details className="toggle">
  <summary>Removing a Bid</summary>
  <div>The bidder removes his bid offer.</div>
  <a to="/for-developers/guides/marketplace/auction/bid#remove-a-bid-using-ternoa-js" className='button purpleBtn noUnderline my2'>
      View code
  </a>
</details>

<details className="toggle">
  <summary>Buy it Now</summary>
  <div>The NFT can be directly bought if a buyItPrice was defined and the auction has not started yet.</div>
  <a to="/for-developers/guides/marketplace/auction/buy-it-now" className='button purpleBtn noUnderline my2'>
    View code
  </a>
</details>

<details className="toggle">
  <summary>Claiming an amount that was bid but did not win the auction</summary>
  <div>Bidders that did not win the auction have to claim back the balance of their bid after an auction ends.</div>
</details>
