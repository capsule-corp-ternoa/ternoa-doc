# How to start your doc ? 

### Use Standard features Markdown**

- ## Subtitle H2
- ### Subtitle H3
- #### Subtitle H4 

### Add image directly in `.mdx` file.
![img alt](/img/docusaurus.png)

### Add text
- Normal : Hello 
- Font-weight : **Hello**, 
- Italic :  _Hello_ 

### Add Links
- You can try and [go to the external link](https://www.ternoa.com/)
- You can try and [go to the internal link](/docs/category/core-blockchain)

### Insert info console with MDX component :

```
import TabChoice from '@site/src/components/global/TabChoice';

<TabChoice
npmconsole="npm install ternoa-js"
yarnconsole="yarn install ternoa-js"
/>

```

### Add a part of code with path 

Use ` ``` your code ``` ` to generate sample of code with color synthax.

```jsx title="ternoa-js/account"
// Example
import { generateSeed, getKeyringFromSeed } from "ternoa-js/account";

(async () => {
  const account = await generateSeed()
  const keyring = await getKeyringFromSeed(account.seed)
  const address = keyring.address
  console.log("Your fresh public address is: ", address)
})().catch((e) => {
  console.log(e)
})
```

### Admonitions 

:::note

Some **content** with _Markdown_ `syntax`. Check [this `api`](#).

:::

:::tip

Some **content** with _Markdown_ `syntax`. Check [this `api`](#).

:::

:::info

Some **content** with _Markdown_ `syntax`. Check [this `api`](#).

:::

:::caution

Some **content** with _Markdown_ `syntax`. Check [this `api`](#).

:::

:::danger

Some **content** with _Markdown_ `syntax`. Check [this `api`](#).

:::
________

🔥 **Be careful** don't touch metadatas in top of all docs. It's already done. 
```jsx title="for-developers/cookbooks/create-a-capsule.mdx"
//Don't touch this section in all docs.
---
sidebar_position: 2
---
```
________

### Add MDX Components

```
import Avatar from '@site/src/components/global/Avatar';

<Avatar 
  imgSrc={require('../static/img/ternoa_test.jpg').default}
  name="Lautaro"
  role="Founder of Capsule Corporation"
 />

 ```
 [All doc Docusaurus here](https://docusaurus.io/docs)
