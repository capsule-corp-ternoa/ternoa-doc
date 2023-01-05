---
sidebar_position: 1
sidebar_label: Sign transaction
---

# Sign a transaction hash

Now we have the txHash, and we can move to the signing step. But before detailing it, it's good to know that _"signing"_ can be directly embedded in the submit function.

It means that depending on the submit function you are using (see the last step [below](#)), _signing your tx hash before submitting might not be necessary_. In case you sign manually the tx hash, you will receive a hex value of the signed transaction ready to be sent.

The `signTxHex()` function expect **a keyring** that will sign the transaction and the **transaction hash to be signed**. 


``` js showLineNumbers
const create createNFTManually = async () => {
  try {
    ...

    // STEP 2 : Here we sign the transaction hash. nftTxHash is the name of the tx hash from the function we created before.
    const signTxHash = await signTxHex(keyring, nftTxHash)

    // Do something with the hex value. 
    console.log(signTxHash);
    ...
  } catch (e) {
    console.log(e)
  }
}
```