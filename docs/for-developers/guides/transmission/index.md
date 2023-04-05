---
sidebar_position: 6
sidebar_label: Transmission Protocols
---

# Transmission Protocols

Ternoa provides you with many advanced NFT features. Not only creating an NFT can be done in just a few lines of code but we also cover many NFT advanced use cases: Ternoa allows you to easily create functions to rent, auction, or even add secrets to your NFTs without using any smart contracts. Among those advanced features, Ternoa introduces a new concept when using your NFT: the Transmission Protocols.

## What are Transmission Protocols?

Ternoa responds to existing centralized storage solutions by using a capsule or secret NFTs and offers a new solution for secure data transmission: the transmission protocols. Existing storage solutions are limited and do not provide automated transfer services. Ternoa has created transmission protocols to be able to change the state and ownership of a digital asset (NFT) automatically after a specific condition has been met.

## Transmission Protocols features

<details className="toggle">
  <summary>Setting one of the four transmission protocols</summary>
   <ul>
        <li>AtBlock: The Date Protocol </li>
        <li>AtBlockWithReset: The Date with countdown reset Protocol </li>
        <li>OnConsent: The Consent Protocol </li>
        <li>OnConsentAtBlock: The Consent at Date Protocol </li>
    </ul>
    <a to="/for-developers/guides/transmission/set-protocol" className='button purpleBtn noUnderline my2'>
      View code
    </a>
</details>

<details className="toggle">
  <summary>Reseting the timer of the Date with Countdown Protocol</summary>
  <div>
    It resets the timer countdown for AtBlockWithReset (Date with countdown) protocol.
  </div>
</details>

<details className="toggle">
  <summary>Removing a transmission protocol</summary>
  <div>
    It removes a transmission protocol from an NFT.
  </div>
</details>

<details className="toggle">
  <summary>Adding consent to the Consent Protocol</summary>
  <div>
    It adds user consent to transmit the NFT: for users specified in the account list.
  </div>
</details>
