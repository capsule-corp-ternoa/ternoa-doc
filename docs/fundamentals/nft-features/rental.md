---
sidebar_position: 4
---

# 🤝 Rental

## Simple Summary
NFTs represent proof of ownership on the blockchain. **Renting is a powerful tool for the NFT owners to make more out of their NFTs.** An NFT rental agreement is an on chain rental contract, between the owner of an NFT and a renter (usually called rentee) who will have a temporary access to the NFT properties, against a rent fee (an amount or an NFT).

## Abstract
Rental Contract are a way to spread the use of an NFT and earning money without loosing its ownership. An NFT owner can set his NFT as a rental contract and start renting it to anyone. Rental contract are mostly customizable to cover most common rental usecases. 

## Motivation
Rental contracts have so many usecases in the real world that could be adapted to the NFTs. While the main purpose of renting an NFT is to easily empower any projects to get the best utility of an NFT by spreading its features to everyone, it is also a great way to cover many real world sucessful usecases. And if rental NFT are already popular in the gaming industry, the tractions it gains in many other filed is truely relevant to our web 3 ecosystem (events-tickets, music, sport, subscription...).

___

## 🔎 What is NFT Lending?
NFT lending is very similar to the cryptocurrency industry’s  P2P loans. However, unlike P2P lending, where individuals lend each other credit in a decentralized setup, NFT lending often functions via a middle man, the NFT lending platform.

NFT lending is, therefore, the opportunity to access loans with NFT’s as collateral. In other words, it is the practice of putting your NFT up as collateral for loans. NFT crypto lending is accessing crypto loans against NFT collateral.

Through NFT loans, lenders can access passive income from loan interest payments. On the other hand, borrowers can enjoy more liquidity on their holdings until they are ready to sell their CryptoPunks or BAYCs.

### How Does NFT Lending Work?
 The NFT lending process involves three parties; the lender, the borrower, and the lending platform.

- The lender is the party that lends its crypto assets in exchange for interest.
- The borrower borrows a loan from a lender against an NFT.
- The lending platform is the middle man. The platform also holds NFT collateral until the loan is repaid in escrow.

### Description
NFT lending is the process of lending and/or borrowing money by using NFTs (Non-fungible token) as a collateral of the loans made. This process is managed by lending platforms, that we will discuss today in this article about the Best NFT Lending Platforms.

The NFT lending process is part of the larger topic of Crypto Lending, that uses the same principle but with “standard” cryptos as a collateral.

**This is the usual process during an NFT lending situation:**

- **Borrowers** use their NFTs as a collateral of their loan request, that will be locked (in the platform smart contract) once the loan money is issued
-**Lenders**, on their side, can accept to loan the money to the borrower in exchange of interests (usually paid in crypto such as ETH).
- Once the **borrower** repays the loan and the interests to the lender, he receives back his NFT
_ If the **borrower** doesn’t pay back his loan, the NFT is given to the lender

### The Best NFT Lending Platforms

 | **Rank**  | **Name**  | **Country** | **Collection**  | **Currency** | **Lend**  | **Borrow** | **Rates** | **LVT** 
| ----------- | ----------- | ----------- | ----------- | ----------- | ----------- | ----------- | ----------- | ----------- 
| **1** | **[NFTFI](https://www.nftfi.com/)** | South Africa | CryptoPunks, Bored Ape, Mutant Ape, Art Blocks, Autoglyphs, ... | ETH, DAI | Yes | Yes | 20-80% | up to 50%
| **2** | **[Arcade](https://www.arcade.xyz/)** | US | ? | 	wETH, USDC, DAI | Yes | Yes | 5-60% | ? 
| **3** | **[NEXO](https://nexo.io/nft-lending)** | UK | CryptoPunks, Bored Ape | ETH, stablecoins | - | Yes | 12-15% | 10-20%
| **4** | **[Drops](https://drops.co/)** | Undefined | ? | - | Yes | Yes | ? | up to 80%

___

## ✨ Specification

### Lifecycle states

> **Rental NFTs will have the following lifecycle associated with them:**
>
> Contract Created -> Contract Rented -> _**Contract Updated**_ * -> Contract Ended/Revoked.
>
>**_Optionnal in the Rental NFTs lifecycle._**

___

### External interfaces

Rental NFT should support the following onchain interfaces:

```rust
interface {
  /// Interface Id: TIP400-01
  /// Description: The Caller creates a renting contract out of his NFT.
  /// Constraint(s): Refer to section 'Rules'
  /// Result(s): Refer to section 'Results'
  create_contract(nft_id: NFTId, duration: Duration, acceptance_type: AcceptanceType, renter_can_revoke: bool,  rent_fee: RentFee, renter_cancellation_fee: Option<CancellationFee>, rentee_cancellation_fee: Option<CancellationFee>);
  
  /// Interface Id: TIP400-02
  /// Description: The Caller revokes a running contract.
  /// Constraint(s): Refer to section 'Rules'
  /// Result(s): Refer to section 'Results'
  revoke_contract(nft_id: NFTId);

  /// Interface Id: TIP400-03
  /// Description: The Caller cancel a non-running contract.
  /// Constraint(s): Refer to section 'Rules'
  /// Result(s): Refer to section 'Results'
  cancel_contract(nft_id: NFTId);

  /// Interface Id: TIP400-04
  /// Description: The Caller accepts a existing non-running contract.
  /// Constraint(s): Refer to section 'Rules'
  /// Result(s): Refer to section 'Results'
  rent(nft_id: NFTId);

  /// Interface Id: TIP400-05
  /// Description: The Caller creates a offer for an existing non-running contract.
  /// Constraint(s): Refer to section 'Rules'
  /// Result(s): Refer to section 'Results'
  make_rent_offer(nft_id: NFTId);

  /// Interface Id: TIP400-06
  /// Description: The Caller accepts a offer for an existing non-running contract.
  /// Constraint(s): Refer to section 'Rules'
  /// Result(s): Refer to section 'Results'
  accept_rent_offer(nft_id: NFTId);

  /// Interface Id: TIP400-07
  /// Description: The Caller removes his offer.
  /// Constraint(s): Refer to section 'Rules'
  /// Result(s): Refer to section 'Results'
  retract_rent_offer(nft_id: NFTId)

  /// Interface Id: TIP400-08
  /// Description: The Caller changes the subscription terms.
  /// Constraint(s): Refer to section 'Rules'
  /// Result(s): Refer to section 'Results'
  change_subscription_terms(nft_id: NFTId, period: BlockNumber, max_duration: Option<BlockNumber>, rent_fee: Balance, changeable: bool)

  /// Interface Id: TIP400-09
  /// Description: The Caller accepts the changed subscription terms.
  /// Constraint(s): Refer to section 'Rules'
  /// Result(s): Refer to section 'Results'
  accept_subscription_terms(nft_id: NFTId)
}
```
___
### Rules and constraints

<details className="toggle">
  <summary>Create Contract Interface</summary>
  <div>
    <ul>
      <li>Provided NFT MUST be owned by the Caller.</li>
      <li>Provided NFT MUST NOT be in the following states: Capsule, ListedForSale, Delegated, Soulbound, Rented.</li>
      <li>Provided Rent NFT Fee MUST exist.</li>
      <li>Provided Renter Cancellation NFT Fee MUST be owned by the Caller.</li>
      <li>Provided Renter Cancellation Token Fee MUST be less then the free balance of Caller.</li>
      <li>Provided Rentee Cancellation NFT Fee MUST exist.</li>
    </ul>
  </div>
</details>

<details className="toggle">
  <summary>Revoke Contract Interface</summary>
  <div>
    <ul>
      <li>There MUST be a contract for the provided NFT.</li>
      <li>The Contract MUST be running.</li>
      <li>The Caller MUST be a contract participant (either the renter or rentee)..</li>
      <li>If the Caller is the Contract owner, the Contract MUST allow for renter to revoke contracts.</li>
    </ul>
  </div>
</details>

<details className="toggle">
  <summary>Cancel Contract Interface</summary>
  <div>
    <ul>
      <li>There MUST be a contract for the provided NFT.</li>
      <li>The Contract MUST NOT be running.</li>
      <li>The Caller MUST be the owner of the contract.</li>
    </ul>
  </div>
</details>

<details className="toggle">
  <summary>Rent Interface</summary>
  <div>
    <ul>
      <li>There MUST be a contract for the provided NFT.</li>
      <li>The Contract MUST NOT be running.</li>
      <li>The Contract MUST have the acceptance_type set to Automatic</li>
      <li>The Caller MUST NOT be the owner of the contract.</li>
      <li>If a whitelist exists, the Caller MUST be whitelisted.</li>
      <li>If the Rent Fee is an NFT, the Caller MUST own that NFT.</li>
      <li>If the Rent Fee is an NFT, the NFT MUST NOT be in the following states: Capsule, ListedForSale, Delegated, Soulbound, Rented.</li>
      <li>If the Rent Fee is of Token type, the Caller MUST have enough balance to pay for it.</li>
      <li>If a Cancellation NFT Fee exists, the Caller MUST own that NFT.</li>
      <li>If a Cancellation NFT Fee exists, the NFT MUST NOT be in the following states: Capsule, ListedForSale, Delegated, Soulbound, Rented.</li>
      <li>If a Cancellation Token Fee exists, the Caller MUST have enough balance to pay for it.</li>
    </ul>
  </div>
</details>

<details className="toggle">
  <summary> Make Rent Offer Interface</summary>
  <div>
    <ul>
      <li>There MUST be a contract for the provided NFT.</li>
      <li>The Contract MUST NOT be running.</li>
      <li>The Contract MUST have the acceptance_type set to Manual</li>
      <li>The Caller MUST NOT be the owner of the contract.</li>
      <li>If a whitelist exists, the Caller MUST be whitelisted.</li>
      <li>If the Rent Fee is an NFT, the Caller MUST own that NFT.</li>
      <li>If the Rent Fee is an NFT, the NFT MUST NOT be in the following states: Capsule, ListedForSale, Delegated, Soulbound, Rented.</li>
      <li>If the Rent Fee is of Token type, the Caller MUST have enough balance to pay for it.</li>
      <li>If a Cancellation NFT Fee exists, the Caller MUST own that NFT.</li>
      <li>If a Cancellation NFT Fee exists, the NFT MUST NOT be in the following states: Capsule, ListedForSale, Delegated, Soulbound, Rented.</li>
      <li>If a Cancellation Token Fee exists, the Caller MUST have enough balance to pay for it.</li>
    </ul>
  </div>
</details>

<details className="toggle">
  <summary> Accept Rent Offer Interface</summary>
  <div>
    <ul>
      <li>There MUST be a contract for the provided NFT.</li>
      <li>The Contract MUST NOT be running.</li>
      <li>The Contract MUST have the acceptance_type set to Manual</li>
      <li>The Caller MUST be the owner of the contract.</li>
      <li>If the Rent Fee is an NFT, the Offer-Owner MUST own that NFT.</li>
      <li>If the Rent Fee is an NFT, the NFT MUST NOT be in the following states: Capsule, ListedForSale, Delegated, Soulbound, Rented.</li>
      <li>If the Rent Fee is of Token type, the Offer-Owner MUST have enough balance to pay for it.</li>
      <li>If a Cancellation NFT Fee exists, the Offer-Owner MUST own that NFT.</li>
      <li>If a Cancellation NFT Fee exists, the NFT MUST NOT be in the following states: Capsule, ListedForSale, Delegated, Soulbound, Rented.</li>
      <li>If a Cancellation Token Fee exists, the Offer-Owner MUST have enough balance to pay for it.</li>
    </ul>
  </div>
</details>

<details className="toggle">
  <summary>Retract Rent Offer Interface</summary>
  <div>
    <ul>
      <li>There MUST be a offer-queue for the provided NFT.</li>
      <li> The Caller MUST have an offer for that provided NFT.</li>
    </ul>
  </div>
</details>

<details className="toggle">
  <summary>Change Subscription Terms Interface</summary>
  <div>
    <ul>
      <li>There MUST be a contract for the provided NFT.</li>
      <li>The Caller MUST be the owner of the contract.</li>
      <li>The Contract MUST be of type subscription.</li>
      <li>The Contract MUST allow for changes in subscription terms.</li>
    </ul>
  </div>
</details>

<details className="toggle">
  <summary>Accept Subscription Terms Interface</summary>
  <div>
    <ul>
      <li>There MUST be a contract for the provided NFT.</li>
      <li>The Contract MUST be running.</li>
      <li>The Caller MUST be rentee of the contract..</li>
      <li>The Contract subscription terms MUST have been changed.</li>
    </ul>
  </div>
</details>

___

### Duration, Rent Fee and Cancellation Fee
- Duration of type Subscription MUST NOT use a NFT Rent Fee.
- Only Duration of type Fixed MAY use the Flexible Token Cancellation Fee

___

### Results
#### Create Contract Interface
- Provided NFT MUST be in state `Rented`.
- Provided Renter Cancellation NFT Fee MUST change its ownership to escrow account.
- Provided Renter Cancellation Token Fee MUST be taken from the Caller and send to a escrow account.
#### Revoke Contract Interface
- Provided NFT MUST NOT be anymore in state `Rented`.
- The existing contract MUST be burned.
- Provided Caller Cancellation Fee MUST be given to the the damaged party.
- Provided Damaged Party Cancellation Fee MUST be returned to the damaged party.
#### Cancel Contract Interface
- Provided NFT MUST NOT be anymore in state `Rented`.
- The existing contract MUST be burned.
- Provided Cancellation Fee MUST be given back to the Caller.
#### Rent Interface
- The existing contract MUST contain the Caller's address as Rentee.
- The existing contract MUST contain the start block.
- Provided Rent NFT Fee MUST change its ownership to the contract owner address.
- Provided Rent NFT Token Fee MUST be taken from Caller and send to contract owner address.
- Provided Renter Cancellation NFT Fee MUST change its ownership to escrow account.
- Provided Renter Cancellation Token Fee MUST be taken from the Caller and send to a escrow account.
#### Make Rent Offer Interface
- Offers related to the contract MUST contain the Callers address.
#### Accept Rent Offer Interface
- The existing contract MUST contain the Offer-Owner's address as Rentee.
- The existing contract MUST contain the start block.
- Provided Rent NFT Fee MUST change its ownership to the contract owner address.
- Provided Rent NFT Token Fee MUST be taken from Offer-Owner and send to contract owner address.
- Provided Renter Cancellation NFT Fee MUST change its ownership to escrow account.
- Provided Renter Cancellation Token Fee MUST be taken from the Offer-Owner and send to a escrow account.
#### Retract Rent Offer Interface
- Offers related to the contract MUST NOT contain the Callers address.
#### Change Subscription Terms Interface
- Contract MUST be updated with the new subscription and rent values
- Contract MUST be marked as changed.
#### Accept Subscription Terms Interface
- Contract MUST be marked as not-changed.

___

### Rented State
If an NFT is in Rented state it means that the NFT renter cannot call any extrinsic (this includes but is not limited to: Transfer, Burn, List, Auction,...) on it besides the `cancel_contract` or `revoke_contract`.
If an NFT is in Rented state it means that the NFT rentee cannot call any extrinsic (this includes but is not limited to: Transfer, Burn, List, Auction,...) on it besides the `revoke_contract`.

___

## 🌊 End-to-end workflow (Ternoa-specific)

<details className="toggle">
  <summary>Create Contract</summary>
  <div>
  <p>Prerequisites: The User owns an NFT that is in the right state (NOT Capsule, ListedForSale,  Delegated, Soulbound, Rented).</p>
    <ol>
      <li>The User decides if he wants to have a Fixed Term or a Subscription Term contract.</li>
      <li>The user decides if he wants to use auto acceptance (the first offer is immediately accepted) or manual acceptance (the users chooses which offer to accept).</li>
      <li>The User decides if he wants to introduce a whitelist where only certain accounts can send offers or rent.</li>
      <li>The User decides if he wants to have a contract where he can or cannot cancel it.</li>
      <li>The User decides if he wants for the Subscription Term to be changeable or not.</li>
      <li>The User decides if he wants to specify a Token based or NFT based Rent Fee.</li>
      <li>The User decides if he wants to specify the Renter cancellation fee. It can be either Token based, NFT based or Token-Flexible based.</li>
      <li>The User decides if he wants to specify the Rentee cancellation fee. It can be either Token based, NFT based or Token-Flexible based.</li>
      <li>The User calls the `create_contract` interface and then the contract is created.</li>
    </ol>
  </div>
</details>

<details className="toggle">
  <summary>Revoke Contract</summary>
  <div>
  <p>Prerequisites: A running contract already exists for the observed NFT.</p>
    <ol>
      <li>The User decides if it is acceptable to lose the cancellation fees.</li>
      <li>The User calls the <code>revoke_contract</code> interface and then the contract is revoked.</li>
    </ol>
  </div>
</details>

<details className="toggle">
  <summary>Cancel Contract</summary>
  <div>
  <p>Prerequisites: A non-running contract already exists for the observed NFT.</p>
    <ol>
      <li>The User decides if he doesn't want to make his NFT available for rent.</li>
      <li>The User calls the <code>cancel_contract</code> interface and then the contract is canceled.</li>
    </ol>
  </div>
</details>

<details className="toggle">
  <summary>Rent Contract</summary>
  <div>
  <p>Prerequisites: A non-running contract already exists for the observed NFT.</p>
    <ol>
      <li>The User decides if he wants to rent the observed NFT.</li>
      <li>The User decides if the rent fee requirement is acceptable.</li>
      <li>The User decides if the cancellation fee requirement is acceptable.</li>
      <li>The User decides if the contract as a whole is acceptable.</li>
      <li>The User calls the <code>rent</code>interface and then the contract is signed and active and he "get's" the NFT.</li>
    </ol>
  </div>
</details>

<details className="toggle">
  <summary>Make Rent Offer</summary>
  <div>
  <p>Prerequisites: A non-running contract already exists for the observed NFT.</p>
    <ol>
      <li>The User decides if he wants to rent the observed NFT.</li>
      <li>The User decides if the rent fee requirement is acceptable.</li>
      <li>The User decides if the cancellation fee requirement is acceptable.</li>
      <li>The User decides if the contract as a whole is acceptable.</li>
      <li>The User calls the <code>make_rent_offer</code>interface and then waits for the offer to be accepted or declined.</li>
    </ol>
  </div>
</details>

<details className="toggle">
  <summary>Accept Rent Offer</summary>
  <div>
  <p>Prerequisites: A non-running contract already exists for the observed NFT. Offers exists for that contract.</p>
    <ol>
      <li>The User decides if he wants to accept a existing offer.</li>
      <li>The User calls the <code>accept_rent_offer</code> interface and then the NFT becomes rented.</li>
    </ol>
  </div>
</details>

<details className="toggle">
  <summary>Retract Rent Offer</summary>
  <div>
  <p>Prerequisites: A non-running contract already exists for the observed NFT. Offers exists for that contract.</p>
    <ol>
      <li>The User decides if he wants to retract his existing offer.</li>
      <li>The User calls the <code>retract_rent_offer</code> interface and then his offer is removed.</li>
    </ol>
  </div>
</details>

<details className="toggle">
  <summary>Change Subscription Terms</summary>
  <div>
  <p>Prerequisites: A Contract already exists for the observed NFT. </p>
    <ol>
      <li>The User decides if he wants to change the current subscription terms.</li>
      <li>The User calls the <code>change_subscription_terms</code> interface and then waits for the rentee to either accept it or decline it.</li>
    </ol>
  </div>
</details>

<details className="toggle">
  <summary>Accept Subscription Terms</summary>
  <div>
  <p>Prerequisites: A Contract already exists for the observed NFT.</p>
    <ol>
      <li>The User decides if he wants to accept the changes to the subscription terms.</li>
      <li>The User calls the <code>accept_subscription_terms</code> interface and then he will pay the new price starting from the next period.</li>
    </ol>
  </div>
</details>

___
## Test cases

* NFT Owner can create a Rental Contract
* Rentee can rent contract directly 
* Rentee can make an offer on a contract
* Rentee can remove the contract offer
* Renter can accept an offer
* Renter can update subscription terms contract
* Rentee can accept new subscritpion terms contract
* Rentee can revoke contract
* Renter can revoke contract (if allowed and if not allowed)
* Renter can cancel contract
 
## References
TBD

## Copyright
TBD