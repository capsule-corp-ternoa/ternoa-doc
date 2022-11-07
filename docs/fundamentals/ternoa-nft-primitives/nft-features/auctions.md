---
sidebar_position: 3
---

# 📈 Auctions

## 💡 What is an Auction ? 
Auctions can be an exciting way to sell an NFT. An auction is a type of sale where the NFT seller sets a minimum price and a time period. Buyers can place bids on the amount they are willing to pay for the NFT as long as they are above the minimum price. At the end of the time period, the NFT is sold to the highest bidder.

## Abstract
In the objective of giving different ways to sell an NFT, auctions could be a great way to hype the project or an NFT.  **Auctions are a type of sale where the NFT seller sets a minimum price they are willing to sell their NFT and by defining the time duration**. Buyers can place bids with the amount they are willing to pay for the NFT as long as it is above the minimum price. At the end of the time period, the NFT is sold to the highest bidder. 

## Motivation
The main objective of auctions is to give sellers flexibility to sell their NFTs online. On the other hand the auctions can help maximize the value of NFTs as a subsequent bid will always be higher than the preceeding bid. Plus, this could be a mechanism for a project to discover price by auctioning the genesis collection rather than simply selling it.

And for users, who see adherence to a decentralized and disintermediated process as essential to the basic concept of blockchain, the only legitimate auction process for NFTs is on-chain. Conducting auctions on-chain lends the bidding process many of the benefits typically associated with blockchain-based transactions. **For instance, auctions conducted on a blockchain are auditable: every bid is public and permanently recorded, which makes bids more secure and transparent.**

___

## ✨ How does English auction work?

:::info
**English Auction or Highest bid (where the highest bid wins at the end)**
The bidding starts with the starting price which is set by the seller of the NFT and increases with the continuous bidding from the different buyers until the price is reached at Buy it now price.

Under this auction process, only one quantity of an NFT will be listed for sale.
:::

The seller can choose to accept it at any time, but the buyer will need CAPS to create a bid.

**Before we look at the working, there are some terms to understand:**

| **Terms**    | **Explanations** 
| ----------- | ----------- 
| **Starting Price**    | A starting price of an auction is the lowest possible bid that the first bidder may place. A seller is willing to accept at least the Starting Price. 
| **Duration**   | Range of days, weeks or months for which an auction will run and at the end of this range the auction/bidding process will close automatically.  
| **Buy it Now Price** | Users will have an option to add a Buy It Now option to their auction listings, buyers can either purchase the NFT right away at the Buy It Now price or place a bid.  
| **Royalties**   | <ul><li>One of the unique features of non-fungible tokens (NFTs) is the ability to earn royalties from resales.</li><li>NFTs can be programmed so that each transaction includes royalties, allowing creators to be rewarded fairly for their work. The fact that NFTs are created and stored on the blockchain, means they can be traded seamlessly from wallet to wallet, with royalties paid every time they move.</li></ul><ul>The next Bid should be higher than the current highest bid:<li>Bid Offer = CAPS</li><li>Bid Offer = CAPS</li><li>The Bid includes the bid offer + Transaction fee</li><li>User’s CAPS will be locked as soon as a bid is placed in escrow account</li><li>In case of subsequent bids, all the previous bids will be locked until users increase their bids. If the users choose not to increase their bid, the bid offer will be released and sent back to their Wallet. This also means that the bid was cancelled.</li><li>In case a bid is cancelled the bid offer will be returned to the user’s wallet</li><li>Once the seller accepts the bid the bid offer will be transferred to their account automatically</li></ul>

## Specification
### External interfaces
Auctions support the following onchain interfaces:
```rust
interface {
    /// Interface Id: TIP300-01
    /// Description: User can create an auction for an owned NFT by specifying the nft id, the marketplace id, the start block, the end block the start price, the optional buy it now price (price at which the NFT can be bought without bidding).
    /// Constraint(s): 
    ///     - User must own the NFT.
    ///     - Start block must not start in the past.
    ///     - End block must not be before start block.
    ///     - Duration must not be too long.
    ///     - Duration must not be too short.
    ///     - Auction start block must not be too far in the future.
    ///     - If buy it price is provided, it must be greater than start price.
    ///     - NFT must be available (not listed, capsule, delegated, soulbound, rented, ...).
    ///     - The marketplace must exist.
    ///     - User must be allowed to list on the marketplace.
    ///     - The start price must cover the flat commission fee if it exists.
    ///     - User must have enough tokens to cover the listing fee if it exists.
    create_auction(nft_Id: NFTId, marketplace_Id: MarketplaceID, start_block: BlockNumber, end_Block: BlockNumber, start_Price: BalanceOf, buy_ItPrice: Option<Balance>);

    /// Interface Id: TIP300-02
    /// Description: User can cancel an auction that has not started yet.
    /// Constraint(s): 
    ///     - User must be owner of the NFT.
    ///     - Auction must not have started.
    cancel_auction(nft_Id: NFTId);
    
    /// Interface Id: TIP300-03
    /// Description: User can end an auction if it is in the extended period (period starting when a bid was made at the end of the auction to avoid sniping).
    /// Constraint(s): 
    ///     - User must be owner of the NFT.
    ///     - Auction must be in the extended period.
    ///     - Auction must have at least one bid.
    end_auction(nft_Id: NFTId);
    
    /// Interface Id: TIP300-04
    /// Description: User can bid for an existing auction. If a bid already exist, it will be updated. If the bid was made at the end of the auction, the duration will be extended by the grace period duration.
    /// Constraint(s): 
    ///     - Bidder must not be auction owner.
    ///     - Auction must have started.
    ///     - Bid must be higher than previous highest bid.
    ///     - Bid must be higher or equal to starting price.
    ///     - Bidder must have enough funds to cover for the specified bid amount.
    add_bid(nft_Id: NFTId, amount: BalanceOf);
    
    /// Interface Id: TIP300-05
    /// Description: User can remove a bid if the auction is not in the end period (period a little before the end of the auction).
    /// Constraint(s): 
    ///     - Auction must not be in the end period.
    ///     - User must have made a bid.
    remove_bid(nft_Id: NFTId);
    
    /// Interface Id: TIP300-06
    /// Description: User can buy the NFT for the buy it price amount without having to bid.
    /// Constraint(s): 
    ///     - The auction must have a buy it price.
    ///     - Auction must have started.
    ///     - Buy it price must be higher than current highest bid. 
    ///     - User must have enough funds to cover the buy it price amount.
    ///     - User must not be auction creator.
    buy_it_now(nft_Id: NFTId);
    
    /// Interface Id: TIP300-07
    /// Description: A user that made a bid but did not win the auction can claim the bidded amount to retrieve funds to his account.
    /// Constraint(s): 
    ///     - User must have a pending claim (bid that did not win and is not retrieved).
    claim();
}
```

## 🌊 Workflows

<details className="toggle">
  <summary>Creating an Auction</summary>
  <div>
    <div>
    <p>
      The following is the workflow proposed for creating an auction:
    </p>
    <ol>
      <li>User has already minted an NFT and is aware of the NFT Id</li>
      <li>User creates an auction by calling the "create_auction" function and specifying the nft id, the marketplace id, the start block, the end block, start price, and optionally the buy it now price.</li>
      <li>The auction is now created and will start at the specified start block.</li>
    </ol>
    </div>
  </div>
</details>

<details className="toggle">
  <summary>Cancelling an Auction</summary>
  <div>
    <div>
    <p>
      The following is the workflow proposed for cancelling an auction:
    </p>
    <ol>
      <li>User has an auction that did not start and knows the corresponding NFT Id.</li>
      <li>The user calls the "cancel_auction" function specifying the NFT Id.</li>
      <li>The auction is now cancelled.</li>
    </ol>
    </div>
  </div>
</details>

<details className="toggle">
  <summary>Ending an Auction</summary>
  <div>
    <div>
    <p>
      The following is the workflow proposed for ending an auction:
    </p>
    <ol>
      <li>User has an auction that has started and knows the corresponding NFT Id.</li>
      <li>An other user has made a bid at the end of the auction and made it extended.</li>
      <li>The auction owner calls the "end_auction" function specifying the NFT Id.</li>
      <li>The auction is now finished and the NFT / funds have been transfered.</li>
    </ol>
    </div>
  </div>
</details>

<details className="toggle">
  <summary>Adding a Bid</summary>
  <div>
    <div>
    <p>
      The following is the workflow proposed for adding a bid:
    </p>
    <ol>
      <li>Bidder knows the id of a started auction.</li>
      <li>Bidder calls the "add_bid" function specifying the NFT Id and an amount greater than the highest bid / starting price.</li>
      <li>The bid has been accounted for.</li>
    </ol>
    </div>
  </div>
</details>

<details className="toggle">
  <summary>Updating a Bid</summary>
  <div>
    <div>
    <p>
      The following is the workflow proposed for updating a bid:
    </p>
    <ol>
      <li>Bidder knows the id of a started auction and has already bidded X Tokens.</li>
      <li>Bidder calls the "add_bid" function specifying the NFT Id and X + Y tokens.</li>
      <li>The bidders has Y tokens taken and added to his existing bid if his bid still exist, else X + Y will be taken and he will have to claim his previous existing bid.</li>
      <li>The bid is now updated.</li>
    </ol>
    </div>
  </div>
</details>

<details className="toggle">
  <summary>Removing a Bid</summary>
  <div>
    <div>
    <p>
      The following is the workflow proposed for removing a bid:
    </p>
    <ol>
      <li>Bidder knows the id of a started auction that is not in the ending period and has already bidded an amount of token.</li>
      <li>Bidder calls the "remove_bid" function specifying the NFT Id.</li>
      <li>The bid is now removed and user has been refunded.</li>
    </ol>
    </div>
  </div>
</details>

<details className="toggle">
  <summary>Buy it Now</summary>
  <div>
    <div>
    <p>
      The following is the workflow proposed for Buy it Now:
    </p>
    <ol>
      <li>Buyer knows the id of a started auction that speicified the buy it now price. The buy it price is greater than current highest bid / start price and user has enough funds.</li>
      <li>Buyer calls the "buy_it_now" funtion specifying the NFT Id.</li>
      <li>The auction is now finished the the NFT / price has been transfered.</li>
    </ol>
    </div>
  </div>
</details>

<details className="toggle">
  <summary>Claiming an amount that was bidded but dit not win the auction</summary>
  <div>
    <div>
    <p>
      The following is the workflow proposed for claiming an amount that was bidded but did not win the auction:
    </p>
    <ol>
      <li>Bidder has made a bid that did not win the auction.</li>
      <li>Bidder calls the "claim" function.</li>
      <li>Funds bidded are given back to the bidder.</li>
    </ol>
    </div>
  </div>
</details>
