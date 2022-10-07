# How to start your doc ?
Here you will find how to use markdown syntax to create your doc.md file.

____________________________________________________


## Titles and subtitles

- # Title H1 `# Title h1`
- ## Subtitle H2 `## Subtitle H2`
- ### Subtitle H3 `### Subtitle H3`
- #### Subtitle H4 `#### Subtitle H4`

____________________________________________________

## Add image src
You just need to insert this markedown with url of your image.
```![img alt](/img/ternoa_logo.png)```

_____________________________________________________


## Add text
- Normal : Hello  `Hello`
- Font-weight : **Hello**, `**Hello**`
- Italic :  _Hello_  `_Hello_`

![image](https://user-images.githubusercontent.com/98469515/194534113-871866db-973c-4910-9ebd-f9c7a16bfd31.png)

_____________________________________________________

## Add Links
To add internal or external link in your doc : 
- insert external link :  `[go to the external link](https://www.ternoa.com/)` result : [go to the external link](https://www.ternoa.com/)
- insert internal link : `[go to the internal link](/docs/category/core-blockchain)` result : [go to the internal link](https://www.ternoa.com/)

_____________________________________________________

## Add a part of code with path 

Use ` ``` your code ``` ` to generate sample of code with color synthax.

``` 
jsx title="ternoa-js/account"
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

result: 
![image](https://user-images.githubusercontent.com/98469515/194532419-54ea44e4-e99a-4500-acb3-04f00e9c0a0f.png)

________________________________________________________

## Add Admonitions 
Here, examples you can use for your doc : 
![image](https://user-images.githubusercontent.com/98469515/194533060-ced0f07c-03ae-4502-8f4b-a160e40370ec.png)

to add admonitions, the synthax markdown is : 

```
:::note

Some **content** with _Markdown_ `syntax`. Check [this `api`](#).

:::
```

```
:::tip

Some **content** with _Markdown_ `syntax`. Check [this `api`](#).

:::
```

```
:::info

Some **content** with _Markdown_ `syntax`. Check [this `api`](#).

:::
```
```
:::caution

Some **content** with _Markdown_ `syntax`. Check [this `api`](#).

:::
```
```
:::danger

Some **content** with _Markdown_ `syntax`. Check [this `api`](#).

:::
```
________________________________________________________
## Mores informations about markdown syntax : 

 [All doc Docusaurus here](https://docusaurus.io/docs)
