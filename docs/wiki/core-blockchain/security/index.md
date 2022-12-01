---
sidebar_position: 1
sidebar_label: Security
---

# Security

By Integrating Storage and Computing protocols, we've designed our network to provide cutting edge decentralized tech for NFTs. We ensure true ownership of data and assets via decentralization of key encryption management. Ternoa protocol handles Key re-encryption and registeration requests from the Computing protocol.

## Ternoa Protocol

Sealed Secret keys are stored on both the Ternoa and Computing protocols by their enclaves using Trusted Execution Environment (TEEs). Only the enclave can claim ownership of the keys at any given point of time.

No individual or entity {even a central one} can access the NFT Encryption Key apart from the current owner. The *EncKey* of the NFT can be wiped after each upload/download.

## Storage Protocol

Our Storage Layer is a decentralized storage network which can be used to store {secure} encrypted private data if {needed/the need arises}. We currently support Inter Planetary File System (IPFS) and Arweane whereas support for other storage networks on the Polkadot ecosystem such as Crust will be accessible soon.

As Ternoa doesn't support native file storage, the need for a dedicated, decentralized storage {network/layer} became paramount. Ternoa's chain architecture being developed on the Polkadot substrate framework allows interoperability with existing {networks/blockchains}. This allows Data ownership management on decentralized storage networks along with Seamless data storage experience. This approach to storage is the most advantageous in terms of security and resilience. This functionality also opens the doors for a variety of B-to-B and B-to-C use cases.

## Computing Protocol

functions like Key generation, Key agreement and Shamir secret sharing are executed in enclaves to make sure that the Keys are never available to anyone outside of the enclave.

Enclaves are in a nutshell, private regions which have the ability to protect their contents in such a way that they can't be read or saved by any outside processes. This ability of an enclave to protect its environment in such a way is called Trusted Execution Environment (TEE). TEE is essentially Hardware-level privacy with a low runtime overhead {which makes sure it doesn't take a huge computational hit}.

TEEs encrypt the enclaves and then decrypt them on the fly, but only within the cpu, and even then only for code and data running from within the enclave itself. The processor thus protects the code from being spied on or examined by other code.

This capability in today’s processors is called Secure Execution Environment for AMD, Software Guard Extension for Intel and Secure Execution for IBM. 

Certified master nodes on our network will take advantage of the inbuilt capabilities of these processors to establish TEEs. This, in turn sheild the nodes from malicious code. It offers a secure environment within the processor which protects both the confidentiallity and Integrity of the Data inside of it which is especially important for zero trust networks like ternoa. We've named them **Secret nodes** due to obvious reasons 😅 . 
