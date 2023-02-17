---
sidebar_position: 3
sidebar_label: How to retrieve a Soulbound NFT
---

# How to retrieve the last Soulbound Tokens minted using Ternoa Indexer

Ternoa indexer is **a record of the Ternoa Chain data.**
You can query data for some specific entities (NFT, Collection, Marketplace(...)) using GraphQL.
_In this exemple, we use the graphql-request library._

You first need to prepare a stringified query to get NFT data from a specific NFT id, as we did in the query(id) function.
Do not hesitate to adapt the information you require in your query. When the query is ready, you can make the request to our indexer by providing both the indexer endpoint and the query.

```typescript showLineNumbers
import { request, gql } from "graphql-request";

const query = () => gql`
  {
    nftEntities(
      filter: { isSoulbound: { equalTo: true } }
      first: 10
      orderBy: [TIMESTAMP_CREATE_DESC]
    ) {
      nodes {
        owner
        nftId
        offchainData
        collectionId
        royalty
        isSoulbound
      }
    }
  }
`;

const getLastestSBT = async () => {
  try {
    const response = await request<{ nftEntities: { nodes: NftType[] } }>(
      "https://indexer-alphanet.ternoa.dev",
      query()
    );
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

type NftType = {
  owner: string;
  nftId: string;
  offchainData: string;
  collectionId: string;
  royalty: number;
  isSoulbound: boolean;
};
```

## Support

If you face any trouble, feel free to reach out to our community engineers in our [Discord](https://discord.gg/fUmBkPpnRu).
