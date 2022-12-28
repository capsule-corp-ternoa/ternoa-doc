---
sidebar_position: 5
sidebar_label: Rent
---

# Rent

The Rental events


- ## ContractCreatedEvent  
	- **Summary:**  A rental contract has been created on the chain for an NFT.
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
	- **Summary:** A rental contract that is not running has been cancelled.
	- **Datas returned:** 
		- nftId: *number*


- ## ContractStartedEvent  
	- **Summary:** A running contract has started.
	- **Datas returned:** 
		- nftId: *number*
		- rentee: *string*


- ## ContractRevokedEvent  
	- **Summary:** A running contract has been revoked.
	- **Datas returned:** 
		- nftId: *number*
		- revokedBy: *string*


- ## ContractOfferCreatedEvent  
	- **Summary:** An offer has been made for an available contract.
	- **Datas returned:** 
		- nftId: *number*
		- rentee: *string*


- ## ContractOfferRetractedEvent  
	- **Summary:** A rent offer has been retracted for manual acceptance contract.
	- **Datas returned:** 
		- nftId: *number*
		- rentee: *string*


- ## ContractSubscriptionTermsChangedEvent  
	- **Summary:** The subscription terms has been changed for subscription contracts.
	- **Datas returned:** 
		- nftId: *number*
		- period: *number*
  		- maxDuration: *number*
  		- isChangeable: *boolean*
  		- rentFeeType: *string*
  		- rentFee: *string or number*
		- rentFeeRounded: *number*


- ## ContractSubscriptionTermsAcceptedEvent  
	- **Summary:** The subscription terms has been accepted for subscription contracts.
	- **Datas returned:** 
		- nftId: *number*


- ## ContractEndedEvent  
	- **Summary:** A running contract has ended.
	- **Datas returned:** 
		- nftId: *number*
		- revokedBy: *string*


- ## ContractSubscriptionPeriodStartedEvent  
	- **Summary:** The subscription period has started for subscription contracts.
	- **Datas returned:** 
		- nftId: *number*


- ## ContractExpiredEvent  
	- **Summary:** A running contract has expired.
	- **Datas returned:** 
		- nftId: *number*