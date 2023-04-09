import Image from 'next/image';
import React, { useContext, useState } from 'react';
import {
  Star,
  ImageIcon,
  GifIcon,
  PollIcon,
  EmojiIcon,
  ScheduleIcon,
  LocationIcon,
} from '../../helper/NavigtorIcons';
import styles from '../styles/header.module.css';
import { useTheme } from '../../../context/UserProvider';
import axios from 'axios';
import { SendNotification } from '../../../functions/sendPostNotification';
import { SocketContext } from '../../../context/SpcketProvider';
import { toast } from 'react-hot-toast';

interface Tweet {
  reference: string;
  author: string;
  likes: string[];
  retweets: string[];
  comments: string[];
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface CreateTweetResponseData {
  data: Tweet;
  message: string;
}

const Header = () => {
  const [ref, setRef] = useState<string>(' ');
  const [post, setPost] = useState<Tweet | null>(null);
  const [PostID, setPostID] = useState<string>('');
  const { user } = useTheme();
  // console.log(user?.email)
  const { socket } = useContext(SocketContext);

  const handlePost = async () => {
    let postID: string = '';
    toast.loading('Take a tea ☕, wait...', { id: 'posting' });
    if (user?._id != null) {
      const response = await axios.post<CreateTweetResponseData>(
        '/api/tweet/createTweet',
        {
          reference: ref,
          author: user._id,
        }
      );
      console.log(response.data);
      postID = response.data.data._id;
      setRef('');
      setPost(response.data.data);
      if (!response.data.data) {
        toast.error('Something went wrong.', { id: 'posting' });
      } else {
        toast.success('Your DC Tweet has been created!', { id: 'posting' });
      }
    }
    if (socket && postID)
      SendNotification(user?.email as string, postID, socket);
  };

  return (
    <div className={styles.header__container}>
      <div className={styles.header__starting}>
        <p>Home</p>
        <div className={styles.header__right__icon}>
          <Star />
        </div>
      </div>
      <div className={styles.header__middle}>
        <Image
          className={styles.header__user__image}
          src={'/one.jpg'}
          alt="dp_"
          height={50}
          width={50}
        />
        <input
          type="text"
          className={styles.header__input}
          placeholder="what's happening ?"
          value={ref}
          onChange={(e) => {
            setRef(e.target.value);
          }}
        />
      </div>
      <div className={styles.header__icons__with__button}>
        <div className={styles.header__icon__container}>
          <ImageIcon />
          <GifIcon />
          <PollIcon />
          <EmojiIcon />
          <ScheduleIcon />
          <LocationIcon />
        </div>
        <button
          disabled={false}
          onClick={() => handlePost()}
          className={styles.header__tweet__button}
          type="submit"
        >
          Tweet
        </button>
      </div>
    </div>
  );
};

export default Header;
