---
sidebar_position: 4
sidebar_label: NFT
---

# NFT
 - ## NFTCreatedEvent 
	- **Summary:** An NFT has been created.
	- **Datas returned:** 
  		- event : *event*
  		- nftId: *number*
  		- owner: *string as AccountId32*
  		- offchainData: *string*
  		- royalty: *number*
  		- collectionId: *number or null*
  		- isSoulbound: *boolean*
  		- mintFee: *string as u128*
  		- mintFeeRounded: *number*

 - ## NFTBurnedEvent
	- **Summary:** An NFT has been burned.
	- **Datas returned:** 
  		- nftId: *number*

 - ## NFTDelegatedEvent
	- **Summary:** An NFT has been delegated.
	- **Datas returned:** 
  		-  nftId: *number*
  		-  recipient: *string as AccountId32 or null*

 - ## NFTRoyaltySetEvent 
	- **Summary:** The NFT's royalty has been set.
	- **Datas returned:** 
  		- nftId: *number*
  		- royalty: *number*

 - ## NFTTransferredEvent
	- **Summary:** An NFT has been transferred.
	- **Datas returned:** 
  		- nftId: *number*
  		- sender: *string as AccountId32*
  		- recipient: *string*

 - ## NFTAddedToCollection 
	- **Summary:** An NFT has been added to a collection.
	- **Datas returned:** 
  		-   nftId: *number*
  		-   collectionId: *number*