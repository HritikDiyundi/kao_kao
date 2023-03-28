import Image from 'next/image'
import React from 'react'
import { DownIcon, EarthIcon, EmojiIcon, GifIcon, ImageIcon, LocationIcon, PollIcon, Retweet, ScheduleIcon, XIcon } from './helper/NavigtorIcons'
import styles from './styles/popup.module.css'

const PopUpBody = ({handleClick}:popupBodyType) => {
  return (
    <>
    <div className={styles.popup__top__container}>
        <div onClick={handleClick}>
      <XIcon className={styles.popup__icon} />
        </div>
    </div>
      <div className={styles.popup__identity__container}>
        <Image
          src={'/first.jpg'}
          alt="userdp"
          height={45}
          width={45}
          className={styles.popup__user__dp}
        />
        <div>
          <div className={styles.popup__flex__container}>
            <p>Everyone </p>
            <DownIcon className={styles.popup__down__icon} />
          </div>
        </div>
      </div>
      <textarea
        placeholder="What's happening !"
        className={styles.popup__textarea}
      />
      <div className={styles.popup__accessibility}>
        <EarthIcon className={styles.popup__accessibility__icon} />
        <p>Everyone can reply</p>
      </div>
      <div className={styles.popup__action__container}>
        <div className={styles.popup__icon__container}>
          <ImageIcon className={styles.header__icon__container__icon} />
          <GifIcon className={styles.header__icon__container__icon} />
          <PollIcon className={styles.header__icon__container__icon} />
          <EmojiIcon className={styles.header__icon__container__icon} />
          <ScheduleIcon className={styles.header__icon__container__icon} />
          <LocationIcon className={styles.header__icon__container__icon} />
        </div>
        <button
          disabled={true}
          className={styles.popup__tweet__button}
          type="submit"
        >
          Tweet
        </button>
      </div>
    </>
  );
}

type popupBodyType = {
  handleClick: () => void;
};

export default PopUpBody