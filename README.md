<div id="top"></div>

<!-- PROJECT BADGES-->
[![Contributors][contributors-shield]][contributors-url] [![Forks][forks-shield]][forks-url] [![Stargazers][stars-shield]][stars-url] [![Issues][issues-shield]][issues-url] [![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/capsule-corp-ternoa/ternoa-doc">
    <img src="https://docs.ternoa.network/img/ternoa_logo.svg" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Ternoa Documentation</h3>

  <p align="center">
    All resources you'll need to build the future on Ternoa
    <br />
    <a href="https://github.com/capsule-corp-ternoa/ternoa-doc"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://docs.ternoa.network/">View Demo</a>
    ·
    <a href="https://github.com/capsule-corp-ternoa/ternoa-doc/issues">Report Bug</a>
    ·
    <a href="https://github.com/capsule-corp-ternoa/ternoa-doc/discussions">Discussions</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usecases">Usage Examples</a></li>
    <li><a href="#docmap">Docmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT TERNOA -->
<div id="about"></div>

### About Ternoa

In 2018, the idea of Ternoa was born with the objective to create a technology that can store data forever, make it accessible only to its owner, and pass it along through time. After two years of R&D, Ternoa was launched in November 2020.

We've chosen the Polkadot ecosystem to develop our own blockchain to meet our requirements. Starting from Substrate, we've developed an innovative NFT we call "Capsule". This new NFT technology gives users a unique way to use NFT as proprietary decentralized data storage.

Our Non-Fungible Token (NFT) innovations helped us **create a protocol dedicated to NFTs** on the Polkadot ecosystem.

Today, Ternoa develops all NFTs basics on the Polkadot ecosystem, enabling innovative solutions.

**Read our [LitePaper](https://litepaper.ternoa.network/)**

<div align="center">

[![Ternoa Litepaper Screenshot][product-screenshot]](https://litepaper.ternoa.network/)

</div>

<p align="right">(<a href="#top">back to top</a>)</p>

<div id="built-with"></div>

### Built With

- [Node JS](https://nodejs.org/)
- [Polkadot-JS API](https://www.npmjs.com/package/@polkadot/api)
- [AXIOS](https://www.npmjs.com/package/axios)
- [BigNum JS](https://www.npmjs.com/package/bn.js)
- [Form-Data](https://www.npmjs.com/package/form-data)
- [mime-types](https://www.npmjs.com/package/mime-types)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
<div id="getting-started"></div>

### Getting Started

To work and contribute on our documentation, you can clone our repo and run Docusaurus 2 following the instructions below.


<div id="prerequisites"></div>

**Prerequisites**

  ```
  npm install yarn@latest -g
  ```

<div id="installation"></div>

### Installation

Ternoa Documentation is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

**Init Project**

```
$ yarn
```

**Local Development**

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

**Build**

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.


**Deployment**

Using SSH:

```
$ USE_SSH=true yarn deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USECASES -->
<div id="usecases"></div>

### Usage Examples

You can find useful examples of usecases. Additional screenshots, code examples, demos or links to more resources from the Ternoa community. We will highlight community works soon.

For your first examples you can check our [CookBook](https://docs.ternoa.network/for-developers/sdk/cookbook)

**Time Capsule dApp** is our most relevant use case on the Ternoa blockchain, check out [here](https://litepaper.ternoa.network/use-case/time-capsule)

_For more examples, please refer to the [Wiki](https://wiki.ternoa.network/)_

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- DOCMAP -->
<div id="docmap"></div>

### Docmap

- [ ] [Ternoa Fundamentals](https://github.com/capsule-corp-ternoa/ternoa-doc/blob/main/docs/intro.md#-ternoa-fundamentals)
    - [ ] [Core Blockchain](https://docs.ternoa.network/category/core-blockchain)
    - [ ] [Offchain Components](https://docs.ternoa.network/category/offchain-components)
    - [ ] [TEE Enclaves](https://docs.ternoa.network/category/tee-enclaves)
    - [ ] [Ternoa NFT Primitives](https://docs.ternoa.network/category/ternoa-nft-primitives)
    - [ ] [Staking](https://docs.ternoa.network/category/staking)
- [ ] [For Developers](https://github.com/capsule-corp-ternoa/ternoa-doc/blob/main/docs/intro.md#-for-developers)
    - [ ] [Ternoa-JS SDK](https://docs.ternoa.network/category/ternoa-js-sdk)
    - [ ] [Indexer](https://docs.ternoa.network/category/indexer)
- [ ] [For Node Operators](https://github.com/capsule-corp-ternoa/ternoa-doc/blob/main/docs/intro.md#-for-node-operators)

See the [open issues](https://github.com/capsule-corp-ternoa/ternoa-doc/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTRIBUTING -->
<div id="contributing"></div>

### Contributing

Contributions are what make the Ternoa community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have ideas or if you want to help by contributing to Ternoa Documentation, please fork the repo and create a pull request. You can also simply open an issue with the tag "Idea Proposal".
Don't forget to give the project a star ! Thanks again Fam !

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingTernoaFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingTernoaFeature'`)
4. Push to the Branch (`git push origin feature/AmazingTernoaFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- CONTACT -->
<div id="contact"></div>

### Contact

Capsule Corp Labs - [@Ternoa_](https://twitter.com/ternoa_) - [support@ternoa.com](mailto:support@ternoa.com)

Project Link: [Ternoa SDK](https://github.com/capsule-corp-ternoa/ternoa-js)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
<div id="acknowledgments"></div>

### Acknowledgments

* []()
* []()
* []()

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/capsule-corp-ternoa/ternoa-doc.svg?style=for-the-badge
[contributors-url]: https://github.com/capsule-corp-ternoa/ternoa-doc/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/capsule-corp-ternoa/ternoa-doc.svg?style=for-the-badge
[forks-url]: https://github.com/capsule-corp-ternoa/ternoa-doc/network/members
[stars-shield]: https://img.shields.io/github/stars/capsule-corp-ternoa/ternoa-doc.svg?style=for-the-badge
[stars-url]: https://github.com/capsule-corp-ternoa/ternoa-doc/stargazers
[issues-shield]: https://img.shields.io/github/issues/capsule-corp-ternoa/ternoa-doc.svg?style=for-the-badge
[issues-url]: https://github.com/capsule-corp-ternoa/ternoa-doc/issues
[license-shield]: https://img.shields.io/github/license/capsule-corp-ternoa/ternoa-doc.svg?style=for-the-badge
[license-url]: https://github.com/capsule-corp-ternoa/ternoa-doc/blob/main/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/company/ternoa/
[product-screenshot]: https://static.news.bitcoin.com/wp-content/uploads/2022/06/img_20220615_180940_411.jpg
