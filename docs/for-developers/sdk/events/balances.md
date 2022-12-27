---
sidebar_position: 7
sidebar_label: Balances
---

# Balances

The Balances events like Deposit, Withdraw, Transfer...

- ## BalancesWithdrawEvent 
	- **Summary:** Some amount was withdrawn from the account
	- **Datas returned:** 
		- who: *string as AccountId32*
  		- amount: *string as u128*
  		- amountRounded: *number*

- ## BalancesDepositEvent 
	- **Summary:** Some amount was deposited.
	- **Datas returned:** 
		- who: *string as AccountId32*
  		- amount: *string as u128*
  		- amountRounded: *number*

- ## BalancesTransferEvent 
	- **Summary:** Transfer succeeded.
	- **Datas returned:** 
  		- from: *string as AccountId32*
		- to: *string as AccountId32*
  		- amount: *string as u128*
  		- amountRounded: *number*

- ## BalancesEndowedEvent
	- **Summary:** An account was created with some free balance
	- **Datas returned:** 
  		- account: *string as AccountId32*
		- to: *string as AccountId32*
  		- freeBalance: *string as u128*
  		- freeBalanceRounded: *number*
