---
sidebar_position: 3
sidebar_label: Collection
---

# Collection

The Collection events like Burned, Created, Closed...

 - ## CollectionCreatedEvent 
	- **Summary:** A Collection has been created.
	- **Datas returned:** 
  		- collectionId: *number*
  		- owner: *string as AccountId32*
  		- offchainData: *string*
  		- limit: *number or null*

 - ## CollectionLimitedEvent 
	- **Summary:** The collection's limit has been set.
	- **Datas returned:** 
  		- collectionId: *number*
  		- limit: *number*
 
 - ## CollectionClosedEvent
	- **Summary:** A collection has been closed.
	- **Datas returned:** 
  		- collectionId: *number*

- ## CollectionBurnedEvent
	- **Summary:** A collection has been burned.
	- **Datas returned:** 
  		- collectionId: *number*