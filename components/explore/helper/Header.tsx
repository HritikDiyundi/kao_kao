import React from 'react'
import { CancelIcon, Search__Icon, SettingIcon } from '../../helper/NavigtorIcons'
import styles from "../styles/header.module.css"

const Header = () => {
  return (
    <div className={styles.header__container}>
      <div className={styles.header__input}>
        <Search__Icon className={styles.header__input__icon} />
        <input type="text" placeholder="Search twitter" />
        <CancelIcon className={styles.header__input__icon}/>
      </div>
      <SettingIcon className={styles.header__icon} />
    </div>
  );
}

export default Header