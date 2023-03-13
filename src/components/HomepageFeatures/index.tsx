import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

type FeatureItem = {
  title: string;
  imagePath: string;
  description: JSX.Element;
  url: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Start building on Ternoa',
    imagePath: '/img/building-ternoa.png',
    description: (
      <>
        A step by step tutorial to start with Ternoa.
        Here you will learn everything with token CAPS management
        and get new experience with creation, minting and trading NFTs.
      </>
    ),
    url: 'for-developers/overview '
  },

  {
    title: 'Explore Ternoa features',
    imagePath: '/img/explore-ternoa.png',
    description: (
      <>
        All you need to know to build dApps, interact with the
        Ternoa Blockchain and deploy your own Marketplace.
      </>
    ),
    url: '/category/features'
  },

  {
    title: 'Launch a node on Ternoa',
    imagePath: '/img/launch-ternoa.png',
    description: (
      <>
        This guide will explain the basic principles on how to run a validator
        node and how to stake CAPS. A more detailed approach will be available
        later in the form of a workshop and/or gitbook documentation.

      </>
    ),
    url: '/category/for-node-operators'
  },
];

function Feature({ imagePath, url, title, description }: FeatureItem) {
  return (
    <Link to={url} className={clsx('col dFlex', styles.linkUrl)}>
      <div className={clsx('card col-demo', styles.cards)}>
        <div className="card_header">
          <div className={(styles.featureIcon)}>
            <img src={imagePath} />
          </div>
          <h3>{title}</h3>
        </div>
        <div>
          <p>{description}</p>
        </div>
      </div>
    </Link>

  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
