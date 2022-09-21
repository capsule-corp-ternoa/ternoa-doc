---
sidebar_position: 2
---


# 🔎 How to Start your Doc

Here, an sample Markdown usage to create your doc.

- ## Subtitle H2
- ### Subtitle H3
- #### Subtitle H4 

## Add image
![img alt](/img/docusaurus.png)

## Add text
- Normal : Hello 
- Font-weight : **Hello**, 
- Italic :  _Hello_ 

## Add Links
- You can try and [go to the external link](https://www.ternoa.com/)
- You can try and [go to the internal link](/docs/category/core-blockchain)

## Markdown can embed HTML elements and details

<details>
  <summary>Toggle me!</summary>
  <div>
    <div>This is the detailed content</div>
    <br/>
    <details>
      <summary>
        Nested toggle! Some surprise inside...
      </summary>
      <div>
        🛸 Bi Bi Bop 🛸
      </div>
    </details>
  </div>
</details>

## Component JSX in React WIP
export const Highlight = ({children, color}) => (
  <span
    style={{
      backgroundColor: color,
      color: '#fff',
      padding: '0.3rem',
    }}>
    {children}
  </span>
);

<Highlight color="#25c2a0">Lorem Ipsum</Highlight> dolor sit amet.