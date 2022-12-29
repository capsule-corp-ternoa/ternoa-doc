---
sidebar_position: 9
sidebar_label: Utility
---

# Utility

The Utility events like ItemCompleted, BatchInterrupted or BatchCompleted

- ## ItemCompletedEvent
	- **Summary:** A single item within a Batch of dispatches has been completed with no error.
	- **Datas returned:** 
  		- This is an empty event : it does not return any specific event.

- ## BatchInterruptedEvent
	- **Summary:** Batch of dispatches did not complete fully. Index of first failing dispatch given, as well as the error.
	- **Datas returned:** 
		- index: *number*
		- error: *object*
			- module: *object*
			  -	index: *number*
			  - error: *string*
  		- errorType: *optional string*
  		- details: *optional string*

- ## BatchCompletedEvent 
	- **Summary:** Batch of dispatches completed fully with no error.
	- **Datas returned:** 
  		- This is an empty event : it does not return any specific event.