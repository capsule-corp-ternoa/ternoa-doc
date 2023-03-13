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
    title: 'Why build on Ternoa?',
    description: (
      <>
        Short description in some lines of the project. Usefull for user to understand what the value of the project.
      </>
    ),
    url: '/discover-ternoa/why-build-on-ternoa'
  },
  {
    title: 'NFT Primitives',
    description: (
      <>
        Short description in some lines of the project. Usefull for user to understand what the value of the project.
      </>
    ),
    url: '/wiki/features/nft-primitives'
  },
  {
    title: 'Builder Guides',
    description: (
      <>
        Short description in some lines of the project. Usefull for user to understand what the value of the project.
      </>
    ),
    url: '/for-developers/guides/'
  },
  {
    title: 'Integrate Tools',
    description: (
      <>
        Short description in some lines of the project. Usefull for user to understand what the value of the project.
      </>
    ),
    url: '/for-developers/get-started/'
  },
  {
    title: 'User Guides',
    description: (
      <>
        Short description in some lines of the project. Usefull for user to understand what the value of the project.
      </>
    ),
    url: '/category/wiki'
  },
  {
    title: 'Stake CAPS',
    description: (
      <>
        Short description in some lines of the project. Usefull for user to understand what the value of the project.
      </>
    ),
    url: 'wiki/how-to-stake-on-ternoa'
  },
];

function Feature({ url, title, description }: FeatureItem) {
  return (
    <Link to={url} className={clsx('col col--4 dFlex', styles.linkUrl)}>
      <div className={clsx('card col-demo', styles.cards)}>
        <div className="card_header">
          <h3 className={styles.featureTitle}>{title}</h3>
        </div>
        <p>{description}</p>
      </div>
    </Link>

  );
}

export default function DiscoverMore(): JSX.Element {
  return (
    <div className='moreFeatures'>
      <h2>Discover more</h2>
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
