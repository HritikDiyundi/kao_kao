import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import {
  Home,
  Bookmark,
  Hash,
  List,
  Message,
  More,
  Notification,
  Profile,
  Logo,
  MoreIcon,
  LogoutIcon,
  LogINIcon,
} from '../components/helper/NavigtorIcons';
import styles from './styles/navigator.module.css';
import { useSession, signIn, signOut } from 'next-auth/react';

const Navigator = ({ handleClick }: notificationType) => {
  return (
    <div className={styles.navigator__parent}>
      <div className={styles.navigator__container}>
        <div className={styles.navigator__logo}>
          <Logo />
        </div>
        <Link href="/">
          <div className={styles.navigator__row}>
            <Home />
            <p>Home</p>
          </div>
        </Link>
        {/* <Link href="/explore">
          <div className={styles.navigator__row}>
            <Hash />
            <p>Explore</p>
          </div>
        </Link> */}
        <Link href="/notification">
          <div className={styles.navigator__row}>
            <Notification />
            <p>Notification</p>
          </div>
        </Link>
        <Link href="/message">
          <div className={styles.navigator__row}>
            <Message />
            <p>Message</p>
          </div>
        </Link>
        {/* <Link href="/bookmark">
          <div className={styles.navigator__row}>
            <Bookmark />
            <p>Bookmark</p>
          </div>
        </Link> */}
        {/* <Link href={`/${String('bhushan_r')}/list`}>
          <div className={styles.navigator__row}>
            <List />
            <p>List</p>
          </div>
        </Link> */}
        <Link href={`/profile`}>
          <div className={styles.navigator__row}>
            <Profile />
            <p>Profile</p>
          </div>
        </Link>
        {/* <div className={styles.navigator__row}>
          <More />
          <p>More</p>
        </div> */}
        <div onClick={handleClick} className={styles.navigator__tweet__button}>
          Tweet
        </div>
      </div>
      <AccountBar />
    </div>
  );
};

const AccountBar = () => {
  const { data: session, status } = useSession();
  if (status === 'authenticated') {
    return (
      <div className={styles.navigation__user__set}>
        <Image
          src="/one.jpg"
          height={60}
          width={60}
          className={styles.navigator__user__image}
          alt="samplename"
        />
        <div className={styles.navigation__user__right}>
          <div>
            <p className={styles.navigation__user__name}>
              {session.user?.name?.slice(0, 10) || 'undefined'}..
            </p>
            <p className={styles.navigation__user__username}>
              @{session.user?.email?.slice(0, 8) || 'undefined'}..
            </p>
          </div>
          <button
            className={styles.logout__container}
            onClick={() => signOut()}
          >
            <LogoutIcon className={styles.navigator__more__icon} />
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.navigation__user__set} onClick={() => signIn()}>
        <h4>Login Please</h4>
        <LogINIcon className={styles.navigator__more__icon} />
      </div>
    );
  }
};

type notificationType = {
  handleClick: () => void;
};

export default Navigator;
