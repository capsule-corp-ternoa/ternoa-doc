---
sidebar_position: 8
sidebar_label: System
---

# System
- ## ExtrinsicFailedEvent 
	- **Summary:** An extrinsic failed.
	- **Datas returned:** 
		- dispatchError: *object*
			- module: *object*
			  -	index: *number*
			  - error: *string*
  		- errorType: *optional string*
  		- details: *optional string*
  		- dispatchInfo: *object*
			- weigth: *string*
			- class: *string*
			- paysFee: *string*

- ## ExtrinsicSuccessEvent
	- **Summary:**  An extrinsic completed successfully.
	- **Datas returned:** 
  		- dispatchInfo: *object*
			- weigth: *string*
			- class: *string*
			- paysFee: *string*

- ## NewAccountEvent
	- **Summary:**  A new account was created.
	- **Datas returned:** 
  		- account: *string as AccountId32*