import Image from 'next/image'
import React from 'react'
import styles from "../styles/tweets.module.css"

const Tweets = () => {
  return (
    <div className={styles.tweet__container}>
      <div className={styles.tweet__image__container}>
        <Image
          src="/first.jpg"
          height={140}
          width={140}
          alt="sample"
          className={styles.tweet_image}
        />
      </div>
      <div>
        <div className={styles.tweet__identity}>
          <div>
            <p className="name">Chotta bheem</p>
            <p className="username">@dholakpurKaBheem</p>
          </div>
          <div>
            <button className={styles.follow__btn}>Follow</button>
          </div>
        </div>
        <div className={styles.tweet__description}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Exercitationem quam dolor, accusantium debitis autem temporibus.
            Inventore necessitatibus assumenda nemo incidunt.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Tweets