---
sidebar_position: 1
sidebar_label: How to retrieve a rental NFT
---

# How to retrieve rental NFT using our Indexer?

Ternoa indexer is **a record of the Ternoa Chain data.**
You can query data for some specific entities (NFT, Collection, Marketplace(...)) using graphql.
_In this exemple, we use the graphql-request library._

You first need to prepare a stringified query to get the rental NFT data, as we did in the query(id) function.
Do not hesitate to adapt the information you require in your query. When the query is ready, you can make the request to our indexer by providing both the indexer endpoint and the query. A rental contract contains a lot of fields.

```typescript showLineNumbers
import { request, gql } from "graphql-request";

const RENTAL_NFT = #update NFT id here with existing rental NFT;
const query = (id: number) => gql`
    {
        rentEntity(id: "${id}") {
            nftId
            renter
            rentee
            durationType
            blockDuration
            maxSubscriptionBlockDuration
            isSubscriptionChangeable
            nextSubscriptionRenewalBlockId
            acceptanceType
            acceptanceList
            renterCanRevoke
            revokedBy
            rentFeeType
            rentFee
            rentFeeRounded
            renterCancellationFeeType
            renterCancellationFee
            renterCancellationFeeRounded
            renteeCancellationFeeType
            renteeCancellationFee
            renteeCancellationFeeRounded
            timestampCreate
      }
    }
`;

const getRentalNFTData = async () => {
	try {
		const response = await request<{ rentEntity: RentalNFTType }>(
			"https://indexer-alphanet.ternoa.dev",
			query(RENTAL_NFT)
		);
		console.log(response);
	} catch (error) {
		console.error(error);
	}
};

type RentalNFTType = {
    nftId: string;
    renter: string;
    rentee: string;
    durationType: string;
    blockDuration: number;
    maxSubscriptionBlockDuration: number;
    isSubscriptionChangeable: boolean;
    nextSubscriptionRenewalBlockId: number;
    acceptanceType: string;
    acceptanceList: string[];
    renterCanRevoke: boolean;
    revokedBy: string;
    rentFeeType: string;
    rentFee: string;
    rentFeeRounded: number;
    renterCancellationFeeType: string;
    renterCancellationFee: string;
    renterCancellationFeeRounded: number;
    renteeCancellationFeeType: string;
    renteeCancellationFee: string;
    renteeCancellationFeeRounded: number;
    timestampCreate: Date;
};
```

## Support

If you face any trouble, feel free to reach out to our community engineers in our [Discord](https://discord.gg/fUmBkPpnRu).
