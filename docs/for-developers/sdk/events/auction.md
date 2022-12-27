---
sidebar_position: 6
sidebar_label: Auction
---

# Auction

The Auction events

- ## AuctionCreatedEvent  
	- **Summary:** 
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
	- **Summary:** 
	- **Datas returned:** 
		- nftId: *number*

- ## AuctionCompletedEvent  
	- **Summary:** 
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
	- **Summary:** 
	- **Datas returned:** 
		- nftId: *number*
  		- bidder: *string as AccountId32*
  		- amount: *string as u128*
  		- amountRounded: *number*

- ## BidRemovedEvent  
	- **Summary:** 
	- **Datas returned:** 
		- nftId: *number*
  		- bidder: *string as AccountId32*
  		- amount: *string as u128*
  		- amountRounded: *number*

- ## BalanceClaimedEvent  
	- **Summary:** 
	- **Datas returned:** 
  		- account: *string as AccountId32*
  		- amount: *string as u128*
  		- amountRounded: *number*