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
import { ethers } from 'ethers';
// import { AlchemyProvider } from 'ethers/src.ts/providers';
import TwitterContractABI from '../../../src/utils/TwitterContract.json';

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

declare global {
  interface Window {
    ethereum?: any;
  }
}

const Header = () => {
  const [ref, setRef] = useState<string>(' ');
  const [post, setPost] = useState<Tweet | null>(null);
  const [PostID, setPostID] = useState<string>('');
  const { user } = useTheme();
  // console.log(user?.email)
  const { socket } = useContext(SocketContext);

  const addTweet = async () => {
    let tweet = {
      tweetText: ref,
      isDeleted: false,
    };

    try {
      const { ethereum } = window;

      if (ethereum) {
        await ethereum.request({ method: 'eth_requestAccounts' });
        //@ts-ignore
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        // Replace with the correct address of the deployed Twitter contract
        const twitterAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

        // Replace with the correct ABI of the deployed Twitter contract
        const twitterABI = TwitterContractABI.abi;

        const TwitterContract = new ethers.Contract(
          twitterAddress,
          twitterABI,
          signer
        );

        let twitterTx = await TwitterContract.addTweet(
          tweet.tweetText,
          tweet.isDeleted
        );

        console.log(twitterTx);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log('Error submitting new Tweet', error);
    }
  };

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
        addTweet();
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
