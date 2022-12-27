---
sidebar_position: 5
sidebar_label: Rent
---

# Rent

The Rental events


- ## ContractCreatedEvent  
	- **Summary:** 
	- **Datas returned:** 
		- nftId: *number*
  		- renter: *string*
  		- duration: *DurationType*
  		- acceptanceType: *AcceptanceAction*
  		- acceptanceList: *Array of strings*
  		- renterCanRevoke: *boolean*
  		- rentFeeType: *RentFeeAction*
  		- rentFee: *string or number*
  		- rentFeeRounded: *number*
  		- renterCancellationFeeType: *CancellationFeeAction*
  		- renterCancellationFee: *optional string or number : Remove or Set*
  		- renterCancellationFeeRounded: *optional number : Remove or Set*
  		- renteeCancellationFeeType: *CancellationFeeAction*
  		- renteeCancellationFee: *optional string or number : Remove or Set*
  		- renteeCancellationFeeRounded: *optional number : Remove or Set*


- ## ContractCanceledEvent  
	- **Summary:** 
	- **Datas returned:** 
		- nftId: *number*


- ## ContractStartedEvent  
	- **Summary:** 
	- **Datas returned:** 
		- nftId: *number*
		- rentee: *string*


- ## ContractRevokedEvent  
	- **Summary:** 
	- **Datas returned:** 
		- nftId: *number*
		- revokedBy: *string*


- ## ContractOfferCreatedEvent  
	- **Summary:** 
	- **Datas returned:** 
		- nftId: *number*
		- rentee: *string*


- ## ContractOfferRetractedEvent  
	- **Summary:** 
	- **Datas returned:** 
		- nftId: *number*
		- rentee: *string*


- ## ContractSubscriptionTermsChangedEvent  
	- **Summary:** 
	- **Datas returned:** 
		- nftId: *number*
		- period: *number*
  		- maxDuration: *number*
  		- isChangeable: *boolean*
  		- rentFeeType: *string*
  		- rentFee: *string or number*
		- rentFeeRounded: *number*


- ## ContractSubscriptionTermsAcceptedEvent  
	- **Summary:** 
	- **Datas returned:** 
		- nftId: *number*


- ## ContractEndedEvent  
	- **Summary:** 
	- **Datas returned:** 
		- nftId: *number*
		- revokedBy: *string*


- ## ContractSubscriptionPeriodStartedEvent  
	- **Summary:** 
	- **Datas returned:** 
		- nftId: *number*


- ## ContractExpiredEvent  
	- **Summary:** 
	- **Datas returned:** 
		- nftId: *number*