import Image from 'next/image';
import React from 'react';
import {
  CommmentIcon,
  HeartIcon,
  MoreIcon,
  Retweet,
  ShareIcon,
  VerifiedIcon,
} from '../../helper/NavigtorIcons';
import styles from '../styles/posts.module.css';
import { useSession } from 'next-auth/react';

const Posts = () => {
  const { data: session, status } = useSession();

  return (
    <div className={styles.post__container}>
      <div className={styles.post__owner__photo}>
        <Image
          src="/first.jpg"
          alt="username"
          height={50}
          width={50}
          className={styles.owner__photo}
        />
      </div>
      <div className={styles.metadata__index__container}>
        <Metadata />
        <PostBody />
        {status === 'authenticated' ? <PostAction /> : <div></div>}
      </div>
    </div>
  );
};

const Metadata = () => {
  return (
    <div className={styles.metadata__container}>
      <div className={styles.metadata__left}>
        <p className={styles.metadata__name}>Name</p>
        <VerifiedIcon className={styles.verified__icon} />
        <p className={styles.metadata__username}>@username.</p>
        <pre className={styles.metadata__date}>Oct 13</pre>
      </div>
      <div>
        <MoreIcon className={`${styles.icon__style} ${styles.more__icon}`} />
      </div>
    </div>
  );
};

const PostBody = () => {
  return (
    <div className={styles.postbody__container}>
      <p>
        Last chance to celebrate. Enjoy instant savings across all products.
        Save more with Trade-In. Plus get free engraving on selected items.
        Offer ends on 24 October.
      </p>
    </div>
  );
};

const PostAction = () => {
  return (
    <div className={styles.postaction__container}>
      <div className={styles.postaction__individual}>
        <CommmentIcon
          className={`${styles.icon__style} ${styles.postaction__comment__icon}`}
        />
        <p className={styles.postaction__comment__text}>2.3k</p>
      </div>
      <div className={styles.postaction__individual}>
        <Retweet
          className={`${styles.icon__style} ${styles.postaction__retweet__icon}`}
        />
        <p className={styles.postaction__retweet__text}>3.3k</p>
      </div>
      <div className={styles.postaction__individual}>
        <HeartIcon
          className={`${styles.icon__style} ${styles.postaction__heart__icon}`}
        />
        <p className={styles.postaction__heart__text}>5.6k</p>
      </div>
      <div className={styles.postaction__individual}>
        <ShareIcon
          className={`${styles.icon__style} ${styles.postaction__share__icon}`}
        />
      </div>
    </div>
  );
};

export default Posts;
