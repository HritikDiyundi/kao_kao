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

interface Props {
  data: {
    tweet: tweetDoc | null;
  }
}

const Posts = ({ author, comments, likes, reference, retweets }: tweetDoc) => {
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
        <Metadata userName={author.email} name={author.name} />
        <PostBody tweetData={reference} />
        {status === 'authenticated' ? <PostAction /> : <div></div>}
      </div>
    </div>
  );
};
interface metadataprops {
  name: string;
  userName: string;

}

const Metadata = ({ name, userName }: metadataprops) => {
  return (
    <div className={styles.metadata__container}>
      <div className={styles.metadata__left}>
        <p className={styles.metadata__name}>{name}</p>
        <VerifiedIcon className={styles.verified__icon} />
        <p className={styles.metadata__username}>@{userName}.</p>
        <pre className={styles.metadata__date}>Oct 13</pre>
      </div>
      <div>
        <MoreIcon className={`${styles.icon__style} ${styles.more__icon}`} />
      </div>
    </div>
  );
};

interface postBodyProps {
  tweetData: string;

}

const PostBody = ({ tweetData }: postBodyProps) => {
  return (
    <div className={styles.postbody__container}>
      <p>
        {tweetData}
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
