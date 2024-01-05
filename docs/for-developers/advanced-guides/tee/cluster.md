---
sidebar_position: 2
sidebar_label: Handling clusters
---

# Introduction to TEE clusters in the Ternoa JS SDK

If you are not familiar with Ternoa TEE architecture for privacy yet, we strongly recommand you to look at the following sections of the documpentation and apprehend the keys concepts:

- [User workflow to interact with the cluster's enclaves.](/litepaper/Data%20Privacy%20Network/user-workflow)
- [What enclaves are?](/wiki/key-concepts#enclave)
- [Secure Environment with the TEE.](/wiki/core-blockchain/tee)
- [Ternoa privacy architecture.](/litepaper/Architecture/privacy)

The slimmest shortcut to resume the flow to encrypt and store content could be the following one:

_The Secret or Capsule creation process involves to encrypt content before uploading it on [IPFS](/for-developers/developer-tools/ipfs-quick-guide). User's content is secured using a set of private & public keys, the Ternoa chain and the TEE. Content is encrypted with the public key, while the private key is split into 5 shamir shares and stored in the TEE Cluster containing 5 enclaves._

Now, let's see how to select a cluster.

## How to choose a cluster:

Unless specific use cases, data must be sent to one of the **_PUBLIC_** clusters registered on the chain. (_Private_ clusters are available for specific use cases. _Admin_ clusters should not be targeted.)

It does not matter the selected public cluster id as all clusters are synced between each other. However, incase you want to implement a retry function or want to handle manually the cluster selection you can use `getPublicsClusters()`. Otherwise, the `getFirstPublicClusterAvailable()` is here for you.

### Get all the public clusters ids

```typescript showLineNumbers
import { getPublicsClusters, initializeApi } from "ternoa-js";

const getClustersList = async () => {
  try {
    await initializeApi();
    const clusters = await getPublicsClusters();
    console.log(clusters); //Expected output is an array of cluster ids (number) ex: [0,2,3]
    console.log(clusters[0]); //Expected output a cluster id (number) ex: 0
    process.exit(0);
  } catch (error) {
    process.exit(1);
  }
};
```

### Get the first public cluster available

```typescript showLineNumbers
import { getFirstPublicClusterAvailable, initializeApi } from "ternoa-js";

const getClusterId = async () => {
  try {
    await initializeApi();
    const cluster = await getFirstPublicClusterAvailable();
    console.log(cluster); //Expected output a cluster id (number) ex: 0
    process.exit(0);
  } catch (error) {
    process.exit(1);
  }
};
```

Now the cluster selected, it is needed to verify the _health status_ of the cluster.

## Cluster health

Before moving on the creation, the good practice is to verify the status of the selected cluster.
Enclave in a cluster can be not available because of being in maintenance mode. Therefore it is important to check the status of the selected cluster.

In most of the cases, it is not necessary to use or store the data in a variable. Just run the promise `getEnclaveHealthStatus()` to check if any error is happening. In case you need to use the _cluster health_ data use the `getEnclaveDataAndHealth()`.

```typescript showLineNumbers
import { getEnclaveHealthStatus, initializeApi } from "ternoa-js";

const checkClusterHealth = async () => {
  try {
    await initializeApi();
    await getEnclaveHealthStatus(); // No output expected
    //...
    process.exit(0);
  } catch (error) {
    process.exit(1);
  }
};
```

```typescript showLineNumbers
import { getEnclaveHealthStatus, initializeApi } from "ternoa-js";

const getClusterHealth = async () => {
  try {
    await initializeApi();
    const healthData = await getEnclaveDataAndHealth(); // Expected output is Promise<EnclaveDataAndHealthType[]>
    //...
    process.exit(0);
  } catch (error) {
    process.exit(1);
  }
};
```
