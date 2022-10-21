---
sidebar_position: 2
---

# Query the dictionary directly

## Use the dictionary as an explorer

_The main interest of the dictionary is to have a middleman database between the blockchain and the indexer. Again, this database will allow the indexer to query blocks metadata directly from the dictionary. This means that if we want to get only on NFT creation events, the indexer will ask the dictionary for the corresponding blocks. (So, for example, instead of fetching blocks 0 to 100, it will fetch only the number 5, 16 and 94 because that’s where NFTs are created.)_

Another use of the dictionary is to record all generic data that can be used for an explorer. For example, block, transaction (extrinsic) and event data. This data is then used to display chain information. (See the **[ternoa scan](https://explorer.ternoa.com/))**
You can also compare the basic dictionary template provided by the Subquery team and the dictionary used by Ternoa that also record data for its explorer.
-	[Subquery dictionary template](https://github.com/subquery/subql-dictionary)
-	[Ternoa dictionary](https://github.com/capsule-corp-ternoa/ternoa-subql-dictionary)

[Dictionary playground](https://dictionary-mainnet.ternoa.dev/) will work exactly the same as the Indexer. You will be able to perfom queries the same as you do on indexer, with the same syntax. Look at the _Docs_ and _Schema_ sections to build your queries.