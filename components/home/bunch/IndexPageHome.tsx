import React, { useContext } from 'react';
import Header from '../helper/Header';
import Posts from '../helper/Posts';
import styles from '../styles/index.module.css';
import { UserContext } from '../../../pages';

const IndexPageHome = () => {
  const { users } = useContext(UserContext);
  console.log(users);
  return (
    <div>
      <Header />
      <BriefDesc />
      <Posts />
    </div>
  );
};

const BriefDesc = () => {
  return (
    <div className={styles.bd__container}>
      <div className={styles.bd__strip}>Show 225 dc tweets</div>
      <div className={styles.bd__card}>
        <h2 className={styles.bd__card__heading}>Welcome Back</h2>
        <p className={styles.bd__card__description}>
          Select some topics you&apos;re interested in to help personalize your
          Twitter experience, starting with finding people to follow.
        </p>
        <button className={styles.bd__card__button} type="submit">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default IndexPageHome;
