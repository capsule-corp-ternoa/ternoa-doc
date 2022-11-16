---
sidebar_position: 4
---

# Threat Model

Our priority is to ensure the confidentiality of user data hosted by an untrusted server node. We assume a strong adversary with privileged access to OS and storage, who can not only monitor the content of all server’s memory, disk and communication, but also actively tamper with it. However, the adversary cannot access enclaves provided by TEE.

In particular, data and computation inside an enclave are protected with respect to the confidentiality and integrity. We exclude TEE side-channel attacks from our scope, since these vulnerabilities are implementation specific and we can adopt more secure TEEs when needed. We do not consider the confidentiality of metadata and coarse statistical properties, such as the name of files and urls, and the length of values. In addition, we do not pursue strict indistinguishability of encrypted data and storage operations, since it usually leads to impractical performance penalty.

Instead, we aim to provide operational data confidentiality where the information that the adversary learns is a function of data operations that have been performed. Since the adversary do not have the Data Encryption Key (DEK), it cannot perform arbitrary data operations of its choice. Note that other security guarantees, such as data integrity and protection from denial of service or TEE/Adversaries collusion, should be considered by designers. In fact, the complexity of additionally protecting data integrity also depends on the design choices.
