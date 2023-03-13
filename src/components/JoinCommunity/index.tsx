import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

export default function JoinCommunity(): JSX.Element {
  return (
    <section className={styles.joinCommunity}>
      <div className="container">
        <div className="row">
          <div className='col col--7'>
            <h2 className={styles.communityTitle}>Join the community</h2>
            <p className={styles.description}>Short description in some lines of the project. Usefull for user to understand what the value of the project.</p>
            <div className={clsx('row', styles.socialContainer)}>
              <div className='col col--3'>
                <a className="" href='https://discord.com/invite/mQeEWQj46a' target="_blank">
                  <img src="/img/discord.svg" alt="ternoa discord" />
                </a>
              </div>
              <div className='col col--3'>
                <a className="" href='https://github.com/capsule-corp-ternoa' target="_blank">
                  <img src='/img/github.svg' alt='ternoa github' />
                </a>
              </div>
              <div className='col col--3'>
                <a className="" href='https://twitter.com/Ternoa_' target="_blank">
                  <img src='/img/twitter.svg' alt="ternoa twitter" />
                </a>
              </div>
            </div>
          </div>
          <div className='col col--5'>
            <img src='/img/ternoa-community.png' />
          </div>
        </div>
      </div>
    </section>
  );
}
