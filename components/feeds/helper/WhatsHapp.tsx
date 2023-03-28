import React from 'react';
import styles from '../style/whatshapp.module.css';

const WhatsHapp = () => {
  return (
    <div className={styles.wh__container}>
      <h3 className={styles.wh__heading}>What&apos;s happening</h3>
      <Post />
      <Post />
      <Post />
    </div>
  );
};

const Post = () => {
  return (
    <div className={styles.wh__post__container}>
      <p className={styles.wh__post__micro__heading}>
        War in Ukrain.
        <span className={styles.wh__post__live}>
          <b>LIVE</b>
        </span>
      </p>
      <p className={styles.wh__post__mini__heading}>
        Loud explosions rock Ukraine’s capital Kyiv
      </p>
      <p className={styles.wh__post__micro__heading}>
        Trending with <span className="hashtag">#UkrainWar</span>
      </p>
    </div>
  );
};

export default WhatsHapp;
