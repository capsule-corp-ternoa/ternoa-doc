---
sidebar_position: 2
sidebar_label: How to retrieve a new Transmission Protocol
---

# How to retrieve a Transmission Protocol using Ternoa Indexer

Ternoa indexer is **a record of the Ternoa Chain data.**
You can query data for some specific entities (NFT, Collection, Marketplace(...)) using graphql.
_In this exemple, we use the graphql-request library._

You first need to prepare a stringified query to get the protocol data from the NFT, as we did in the query(id) function.
Do not hesitate to adapt the information you require in your query. When the query is ready, you can make the request to our indexer by providing both the indexer endpoint and the query. To check if the protocol is actve, the **isActive** field must equal true.

```typescript showLineNumbers
import { request, gql } from "graphql-request";

const PROTOCOL_NFT_ID = #update with existing protocol NFT id;
const query = (id: number) => gql`
    {
        transmissionEntity(id: "${id}") {
            from
            to
            isActive
            isThresholdReached
            protocol
            endBlock
            consentList
            currentConsent
            threshold
            cancellation
            cancellationBlock
      }
    }
`;

const getProtocolData = async () => {
	try {
		const response = await request<{ transmissionEntity: protocolType }>(
			"https://indexer-alphanet.ternoa.dev",
			query(PROTOCOL_NFT_ID)
		);
		console.log(response);
	} catch (error) {
		console.error(error);
	}
};

type protocolType = {
    from: string
    to: string
    isActive: boolean
    isThresholdReached: boolean
    protocol: string
    endBlock: number
    consentList: [string]
    currentConsent: [string]
    threshold: number
    cancellation: string
    cancellationBlock: number
};
```

## Support

If you face any trouble, feel free to reach out to our community engineers in our [Discord](https://discord.gg/fUmBkPpnRu).
