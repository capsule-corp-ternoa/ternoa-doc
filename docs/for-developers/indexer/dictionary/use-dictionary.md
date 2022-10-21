---
sidebar_position: 1
---

# Add the dictionary to indexer

You can improve the performance of the indexation part by using a dictionary endpoint instead of targeting directly the blockchain to get data. Under the hood, the Dictionary provides a list of relevant block heights only that contains the specific events and extrinsics.

_Example_: If you look at a createNft event, not every blocks will contain this event since it depends on users usage of the Ternoa chain. When looking at events, the dictionary will provide the list that contains the createNft event we are looking for instead of every events of each block.

- You can see in **[our repository](https://github.com/capsule-corp-ternoa/ternoa-subql/blob/mainnet/project.yaml)** what is the dictionary endpoint adn how to add it.

**Code snippet example:** look at line 7

```yaml showLineNumbers
...
  schema:
    file: ./schema.graphql
  network:
    genesisHash: '0x6859c81ca95ef624c9dfe4dc6e3381c33e5d6509e35e147092bfbc780f777c4e'
    endpoint: wss://mainnet.ternoa.network
    dictionary: https://dictionary-mainnet.ternoa.dev/
  dataSources:
    - kind: substrate/Runtime
      startBlock: 1
      mapping:
        file: "./dist/index.js"
        handlers:
          - handler: handleEvent
            kind: substrate/EventHandler
            filter:
              module: balances
              method: Transfer
...
```