import React from 'react'
import Body from '../helper/Body'
import Header from '../helper/Header'
import styles from "../styles/index.module.css"

const IndexExplore = () => {
  return (
    <div className={styles.explore__index__container}>
      <Header />
      <Body />
    </div>
  );
}

export default IndexExplore