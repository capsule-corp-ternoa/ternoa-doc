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
    title: 'Explore Ternoa Ecosystem',
    imagePath: '/img/building-ternoa.png',
    description: (
      <>
        Explore Ternoa's architecture and delve into the innovative possibilities.
      </>
    ),
    url: 'litepaper/architecture'
  },

  {
    title: 'Start building on Ternoa',
    imagePath: '/img/explore-ternoa.png',
    description: (
      <>
        Start using our Ternoa.js SDK designed to make web3 projects development easier and faster.
      </>
    ),
    url: 'for-developers/overview'
  },

  {
    title: 'Launch a node on Ternoa',
    imagePath: '/img/launch-ternoa.png',
    description: (
      <>
        Review the basic principles on how to run a validator node and how to stake CAPS.

      </>
    ),
    url: '/category/for-node-operators'
  },
];

function Feature({ imagePath, url, title, description }: FeatureItem) {
  return (
    <div className='col dFlex'>
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
        <Link
          className={clsx('button outlineGradientBtn', styles.btnGo)}
          to={url}>
          <span className='gradientText'>GO</span>
        </Link>
      </div>

    </div>

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
