import React from 'react';
import styles from '../style/whatshapp.module.css';
import { results } from '../../../src/utils/News.json';

const WhatsHapp = () => {
  return (
    <div className={styles.wh__container}>
      <h3 className={styles.wh__heading}>What&apos;s happening</h3>
      {results.slice(0, 3).map((i, key) => {
        return (
          <Post
            key={key}
            heading={i.heading}
            description={i.description ? i.description.slice(0, 10) : ' '}
            liveStatus={i.liveStatus}
            hashtag={i.hashtag}
          />
        );
      })}
    </div>
  );
};

interface postProps {
  heading: string;
  description: string;
  liveStatus: boolean;
  hashtag: string;
}

const Post = ({ heading, description, hashtag, liveStatus }: postProps) => {
  return (
    <div className={styles.wh__post__container}>
      <p className={styles.wh__post__micro__heading}>
        {heading}
        <span className={styles.wh__post__live}>
          <b>{liveStatus ? 'LIVE' : ''}</b>
        </span>
      </p>
      <p className={styles.wh__post__mini__heading}>{description}</p>
      <p className={styles.wh__post__micro__heading}>
        Trending with <span className="hashtag">{hashtag}</span>
      </p>
    </div>
  );
};

export default WhatsHapp;
