---
sidebar_position: 4
sidebar_label: Marketplace
---

# Marketplace

The Marketplace events like ConfigSet, Listed, Sold...

 - ## MarketplaceCreatedEvent 
	- **Summary:** A marketplace has been created.
	- **Datas returned:** 
  		- marketplaceId: *number*
  		- owner: *string as AccountId32*
  		- kind: *the marketplace kind : Public or Private*

 - ## MarketplaceOwnerSetEvent
	- **Summary:** The marketplace owner has been set.
	- **Datas returned:** 
  		-  marketplaceId: *number*
  		-  owner: *string as AccountId32*

 - ## MarketplaceKindSetEvent
	- **Summary:** The marketplace kind has been set.
	- **Datas returned:** 
  		- marketplaceId: *number*
  		- kind: *the marketplace kind : Public or Private*

 - ## MarketplaceConfigSetEvent
	- **Summary:** The marketplace configuration has been updated. Parameters can be unchanged (Noop), Removed or Set
	- **Datas returned:** 
  		- marketplaceId: *number*
  		- commissionFeeType: *optional string : Remove or Set*
  		- commissionFee: *optional string*
  		- commissionFeeRounded: *optional Number*
  		- listingFeeType: *optional string : Remove or Set*
  		- listingFee: *optional string*
  		- listingFeeRounded: *optional Number*
  		- accountList: *optional Array of strings as AccountId32*
  		- offchainData: *optional string*
 
 - ## MarketplaceMintFeeSetEvent 
	- **Summary:** The marketplace mint fee has been set.
	- **Datas returned:** 
  		-  fee: *string*
  		-  feeRounded: *number*

 - ## NFTListedEvent
	- **Summary:** An NFT has been listed for sale on a marketplace.
	- **Datas returned:** 
  		-  nftId: *number*
  		-  marketplaceId: *number*
  		-  price: *string*
  		-  priceRounded: *number*
  		-  commissionFeeType: *optional string : Percentage or Flat value*
  		-  commissionFee: *optional string*
  		-  commissionFeeRounded: *optional number*

 - ## NFTUnlistedEvent
	- **Summary:**  An NFT has been unlisted from a marketplace.
	- **Datas returned:** 
  		- nftId: *number*

 - ## NFTSoldEvent
	- **Summary:** An NFT has sold.
	- **Datas returned:** 
  		- nftId: *number*
  		- marketplaceId: *number*
  		- buyer: *string*
  		- listedPrice: *string*
  		- listedPriceRounded: *number*
  		- marketplaceCut: *string*
  		- marketplaceCutRounded: *number*
  		- royaltyCut: *string*
  		- royaltyCutRounded: *number*