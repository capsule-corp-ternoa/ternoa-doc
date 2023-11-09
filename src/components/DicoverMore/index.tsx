import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

type FeatureItem = {
  title: string;
  description: JSX.Element;
  url: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Ternoa\'s Vision',
    description: (
      <>
        Building and empowering secure digital ownership.
      </>
    ),
    url: '/litepaper/vision-mission'
  },
  {
    title: 'Why build on Ternoa?',
    description: (
      <>
        Ternoa is accessible, fast, scalable, and doesn't require learning a new programming language.
      </>
    ),
    url: '/for-developers/why-build-on-ternoa'
  },

  {
    title: 'Builder Guides',
    description: (
      <>
        Ternoa offers tools that streamline and accelerate building web3 projects.      </>
    ),
    url: '/for-developers/guides/'
  },
  {
    title: 'NFT Primitives',
    description: (
      <>
        Discover Ternoa's core building blocks that empower the creation and management of NFTs.
      </>
    ),
    url: '/litepaper/chain-primitives/'
  },
  {
    title: 'User Guides',
    description: (
      <>
        Uncover Ternoa's comprehensive resources to manage Ternoa Wallet, Bridge CAPS, understand key concepts, and more.      </>
    ),
    url: '/category/wiki'
  },
  {
    title: 'Stake CAPS',
    description: (
      <>
        Review our guide on how to stake CAPS on the Ternoa network.
      </>
    ),
    url: 'wiki/how-to-stake-on-ternoa'
  },
];

function Feature({ url, title, description }: FeatureItem) {
  return (
    <div className='col col--4 dFlex'>
      <div className={clsx('card col-demo', styles.cards)}>
        <div className="card_header">
          <h3 className={styles.featureTitle}>{title}</h3>
        </div>
        <p>{description}</p>
        <Link to={url} className={clsx('button purpleBtn', styles.learnMoreBtn)}>
          Learn more
        </Link>
      </div>
    </div>


  );
}

export default function DiscoverMore(): JSX.Element {
  return (
    <div className={styles.moreFeatures}>
      <h2 className={styles.moreTitle}>Discover more</h2>
      <section className={styles.more}>
        <div className="container">
          <div className="row">
            {FeatureList.map((props, idx) => (
              <Feature key={idx} {...props} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
