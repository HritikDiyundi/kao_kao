import React from 'react'
import { AddNewIcon, ArrowLeft, MoreIcon } from '../../helper/NavigtorIcons';
import styles from "../styles/header.module.css";

const Header = ({ username }: headerProps) => {
  return (
    <div className={styles.header__container}>
      <ArrowLeft className={styles.header__icon} />
      <div className={styles.header__middle__side__div}>
        <h3>Lists</h3>
        <p>@{username}</p>
      </div>
      <div className={styles.header__right__side__div}>
        <AddNewIcon className={styles.header__icon} />
        <MoreIcon className={styles.header__icon} />
      </div>
    </div>
  );
};

type headerProps = {
  username: string;
};

export default Header