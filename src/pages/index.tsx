import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import styles from './index.module.css';
import CodeBlockSnippet from '../components/CodeSnippet';
import DiscoverMore from '../components/DicoverMore';
import JoinCommunity from '../components/JoinCommunity';
import AcceleratorProgram from '../components/AcceleratorProgram';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <div className={clsx('row row-reverse', styles.headerContainer)}>
          <div className="col col--6">
            <h1 className={styles.heroTitle}>{siteConfig.title}</h1>
            <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
            <div className='row'>
              <div className='col'>
                <div className={styles.btnContainer}>
                  <Link
                    className={clsx('button gradientBtn', styles.ctaBtn)}
                    to="/for-developers">
                    Start exploring
                  </Link>
                  <Link
                    className={clsx('button outlineGradientBtn', styles.ctaBtn)}
                    to="/for-developers/guides/">
                    <span className='gradientText'>View guides</span>

                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className='col col--6'>
            <CodeBlockSnippet />
          </div>
        </div>

      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <DiscoverMore />
        <JoinCommunity />
      </main>
    </Layout>
  );
}
