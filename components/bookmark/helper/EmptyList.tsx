import React from 'react'
import styles from '../styles/emptylist.module.css'

const EmptyList = () => {
  return (
    <div className={styles.emptylist__container}>
      <h1>Save tweets for later</h1>
      <p>
        Don&apos;t let the good ones fly away! Bookmark Tweets to easily find them
        again in the future.
      </p>
    </div>
  );
}

export default EmptyList