---
sidebar_position: 1
sidebar_label: How to retrieve a rental NFT
---

# How to retrieve rental NFT using our Indexer?

Ternoa indexer is **a record of the Ternoa Chain data.**
You can query data for some specific entities (NFT, Collection, Marketplace(...)) using graphql.
_In this example, we use the graphql-request library._

## Step 1: rentEntity query preparation

You first need to prepare a stringified query to get the rental NFT data, from a specific NFT id. Here are detailed the parameters available for the `rentEntity`:

```markdown
`nftId`: The NFT id - String
`hasStarted`: Boolean flag: true if the rent contract has started, false otherwise - Boolean
`hasEnded`: Boolean flag: true if the rent contract has ended, false otherwise - Boolean
`hasBeenCanceled`: Boolean flag: true if the rent contract has been canceled, false otherwise - Boolean
`isExpired`: Boolean flag: true if the rent contract has expired, false otherwise - Boolean
`renter`: The contract owner - String
`rentee`: The contract renter - String
`startBlockId`: The starting block id when the contract is rented - Number
`durationType`: The contract duration type: Fixed or Duration - String
`blockDuration`: The contract duration in block number - Number
`maxSubscriptionBlockDuration`: The subscription contract duration - Number
`isSubscriptionChangeable`: Boolean flag: true if the subscription contract can be updated, false otherwise - Boolean
`nextSubscriptionRenewalBlockId`: The next subscription contract renewal block id - Number
`nbSubscriptionRenewal`: The number of renewals already done - Number
`newTermsAvailable`: Boolean flag: true if some new terms are available until the end of the current subscription period, false otherwise - Boolean
`nbTermsUpdate`: The number of contract updates validated - Number
`acceptanceType`: The contract acceptance type: Automatic or Manual - String
`acceptanceList`: The contract acceptance list: an array of address (string) or null - String[]
`renterCanRevoke`: Boolean flag: true if the renter can revoke a rented contract, false otherwise. - Boolean
`revokedBy`: The address of the revoked contract - String
`rentFeeType`: The rental contract fee type: Token amount or NFT - String
`rentFee`: The rental contract fee: Token amount in Big Number format or NFT id - String
`rentFeeRounded`: The rental contract fee: Token amount in number format or NFT id - Float
`rentOffers`: The address of rentee offers - String[]
`nbRentOffers`: The current number of rent offers received - Number
`totalRentOffersReceived`: The total number of rent offers received (incl. offers retracted) - Number
`renterCancellationFeeType`: The renter cancellation fee type: Fixe or Flexible Token amount, or NFT - String!
`renterCancellationFee`: The renter cancellation fee value: Token amount in Big Number format or NFT id - String!
`renterCancellationFeeRounded`: The renter cancellation fee value: Token amount in number format or NFT id - Float
`renteeCancellationFeeType`: The rentee cancellation fee type: Fixe or Flexible Token amount, or NFT - String!
`renteeCancellationFee`: The rentee cancellation fee value: Token amount in Big Number format or NFT id - String!
`renteeCancellationFeeRounded`: The rentee cancellation fee type: Fixe or Flexible Token amount, or NFT - String!
`timestampCreated`: The contract creation timestamp - Date
`timestampStarted`: The contract started timestamp - Date
`timestampLastSubscriptionRenewal`: The last subscription contract renewal timestamp - Date
`timestampLastTermsUpdate`: The last subscription contract update timestamp - Date
`timestampLastOffer`: The last contract offer received a timestamp - Date
`timestampEnded`: The contract end timestamp - Date
`timestampCancelled`: The contract cancelation timestamp - Date
`timestampRevoked`: The contract revocation timestamp - Date
`timestampExpired`: The contract expiration timestamp - Date
```

Do not hesitate to adapt the information you require in your query and replace RENTAL_NFT_ID with the NFT id you want to get the information from (e.g. the NFT id from the NFT previously used in ["How to rent an NFT on-chain"](/for-developers/guides/rental-NFT/create-rental-nft)):

```typescript
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
```

## Step 2: Sending the request to the Indexer

Once the query is ready, you can request our Indexer instances by providing both the indexer endpoint and the query.

Replace RENTAL_NFT_ID in the following code snippet with the NFT ID previously used in ["How to rent an NFT on-chain"](/for-developers/guides/rental-NFT/create-rental-nft):

```typescript showLineNumbers
import { request, gql } from "graphql-request";

const RENTAL_NFT_ID = #update NFT id here with existing rental NFT;
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
            query(RENTAL_NFT_ID)
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

The `getRentalNFTData` function is an asynchronous function that sends a GraphQL request using the `request` function from the **"graphql-request"** library. The response from the server is an object with a property rentEntity that has the data of the requested Rental NFT entity.

## Support

If you face any trouble, feel free to reach out to our community engineers in our [Discord](https://discord.gg/fUmBkPpnRu).
