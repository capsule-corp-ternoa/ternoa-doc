---
sidebar_position: 1
sidebar_label: Handling clusters
---

# Introduction to TEE clusters in the Ternoa JS SDK

If you are not familiar with Ternoa's TEE architecture for privacy yet, we strongly recommend you to look at the following sections of the documentation and understand the key concepts:

- [User workflow to interact with the cluster's enclaves.](/litepaper/Data%20Privacy%20Network/user-workflow)
- [What enclaves are?](/wiki/key-concepts#enclave)
- [Secure Environment with the TEE.](/wiki/core-blockchain/tee)
- [Ternoa privacy architecture.](/litepaper/Architecture/privacy)

The quickest way to summarize the flow to encrypt and store content could be as follows:

_The Secret or Capsule creation process involves encrypting content before uploading it to [IPFS](/for-developers/developer-tools/ipfs-quick-guide). User's content is secured using a set of private and public keys, the Ternoa Chain, and the TEE. Content is encrypted with the public key, while the private key is split into 5 Shamir shares and stored in the TEE Cluster, which contains 5 enclaves._

Now, let's see how to select a cluster.

:::info
All code snippets below and on the subsequent pages are designed to function within a Node.js environment. If you require information on how it operates in a browser environment, please consult [this section](/for-developers/advanced-guides/tee/browser).
:::

## How to choose a cluster:

Unless specific use cases, data must be sent to one of the **_PUBLIC_** clusters registered on the chain. (_Private_ clusters are available for specific use cases. _Admin_ clusters should not be targeted.)

Unless specific use cases require it, data must be sent to one of the **_PUBLIC_** clusters registered on the chain. (_Private_ clusters are available for specific use cases. _Admin_ clusters should not be targeted.)

The selected public cluster ID does not matter since all clusters are synced with each other. However, in case you want to implement a retry function or want to manually handle cluster selection, you can use `getPublicsClusters()`. Otherwise, `getFirstPublicClusterAvailable()` is here for you.

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

Now the cluster is selected, it is necessary to verify the _health status_ of the cluster.

## Cluster health

Before moving on to creation, the good practice is to verify the status of the selected cluster. An enclave in a cluster may not be available because it's in maintenance mode. Therefore, it's important to check the status of the selected cluster.

In most cases, it's not necessary to use or store the data in a variable. Just run the promise `getEnclaveHealthStatus()` to check if any errors are occurring. In case you need to use the _cluster health_ data, use `getEnclaveDataAndHealth()`.

```typescript showLineNumbers
import {
  getEnclaveHealthStatus,
  getFirstPublicClusterAvailable,
  initializeApi,
} from "ternoa-js";

const checkClusterHealth = async () => {
  try {
    await initializeApi();
    const cluster = await getFirstPublicClusterAvailable();
    await getEnclaveHealthStatus(cluster); // No output expected
    //...
    process.exit(0);
  } catch (error) {
    process.exit(1);
  }
};
```

```typescript showLineNumbers
import {
  getEnclaveDataAndHealth,
  getFirstPublicClusterAvailable,
  initializeApi,
} from "ternoa-js";

const getClusterHealth = async () => {
  try {
    await initializeApi();
    const cluster = await getFirstPublicClusterAvailable();
    const healthData = await getEnclaveDataAndHealth(cluster); // Expected output is Promise<EnclaveDataAndHealthType[]>
    console.log(healthData);
    //...
    process.exit(0);
  } catch (error) {
    process.exit(1);
  }
};
```
