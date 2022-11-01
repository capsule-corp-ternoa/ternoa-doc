---
sidebar_position: 2
---

# TEE Design

The architecture proposed involves storage and retrieval of keys in a trusted execution environment (TEE) which is an offchain component associated with the secret NFT solution. TEE programs running on processors such as SGX provide strong trust guarantees in terms of data privacy and verification of the programs running within them. This can be achieved through techniques such as remote attestation that gives assurance that the program running inside the enclave is running on genuine TEE hardware (such as SGX), and the programs have not been modified by the TEE node operators. Data storage on TEEs are also secured by sealing them with the secure keys associated with the TEE hardware and/or author of the TEE programs.

As an offchain extension of Key Management, Secure Computation and Confidential Storage for blockchains, there are at least five responsibilities of TEE :

    Using Remote Attestation mechanism to prove the genuinity of hardware and the codes running on it to be approved by blockchain validators and registered on the blockchain

    Validation of the offchain requests from the application, comparing to onchain data (i.e NFT ownership)

    Processing the application request in a secure environment (i.e sealing the secrets)

    Providing the blockchain with verified offchain data gathered from application (i.e availablity of encryption key for secure NFT)

    Secure distributed backup and secure migration of secrets to other TEE machines
