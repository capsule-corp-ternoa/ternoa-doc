import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

type FeatureItem = {
  title: string;
  icon: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Ternoa fundamentals',
    icon: '📚',
    description: (
      <>
        Lorem ipsum dolor sit amet. Aut modi voluptas nam perferendis
        labore aut facilis facere.
      </>
    ),
  },
  
  {
    title: 'For developers',
    icon: '💻',
    description: (
      <>
        Docusaurus lets you focus on your docs, and we&apos;ll do the chores. Go
        ahead and move your docs into the <code>docs</code> directory.
      </>
    ),
  },

  {
    title: 'For Node operators',
    icon: '🌌',
    description: (
      <>
        Extend or customize your website layout by reusing React. Docusaurus can
        be extended while reusing the same header and footer.
      </>
    ),
  },
];

function Feature({title, icon, description}: FeatureItem) {
  return (
    <section className={clsx('col col--4 button button--outline button--secondary margin--xs')}>
      <div className="text--center">
        <p>{icon}</p>
        <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
          <Link
            className="button button--secondary button--lg"
            to="./docs/ternoa-fundamentals">
            Go
          </Link>
        </div>
      </div>
    </section>
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
