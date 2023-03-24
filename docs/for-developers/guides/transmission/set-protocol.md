---
sidebar_position: 1
sidebar_label: How to set a Transmission Protocol
---

# How to set a Transmission Protocol for an NFT ?

## Prerequisites

Before getting started, make sure you have the following ready:

1. Create a [Ternoa account](/for-developers/get-started/create-account) with [Alphanet CAPS](/for-developers/get-started/create-account#step-2-get-some-free-test-caps-tokens)
2. Install and set up your editor of choice (we will use Visual Studio Code [VSC] in this tutorial)
3. Install [NodeJS v.14+](https://nodejs.org/en/download/) & NPM
4. [Install & initialize Ternoa-JS](/for-developers/get-started/install-ternoa-js)

## How to set an AtBlockWithReset (Date with countdown reset) Protocol on-chain?

This function creates a AtBlockWithReset Protocol on the Ternoa chain. It returns an object promise containing the ProtocolSetEvent provided by the Ternoa blockchain.

:::info
Use your own account by updating the `//TernoaTestAccount` with your account seed when retrieving the keyring from the example below. **Replace the variables** according to your needs. Each protocol requires its own specific set of parameters but once you will have understood this AtBlockWithReset exemple, you will know of to set them all.
:::

```typescript showLineNumbers
import {
	initializeApi,
	getKeyringFromSeed,
	createNft,
    getLastBlock,
	setTransmissionProtocol,
	WaitUntil,
} from "ternoa-js";

//First import the corresponding protocol helpers.
//Helpers expect primitive values (strings, number, boolean (..)) and returns the corresponding formatted object in the format expected by the chain.
import {
	formatAtBlockWithResetProtocol,
	formatProtocolCancellation,
} from "ternoa-js/protocols/utils";

const createContract = async () => {
	try {
		await initializeApi();
		const keyring = await getKeyringFromSeed("//TernoaTestAccount");
		const nftId = // update with the NFT id to be transfered with the AtBlockWithReset protocol.
        const protocolRecipient = // update with the address of the recipient.
        const protocolExecutionDate = // update with the date you want the protocol to be executed.

        // As the blockchain is expecting a block numbers rather than dates, an aproximative dateToBlock convertor could be used like below: consider approximatively one new block every 6 seconds.
        const lastBlockId = await getLastBlock()
        const duration = protocolExecutionDate.getTime() - new Date().getTime();
        const numberOfBlocks = duration / 6 / 1000
        const transmissionBlockId = Math.ceil(lastBlockId + numberOfBlocks)

        // Here you create some constants with each helper and value you want.
		// First set the transmission protocol values: protocol kind and the block number (here the date converted to block)
		const protocol = formatAtBlockWithResetProtocol(
			"atBlockWithReset",
			transmissionBlockId
		);
        // Second, set the cancellation option of your protocol : It can be anytime, none, or untilBlock. if untilBlock is set, you need to add the corresponding block id.
		const cancellation = formatProtocolCancellation("anytime");

		// Provide each const one by one as parameters in our function below:
		const {nftId, recipient, protocol } = await setTransmissionProtocol(
			nftId,
			protocolRecipient,
			protocol,
			cancellation,
			keyring,
			WaitUntil.BlockInclusion
		);

		console.log(`Protocol ${protocol} created for NFT: ${nftId}.`);
	} catch (e) {
		console.error(e);
	}
};
```

### The expected params

The expected params for creating an AtBlockWithReset protocol are objects under specific format. The best practice and the easiest way to create the params, is to use the formaters we provide:

-   formatAtBlockProtocol()
-   formatAtBlockWithResetProtocol()
-   formatOnConsentProtocol()
-   formatOnConsentAtBlockProtocol()
-   formatProtocolCancellation()

```markdown
`nftId`: The NFT Id of the Protocol.
`recipient`: The destination account of the NFT.
`protocol`: The protocol kind. In our exemple, an atBlockWithReset and the transfer block.
Protocol can be either "atBlock", "atBlockWithReset", "onConsent" or "onConsentAtBlock".
The expected object parameter is: { [key: string]: number | ProtocolOnConsentData | Omit<ProtocolOnConsentData, "block"> }
However, using the formatter, converts the function parameters in the expected format and makes you avoid any error.
`protocolCancellation`: the cancellation period of the transmission protocol.
It can be either "untilBlock" (set the block number), "anytime" (null) or "none" (null).
Again the expexted format of the cancellation is under the same format { [key: string]: number | null }
However, using the formatter, converts the function parameters in the expected format and makes you avoid any error.
`keyring`: The provided keyring (containing the address) will be used to sign the transaction and pay the execution fee.
`waitUntil`: WaitUntil define at which point we want to get the results of the transaction execution: BlockInclusion or BlockFinalization.
```

### Response

The response provided from the blockchain event includes all the informations below according to the params provided when creating a date with countdown protocol.

```markdown
`nftId`: ID of the NFT used when creating a date with countdown protocol.
`recipient`: The destination account of the NFT after protocol execution.
`protocol`: The object containing the protocol data.
`cancellation`: The obejct containing the cancellation type : null or the block number.
```

## Support

If you face any trouble, feel free to reach out to our community engineers in our [Discord](https://discord.gg/fUmBkPpnRu).
