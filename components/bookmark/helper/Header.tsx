import React from 'react'
import styles from "../styles/header.module.css"

const Header = () => {
  return (
    <div className={styles.header__container}>
        <h3>Bookmarks</h3>
        <p>@b_raipurkar</p>
    </div>
  )
}

export default Header