---
sidebar_position: 2
sidebar_label: How to retrieve a new Transmission Protocol
---

# How to retrieve a Transmission Protocol using Ternoa Indexer

Ternoa indexer is **a record of the Ternoa Chain data.**
You can query data for some specific entities (NFT, Collection, Marketplace(...)) using graphql.
_In this example, we use the graphql-request library._

## Step 1: transmissionEntity query preparation

You first need to prepare a stringified query to get the protocol data from a specific NFT id. Here are detailed the parameters available for the `transmissionEntity`:

```markdown
`nftId`: The NFT id - String
`from`: The NFT sender after protocol execution - String
`to`: The NFT recipient after protocol execution - String
`isActive`: Boolean flag: true if the protocol is currently active, false otherwise. - Boolean
`isThresholdReached`: Boolean flag: true if the threshold of the expected number of consent is reached, false otherwise. - Boolean
`protocol`: The protocol kind : AtBlock, AtBlockWithReset, OnConsent or OnConsentAtBlock - String
`endBlock`: The protocol transmission block id - Number
`consentList`: The protocol expected consent list of address - An Array of String
`currentConsent`: The current consented list of addresses - An Array of String
`threshold`: The minimum threshold of consent to execute protocol - Number
`cancellation`: The cancellation kind: Anytime, None, or untilBlock - String
`cancellationBlock`: The untilBlock block id when cancellation is set to untilBlock - number
`timestampCreated`: The protocol creation timestamp. Date
`timestampRemoved`: The protocol removing timestamp. Date
`timestampUpdated`: The protocol update timestamp. Date
`timestampTransmitted`: DaThe protocol transmission timestamp. Date
```

Do not hesitate to adapt the information you require in your query and replace PROTOCOL_NFT_ID with the NFT id you want to get the information from (e.g. the NFT id from the NFT previously used in ["How to set a Transmission Protocol for an NFT"](/for-developers/guides/transmission/set-protocol)):

```typescript
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
```

## Step 2: Sending the request to the Indexer

Once the query is ready, you can request our Indexer instances by providing both the indexer endpoint and the query.

Replace PROTOCOL_NFT_ID in the following code snippet with the NFT ID previously used in ["How to set a Transmission Protocol for an NFT"](/for-developers/guides/transmission/set-protocol)):

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

The `getProtocolData` function is an asynchronous function that sends a GraphQL request using the `request` function from the **"graphql-request"** library. The response from the server is an object with a property transmissionEntity that has the data of the requested Transmission NFT entity.

## Support

If you face any trouble, feel free to reach out to our community engineers in our [Discord](https://discord.gg/fUmBkPpnRu).
