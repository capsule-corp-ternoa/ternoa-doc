---
title: NFT Primitives
sidebar_label: "NFT Primitives"
sidebar_position: 2
---

NFT primitives are the core building blocks or protocols that enable the creation and management of NFTs. It typically includes the technical specifications and standards that define how NFTs are minted, transferred, and stored on the blockchain. NFT primitives serve as the foundation for various NFT applications and platforms, allowing developers to build new and innovative use cases for NFTs. Ternoa currently supports: Auction, Collection, Delegation, Rental, Soulbound Token, and soon Transfer Protocols. 

Learn how to create your own with our [Developer Guides.](https://docs.ternoa.network/for-developers/guides/) 

## Auction

Auctions can be an exciting way to sell an NFT and have it reach the highest selling potential. An auction is a type of sale where the NFT seller sets a minimum price and a time period. Buyers can place bids on the amount they are willing to pay for the NFT as long as they are above the minimum price. At the end of the time period, the NFT is sold to the highest bidder. Auctions can be conducted on-chain, making them transparent and secure, and supporting various features such as creating, canceling, and ending auctions, bidding, removing bids, buying at a fixed price. 

Auctions are valuable for several industries including gaming and entertainment industries to sell digital assets like in-game items and exclusive merchandise. In games, players can bid on unique items, creating excitement and competition. In entertainment, auctions can sell exclusive items related to movies, music, and sports events. Auctioning digital assets like NFTs creates additional revenue and engagement opportunities for companies and fans.

## Collection

Creating a collection for NFTs involves grouping together non-fungible tokens that share a common theme or attribute and organizing them. This allows for easy tracking, management, and trading of NFTs with unique properties and value. Collections are represented by smart contracts in EVM/Smart Contract based systems, but Ternoa allows users to create and own collections with consistent rules, making it easier to group NFTs with similar attributes and improve the user experience.

For example you could create a collection of NFTs that represent your favorite artists, or a collection of NFTs that all have a certain aesthetic. By organizing NFTs in this way, it's easier to keep track of them and showcase them to others. Collections with a common theme or attribute can create a sense of exclusivity and rarity, which can make them more desirable to collectors. 

## Delegation

Ternoa's NFT delegation feature empowers NFT owners to share the utilities of their unique digital assets without giving up ownership. This innovative solution enables users to share the benefits of their NFTs without exchanging any money, maintaining complete ownership rights, and retaining the NFT in their wallet. With Ternoa's NFT delegation, you can confidently share your NFT's capabilities while ensuring that you retain full control over your valuable digital assets.

For example, imagine an artist who has created an NFT, but wants to share that artwork with a museum to display their work. The artist could delegate some of the utilities of the NFT to a gallery, allowing them to display the artwork as part of an exhibition. The artist would still retain full ownership of the NFT, and would be able to revoke the delegation at any time, ensuring that they maintain control over work. This type of NFT delegation could be particularly useful in the art world, where physical exhibitions and events are often used to showcase and promote artists' work. By enabling NFT delegation, artists can extend the reach of their work beyond the digital realm, while still maintaining complete ownership and control over their NFTs.


## Rental

NFT Renting allows individuals to rent NFTs they would like to borrow for a limited amount of time. A borrower can rent an NFT and gain access to exclusive content or experiences. At the same time, an NFT owner can rent their NFT to share its utility and earn passive income seamlessly. We believe Rental NFTs have endless possibilities from leveraging gaming assets, renting prime digital land, gaining access to exclusive music, and so on. 

An NFT rental involves an owner of an NFT and a person who wants to borrow the NFT for a limited or infinite amount of time. The NFT owner/renter develops a contract with the guidelines on price, time period, and cancellation policy. At Ternoa, we support 2 main rental agreements with countless flexible combinations:
- Fixed: Borrower requests NFT and the rental contract is for a fixed amount of time and set price.
- Subscription: Borrower will pay the NFT owner a recurring payment to rent the NFT for a longer period of time

## Soulbound Token
SoulBound Tokens (SBTs), which are a particular type of NFT, but they differ in one major way: they are designed to be transferred only once.

SBTs represent credentials that are permanently tied to a user’s wallet address. For example, a person might have SBTs representing educational credentials, employment history, proof of achievement, or hashes of their writings or works of art. 

SoulBounds are set to disrupt the NFT economy by reducing online manipulation and allowing users to build their reputation with their certified credentials. SoulBounds could come to represent individuals and reflect their unique traits and solidarities as they acquire SBTs that reflect their affiliations, memberships, and credentials. 


With SoulBound Tokens, users can confidently showcase their achievements and skills, creating a verifiable digital identity that represents their unique qualities. This innovative feature has the potential to transform the way we view NFTs and open up new possibilities for users to establish their reputations and access new opportunities in the digital world. SoulBound Tokens are a game-changer for the NFT industry, providing a secure and reliable way for users to represent themselves and their accomplishments in the digital world.

## Transmission Protocols 

Transmission Protocols are a set of rules used by the Ternoa network for secure transmission of NFTs and data between accounts. They offer users the ability to control who can access their data and when. This is achieved through encryption, authentication, and security measures that prevent third-party interference. Users can mint various types of NFTs, choose a Transmission Protocol, and set specific conditions for transferring the NFT. When these conditions are met, the protocol triggers the automatic transfer of the NFT to the designated recipient.

- Big Day Protocol - This protocol allows users to set a specific date for the automatic transfer of their NFTs. With the Big Day Protocol, there are two preset conditions to select from: you can program a specific date for automatic transmission or include a reset option that allows the date to change before transmission. This gives users the flexibility to make changes if needed while ensuring that their NFTs are protected until the designated release time. The Big Day Protocol can be used to coordinate product launches or company announcements by programming the specific transmission date.  It can be used for personal surprises to transmit an NFT gift to arrive on a birthday, anniversary, or holiday. 

- Consent Protocol - This protocol allows users to specify trusted individuals who can access their NFT under emergency or unforeseen circumstances.  To set up the Consent Protocol, users choose specific recipient addresses and set a threshold on number of recipients that need to request access before the protocol is triggered. There is also a Consent at Date Protocol, which works similarly to the Consent Protocol, but with an additional requirement that a specified date must have passed for the protocol to be triggered and the transmission to happen. The Consent Protocol is a powerful tool for distributing assets to beneficiaries, such as a will or trust fund. By requiring a certain number of recipients to trigger the protocol, the Consent Protocol provides a secure and reliable way to ensure that your assets are passed on to the right people at the right time.  




