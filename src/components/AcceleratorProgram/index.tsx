import Link from '@docusaurus/Link';
import clsx from 'clsx';
import React from 'react';
import styles from './styles.module.css';

export default function AcceleratorProgram(): JSX.Element {
  return (
    <section className={styles.joinCommunity}>
      <div className="container">
        <div className="row card">
          <div className='col col--7'>
            <h2 className={styles.communityTitle}>Ternoa Accelerator Program</h2>
            <p className={styles.description}>Opportunity to build web3 projects, complete with grants and funding to make your innovation a reality.</p>
            <div className='center'>
              <Link
                className='button outlineGradientBtn'
                to="/for-developers/guides/">
                <span className='gradientText'>View guides</span>
              </Link>
            </div>
          </div>
          <div className='col col--5'>
            <img src='/img/ternoa-accelerator-program.png' />
          </div>
        </div>
      </div>
    </section>
  );
}
