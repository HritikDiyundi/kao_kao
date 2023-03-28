import Image from 'next/image';
import React, { useContext } from 'react';
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
import { UserContext } from '../../../pages/index';

const Header = () => {
  const { users } = useContext(UserContext);
  console.log(users);

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
          disabled={true}
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
