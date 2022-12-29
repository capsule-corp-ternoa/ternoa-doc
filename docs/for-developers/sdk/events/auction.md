---
sidebar_position: 6
sidebar_label: Auction
---

# Auction

The Auction events


- ## AuctionCreatedEvent  
	- **Summary:**  An auction for an NFT has been created.
	- **Datas returned:** 
		- nftId: *number*
  		- marketplaceId: *number*
  		- creator: *string as AccountId32*
  		- startPrice: *string as u128*
  		- startPriceRounded: *number*
  		- buyItPrice: *string as u128*
  		- buyItPriceRounded: *number*
  		- startBlock: *number*
  		- endBlock: *number*


- ## AuctionCancelledEvent  
	- **Summary:** An auction for an NFT has been cancelled.
	- **Datas returned:** 
		- nftId: *number*


- ## AuctionCompletedEvent  
	- **Summary:** An auction for an NFT has been completed.
	- **Datas returned:** 
		- nftId: *number*
  		- newOwner: *string as AccountId32*
  		- amount: *string as u128*
  		- amountRounded: *number*
  		- marketplaceCut: *string as u128*
  		- marketplaceCutRounded: *number*
  		- royaltyCut: *string as u128*
  		- royaltyCutRounded: *number*


- ## BidAddedEvent  
	- **Summary:** The bidder has added a new bid offer.
	- **Datas returned:** 
		- nftId: *number*
  		- bidder: *string as AccountId32*
  		- amount: *string as u128*
  		- amountRounded: *number*


- ## BidRemovedEvent  
	- **Summary:** The bidder has removed his bid offer.
	- **Datas returned:** 
		- nftId: *number*
  		- bidder: *string as AccountId32*
  		- amount: *string as u128*
  		- amountRounded: *number*


- ## BalanceClaimedEvent  
	- **Summary:** Bidders that did not win the auction have claimed back their bids balance after an auction ends.
	- **Datas returned:** 
		- account: *string as AccountId32*
  		- amount: *string as u128*
  		- amountRounded: *number*