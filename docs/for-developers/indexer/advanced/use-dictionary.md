---
sidebar_position: 3
---

# Use the network dictionary

You can improve the performance of the indexation part by using a dictionary endpoint instead of targeting directly the blockchain to get data.
- **[How to use a dictionary](https://doc.subquery.network/tutorials_examples/dictionary/)**.
- You can see in **[our repository](https://github.com/capsule-corp-ternoa/ternoa-subql/blob/v42/testnet/project.yaml)** what is the dictionary endpoint.

**For example:**

```yaml 
network:
  # genesisHash: '0xd44bcfb0e98da45ace37e4df8469e5dbba8c4fc5449acda24c50cea6f5f2ca99' #staging
  # endpoint: 'wss://staging.chaos.ternoa.com'
  # dictionary: 'https://dictionary-staging.ternoa.dev/'
  genesisHash: '0xd9adfc7ea82be63ba28088d62b96e9270ad2af25c962afc393361909670835b2' #testnet
  endpoint: 'wss://testnet.ternoa.com'
  dictionary: 'https://dictionary-testnet.ternoa.dev/'
  # genesisHash: '0x710016a91bfbd4ffc5035ae19b7b94be74a2fd2f693cc692aaedae35c0cacd58'
  # endpoint: wss://dev.chaos.ternoa.com
  chaintypes:
    file: ./types.json
```