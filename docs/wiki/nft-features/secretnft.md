---

sidebar_position: 5

---

  

# 🔐 Secret NFT

  

## Simple Summary

NFTs represent proof of ownership on the blockchain. However, the media associated with the NFTs is public in nature and lacks any semblance of privacy whatsoever, thus can be viewed by anyone. Ternoa's Secret NFTs are special in this regard as they support encrypted data. Only the current owner of the secret NFT can view and if required, decrypt the secret NFT at any point of time.

  

## Abstract

Secret NFTs require the generation , exchange and storage of cryptographic keys stored in an OffChain enclave running within a Trusted execution environment. The keys to encrypt and decrypt the data associated with the Secret NFTs are generated within the wallet or dApp, and transferred to the TEE enclave in a securely.

The owner of the NFT can request the TEE enclave to retrieve the decryption key associated with the NFT, and use it to view the unencrypted data. Secret NFTs can be transferred peer-to-peer or traded in marketplaces. As an additional layer of security, TEE enclaves are configured in clusters that support Shamir secret sharing (SSS) scheme.

  

## Motivation

While the blockchain as a public ledger of transactions provides irrefutable proof of ownership of NFTs, it does not meet the data privacy standards needed for many of the NFT use cases we'd wish to implement. Secret NFTs have been designed by Ternoa with this in mind.

Examples of private data that can be stored in NFTs include private images or videos, Digital rights management, private documents with long-term storage such as legal deed containing inheritance details and confidential company details.
___

## 🔎 What is a Secret NFT?

Secret NFTs are an extension of Ternoa's Basic NFTs. The term Basic NFT refers to our native implementation of the [TIP-100](https://github.com/capsule-corp-ternoa/ternoa-proposals/blob/main/TIPs/tip-100-Basic-NFT.md) token standard for Non Fungible Tokens. Unlike Basic NFTs, Secret NFTs support encrypted data.

* A secret NFT can be minted just like a Basic NFT.

* You can also convert existing Basic NFTs into Secret NFTs.

The Secret NFT can be decrypted by the current owner at any point to retrieve the secret data associated with it, post mint or conversion.

Secret NFTs can be used to store confidential data, for example - an image, a song, a document, or any other secured secret in encrypted form.

  
### How Does Secret NFTs Work?

Secret NFTs require the generation, exchange and storage of cryptographic keys stored in an hardware enclave running within a TEE. First the cryptographic keys to encrypt/decrypt the data associated with Secret NFTs and the Secret shares are generated at the time of the minting within the dApp and then transferred to the TEE enclave securely.

After the Data is encrypted, it's stored on decentralized IPFS nodes and the decryption keys are securely stored on OffChain SGX enclaves (which are configured in clusters supporting SSS) which can be present anywhere in the world.

The encryption process involves two to three parties; the Owner, the recipient (if needed) and Ternoa.

- The owner is the party that mints or converts a Basic NFT into a Secret NFT.

- The recipient is at the receiving end for the secure transfer of confidential documents.

- Ternoa provides the user with the technical stack which allows it to cut out the need for any third party intervention and minimizes any single point of failure w.r.t. encryption and OnChain storage of data.

**This ensures End-to-End encryption of the secret associated with the NFT at the time of minting.**

The decryption keys are used to retrieve the secret associated with the NFT and only the owner of the NFT can request the enclave to retrieve the decryption keys and view the unencrypted data.

### Description

While Basic NFTs merely represent ownership, Secret NFT's can contain sensitive information and provide the owner with the option to encrypt, decrypt or access that data.

Leveraging TEEs and Shamir Secret Sharing to bring a confidentiality aspect to the Basic NFT, enables a variety of different use cases across different segments and makes the process more efficient and secure.

We refer to the process of encryption of the secret associated with it or conversion of a Basic NFT to a Secret NFT as cyphering.

With the Secret NFT we have two media stored on decentralized IPFS nodes. The first media is public and can be viewed by anyone OnChain. The second media is secret, the data is encrypted that can only be decrypted by the owner of the Secret NFT.

Like Basic NFTs, Secret NFTs can be transferred peer-2-peer or traded on the secondary market.
  

### Marketplaces which support Secret NFTs

  

* [Stashh](stash.io)

* [Secret Stash](secret-stash.io)
  
___

  

## ✨ Specification


### Lifecycle states

  

>  **Secret NFTs will have the following lifecycle associated with them:**
> 
> Pending Mint -> Minted -> Burned
___

  

### External interfaces

  

Secret NFTs should support the following OnChain interfaces :

  

```rust

interface {

  
/// Interface Id: TIP501-01

/// Description: User can convert an existing Basic NFT into a Secret NFT

/// Constraint(s): Refer to section 'Rules'

add_secret(nft_id: NFTId, secret_offchain_data: BoundedVec<u8, NFTOffchainDataLimit>);

/// Interface Id: TIP501-02

/// Description: User can directly create an on-chain Secret NFT

/// Constraint(s): Refer to section 'Rules'

create_secret_nft(offchain_data: BoundedVec<u8, NFTOffchainDataLimit>, secret_offchain_data: BoundedVec<u8, NFTOffchainDataLimit>, royalty: Permill, collection_id: Option<CollectionId>, is_soulbound: bool);

/// Interface Id: TIP501-03

/// Description: This interface is called by each of the TEE enclaves to confirm receipt of secret share for a given NFT. When all enclaves from a cluster confirm receipt of threshold shares, the secret NFT status goes to 'Minted', after which it can be transferred or listed on marketplace. This is a private interface available only for the enclaves to use

/// Constraint(s): Refer to section 'Rules'

add_secret_share(NFTId  nft_id) 

/// Interface Id: TIP501-04

/// Description: Secret NFT mint fee can be changed through governance

/// Constraint(s): Refer to section 'Rules'

set_secret_nft_mint_fee(fee: u128 (BalanceOf))

}

```

___

### Metadata

The secret NFT is an extension of the Basic NFT. The Basic NFT has its own [metadata](https://github.com/capsule-corp-ternoa/ternoa-proposals/blob/main/TIPs/tip-100-Basic-NFT.md#metadata) that is stored in json format in IPFS. The format for the OffChain metadata of Secret NFT is suggested here :

```json
{
   "title":"(Optional) This the title of the Secret NFT",
   "description":"(Optional) Description of the secret",
   "properties":{
      "encrypted_media":{
         "hash":"media hash",
         "type":"Type of media (file format)",
         "size":"size of the encrypted media"
      },
      "public_key_of_nft": "(Optional) public key associated with the Secret NFT",
   }
}
```

___ 
### Rules and constraints

  

<details  className="toggle">

<summary>add_secret</summary>

<div>

<ul>

<li>  The Basic NFT should not be listed in a marketplace or delegated at the time of  conversion to Secret NFT.</li>

<li> The Secret NFT when minted should initially be set to 'Pending Mint' State. Only when all the secret shares associated with the NFT have been stored in the enclaves, should the Secret NFT move to 'Minted' state.</li>

</ul>

</div>

</details>


<details  className="toggle">

<summary>create_secret_nft</summary>

<div>

<ul>

<li>  The Secret NFT when minted should initially be set to 'Pending Mint' State. Only when all the secret shares associated with the NFT have been stored in the enclaves, should the Secret NFT move to 'Minted' state.</li>

</ul>

</div>

</details>

  

<details  className="toggle">

<summary>add_secret_share</summary>

<div>

<ul>

<li> Only enclaves can use this interface. Not to be used by dApps or users.</li>

<li>When all the secret shares associated with a secret NFT have been confirmed to be received, then the NFT state should be changed from 'Pending Mint' to 'Minted'.</li>

</ul>

</div>

</details>

  

<details  className="toggle">

<summary>convert_basic_to_secret_nft</summary>

<div>

<ul>

<li>  The Basic NFT should not be listed in a marketplace or delegated at the time of conversion to Secret NFT.</li>

<li>The Secret NFT when minted should initially be set to 'Pending Mint' State. Only when all the secret shares associated with the NFT have been stored in the enclaves, should the Secret NFT move to 'Minted' state.</li>

</ul>

</div>

</details>

  

<details  className="toggle">

<summary> create_secret_nft</summary>

<div>

<ul>

<li>The Secret NFT when minted should initially be set to `Pending Mint` State. Only when all the secret shares associated with the NFT have been stored in the enclaves, should the Secret NFT move to `Minted` state.</li>

</ul>

</div>

</details>

  

<details  className="toggle">

<summary>secret_share_received_for_nft</summary>

<div>

<ul>

<li> Only enclaves can use this interface. Not to be used by dApps or users.</li>

<li> When all the secret shares associated with a secret NFT have been confirmed to be received, then the NFT state should be changed from 'Pending Mint' to 'Minted'.</li>

</ul>

</div>

</details>

___


## 🌊 End-to-end workflow (Ternoa-specific)

  
<details  className="toggle">

<summary>Mint Secret NFTs</summary>

<div>

<p>The proposed workflow for minting secret NFTs :</p>

<ol>

<li>1.  User selects a media to be stored privately in a secret NFT.</li>

<li>2.  The wallet or dApp use the Ternoa SDK to generate a key pair for each NFT..</li>

<li>3.  The public key of the generated key-pair is used to encrypt the secret data.</li>

<li>4.  The encrypted secret data is stored On-Chain via IPFS and its Content ID (CID) is recorded.</li>

<li>5.  The CID of the encrypted secret data is used to reconstruct the Off-Chain metadata json file</li>

<li>6.  The Off-Chain metadata file is stored on IPFS, and its content id (CID) is used to trigger an extrinsic event (txn) on the blockchain to mint a secret NFT.</li>

<li>7.  The ID of the new NFT is obtained from the blockchain by the wallet/dApp using the [Ternoa SDK](https://github.com/capsule-corp-ternoa/ternoa-js).</li>

<li>8.  The secret key used to encrypt the secret data is split into shares using a threshold secret scheme (such as Shamir Secret Shares).</li>

<li>9.  Discovery of enclave locations (TBD)</li>

<li>10.  1.  Each threshold share is then stored on a different enclave along with the associated `NFT ID`. The number of threshold shares of the encryption key should be equal to the number of TEE enclaves running as OffChain components.</li>

<li>11.  Each TEE enclaves then posts a transaction on the blockchain confirming receipt of the secret share for a given NFT.</li>

</ol>

</div>

</details>



<details  className="toggle">

<summary>View Secret NFT</summary>

<div>

<p>The following is the workflow proposed for viewing a secret NFT by the owner :</p>

<ol>

<li>1.  User requests the wallet or dApp to decrypt the data associated with the NFT owned by them.</li>

<li>2.  The wallet/dApp sends a request to each enclave with a signature generated from the user's account key, asking for the secret share associated with a given NFT.</li>

<li>3.  The TEE enclave verifies if the requestor of the secret share is the owner of the NFT. Invalid requests are rejected. If the ownership is successfully verified from the blockchain, the secret share is sent to the requesting wallet/dApp.</li>

<li>4.  The wallet/dApp receives the minimum threshold of shares from the set of available enclaves, and reconstructs the encryption key for the secret.</li>

<li>5.  The encryption key is used to retrieve the original secret from IPFs which is then displayed to the user.</li>

</ol>

</div>

</details>
  

<details  className="toggle">

<summary>TEE characteristics </summary>

<div>

<p>The enclave program should run within a TEE environment with the following characteristics :</p>

<ol>

<li>1.  The enclave program is deployed on a set of TEE-enabled hardware. It is recommended to have a minimum set of 5 TEE machines running in a cluster.</li>

<li>2.  The enclave program should support interfaces to store and retrive secrets. The details of the interfaces provided by the TEE enclave program is described later in this section.</li>

<li>3.  The enclave program should support remote attestation, which is a servie offered by the TEE processor vendor.</li>

<li>4.  Each of the TEE machines should store one of the secret shares associated with an NFT. If the TEE cluster comprises of 5 machines as recommended, there would be a set of five secret shares generated each of which is stored on one of the TEE machines through a request to the TEE enclave program.</li>

<li>5.  There should be a stand-by TEE cluster of 5 machines that can be manually activated if the primary TEE cluster malfunctions. There should be ability for the secret shares stored in the primary TEE cluster to be securely transferred to the backup TEE cluster, so that the secondary TEE cluster can be activated in case of contingencies.</li>

</ol>

</div>

</details>

___

## Test cases
 
*  User can mint a secret NFT directly.
*  User can convert a Basic NFT to secret NFT.
*  Owner can decrypt and view the secret associated the secret NFT.
*  User can list and trade a secret NFT in the secondary marketplace.

## References

TBD

  

## Copyright

TBD