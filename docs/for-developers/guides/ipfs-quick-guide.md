---
sidebar_position: 7
sidebar_label: IPFS Quick Guide
---

# IPFS Quick Guide

Ternoa runs an IPFS node at the following URLs:

- Mainnet: https://ipfs-mainnet.trnnfr.com 
- Alphanet: https://ipfs-alphanet.trnnfr.com

These IPFS nodes have a data size limit of 100 MB for storing files.

The purpose of these Ternoa-foundation hosted nodes is to provide a good developer experience for new developers onboarding to the Ternoa chain. The Ternoa IPFS nodes pin the files locally to guarantee data availability. However, these nodes do not come with any guarantees on system availability or SLAs, and are provided on an as-is basis.

For production dApps deploying on the Ternoa mainnet, we recommend one of the following options:
- Use a third-party IPFS pinning gateway service such as [Piñata](https://www.pinata.cloud/), [NFT.storage](https://nft.storage/) or [Infura](https://www.infura.io/). They all provide a free-tier, and pricing plans for more heavy usage.
- Setup a dedicated IPFS node for the dApp. The standard IPFS node can be setup fairly quickly and the instructions can be found at: https://docs.ipfs.tech/
- Use a decentralised storage network that provides permanent data storage such as [Arweave](https://www.arweave.org/), [Filecoin](https://filecoin.io/) or [Crust](https://crust.network/).
- Use a hybrid approach, where the data is primarily stored on a 3rd party service, but data is also synced up to a locally hosted IPFS-node. 

For an advanced overview of using IPFS with Ternoa's features follow [this link.](https://docs.ternoa.network/for-developers/advanced-guides/ipfs)



