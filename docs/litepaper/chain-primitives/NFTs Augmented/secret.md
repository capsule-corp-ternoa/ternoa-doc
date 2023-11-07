---
sidebar_position: 1
sidebar_label: Secret
---

# Secret

There are situations where it is important to be able to store information in an encrypted and decentralized manner. To that end, Ternoa has created Secret NFT, which is a Substrate pallet. To ensure secrecy, Secret NFT does not support any transfer protocols and can only contain a single file.

# Ternoa Secret NFT metadata

Default standard

```bash showLineNumbers
{
    title: "title of the nft",
    description: "content description of the nft",
    image: "imageID",
    properties: {
        preview: {
            ipfs: "ipfsID",
            mediaType: "image/jpeg",
            size: "int"
        },
        cryptedMedia: {
            ipfs: "ipfsID",
            cryptedMediaType: "video/mp4",
            size: "int"
        },
        publicPGP: "pgpKey"
    }
}
```

# Secret TIP

[**View Secret TIP**](https://github.com/capsule-corp-ternoa/ternoa-proposals/blob/main/TIPs/tip-520-Secret-nft.md) 