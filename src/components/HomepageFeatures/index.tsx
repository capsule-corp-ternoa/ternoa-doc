import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

type FeatureItem = {
  title: string;
  icon: string // Todo: add UI Kit Icon
  description: JSX.Element;
  url: string; 
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Ternoa Wiki',
    icon: '🔎',
    description: (
      <>
        A step by step tutorial to start with Ternoa.
        Here you will learn everything with token CAPS management
        and get new experience with creation, minting and trading NFTs.
      </>
    ),
    url: '/category/wiki'
  },
  
  {
    title: 'For developers',
    icon: '🛸',
    description: (
      <>
        All you need to know to build dApps, interact with the
        Ternoa Blockchain and deploy your own Marketplace.
      </>
    ),
    url: '/for-developers/'
  },

  {
    title: 'For Node operators',
    icon: '🌌',
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

function Feature({icon, url, title, description}: FeatureItem) {
  return (
    <Link to={url} className={clsx('col col--4', styles.linkUrl)}>
      <div className="card-demo">
        <div className={clsx('card', styles.cards)}>
          <div className="card_header">
            <div className={(styles.featureIcon)}>{icon}</div>
            <h3>{title}</h3>
          </div>
          <div>
            <p>{description}</p>
          </div>
          <div className="card_footer">
          </div>
        </div>
      </div>
    </Link>

  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div  className="container">
          <div className="row">
          {FeatureList.map((props, idx) => (
              <Feature key={idx} {...props} />
            ))}
          </div>
      </div>
    </section>
  );
}
