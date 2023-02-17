---
sidebar_position: 7
sidebar_label: Rent an NFT
---

# Rent an NFT

Ternoa provides you with many advanced NFT features. Not only creating an NFT can be done in just a few lines of code but we also cover many NFT advanced usecases: Ternoa allows you to easily create functions to rent, auctioned or even add secret to your NFTs without using any smart contracts.

If you did not looked yet at the needed prerequisites before starting to code (a ternoa account, claimed some test caps, and installed the ternoa-js api with `npm install ternoa-js`), please look at the [Get Started]("") section. We also strongly recommand you to look at the good practice [section]("") to learn more about main concept you will see in the code below (**API initialization, Keyring** (...))
## How to create a rental NFT on-chain? 
### Code Snippet
This function creates a rental NFT on the Ternoa chain. It returns an object promise containing the ContractCreatedEvent provided by the Ternoa blockchain.
Use your own account by updating the //TernoaTestAccount with your account seed when retrieving the keyring from the example below. **Replace the variables** according to your needs.

```typescript showLineNumbers
import { createContract, initializeApi, getKeyringFromSeed, WaitUntil} from "ternoa-js";

//First import the helpers for every parameters you need. Helpers expect the values (strings, number, boolean (..)) and returns the corresponding expected object.
import {
	formatAcceptanceType,
	formatCancellationFee,
	formatDuration,
	formatRentFee,
} from "ternoa-js/rent/utils";

const createContract = async () => {
	try {
		await initializeApi();
		const keyring = await getKeyringFromSeed("//TernoaTestAccount");

        // Here you create some constants with each helper and value you want. We use some random values:
        const duration = formatDuration("subscription", 30, 100, true)
        const acceptanceType = formatAcceptanceType("manual", null)
        const rentFee = formatRentFee("tokens", 1)
        const renterCancellationFee = formatCancellationFee("fixed", 1)
        const renteeCancellationFee = formatCancellationFee("none")
        
        // Create or retrieve the NFT you want to convert into a rental NFT.
        const { nftId } = await createNft("hello world", 0, undefined, false, keyring, WaitUntil.BlockInclusion);
        
        // Provide each const one by one as parameters in our function below: 
		const rentalContractData = await createContract(
            nftId,
            duration,
            acceptanceType,
            true,
            rentFee,
            renterCancellationFee,
            renteeCancellationFee,
            keyring,
            WaitUntil.BlockInclusion
        );
		console.log(`Contract created for NFT: ${rentalContractData.nftId}`);
	} catch (e) {
		console.error(e);
	}
};
```
### The expected params

The expected params for creating a contract are objects under specific format. The best practice and the easiest way to create the params, is to use the formaters we provide. To learn more about others full contract detail and options, check this [section]("").

```typescript
`nftId`: The NFT Id of the contract.
`duration`: 
            Duration can be either: fixed or subscription.
            Duration must be set in a number of blocks. (Each block last around 6 seconds - ex: 1 minute should be 10 blocks)
            Fixed duration is an object expecting a block number. 
            Subscription duration is an object expecting a duration in block, an optional max duration and an optional boolean to make the contract changeable. 
            The maxDuration is set by default to 5,184,000 of blocks (around 360 days).
`acceptanceType`: 
            The type of acceptance can be either automatic or manual (with or without whitelist). 
            Acceptance type is an object expecting: null or an optional list of whitelisted address (an array of string). 
            If an address list is provided, only the address whitelisted will be able to rent the contract or make an offer.
`renterCanRevoke`: A boolean to allow renter to cancel the contract once started
`rentFee`: 
            The fee the rentee will have to "pay" to rent the contract: It can be either a token amount or an NFT.
            RentFee is an object expecting: a tokens amount (a number of CAPS) or an NFT id.
            NFT id as rentFee can't be set when contract duration is a subscription type.
`renterCancellationFee`: 
            The fee to cancel the contract: FixedTokens (fixed tokens amount), FlexibleTokens (a proportion/prorata tokens amount), an NFT id or can be null. In case of no cancellation fee: none.
            FlexibleTokens can only be used with Fixed duration contracts.
            Both FixedTokens and FlexibleTokens type expect a tokens value as a number of CAPS.
`renteeCancellationFee`: 
            The fee to cancel the contract: FixedTokens (fixed tokens amount), FlexibleTokens (a proportion/prorata tokens amount), an NFT id or can be null. In case of no cancellation fee: none.
            FlexibleTokens can only be used with Fixed duration contracts.
            Both FixedTokens and FlexibleTokens type expect a tokens value as a number of CAPS.
`keyring`:  The provided keyring (containing the address) will be used to sign the transaction and pay the execution fee.
`waitUntil`: WaitUntil define at which point we want to get the results of the transaction execution: BlockInclusion or BlockFinalization.
```
### Response
The response provided from the blockchain event includes all the informations below according to the params provided when creating a rental NFT.

```typescript

`nftId`: ID of the NFT used for rent.
`renter`: The renter address, owner of the contract.
`duration`: The contract duration information.
`acceptanceType`: The contract acceptance type.
`acceptanceList`: If provided, the whitelist of address as an array of string.
`renterCanRevoke`: A boolean about revocation by renter status.
`rentFeeType`: The type of contract fee to rent a contract.
`rentFee`: The contract fee to rent a contract as a big number.
`rentFeeRounded`: The contract fee to rent a contract as a number.
`renterCancellationFeeType`: The type of renter cancellation fee.
`renterCancellationFee?`: The renter fee as a big number or NFT Id.
`renterCancellationFeeRounded?`: The renter fee as a number or NFT Id.
`renteeCancellationFeeType`:The type of rentee cancellation fee.
`renteeCancellationFee?`: The rentee fee as a big number or NFT Id.
`renteeCancellationFeeRounded?`: The rentee fee as a umber or NFT Id.
```
## How to retrieve rental NFT using our Indexer? 

Ternoa indexer is **a record of the Ternoa Chain data.**
You can query data for some specific entities (NFT, Collection, Marketplace(...)) using graphql.
*In this exemple, we use the graphql-request library.*

You first need to prepare a stringified query to get the rental NFT data, as we did in the query(id) function. 
Do not hesitate to adapt the information you require in your query. When the query is ready, you can make the request to our indexer by providing both the indexer endpoint and the query. A rental contract contains a lot of fields.

```typescript showLineNumbers
import { request, gql } from "graphql-request";

const RENTAL_NFT = //update NFT id here with existing rental NFT;
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
			query(CRENTAL_NFT)
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