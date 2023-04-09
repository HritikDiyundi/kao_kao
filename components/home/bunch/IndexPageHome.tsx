import React, { useContext, useEffect, useState } from 'react';
import Header from '../helper/Header';
import Posts from '../helper/Posts';
import styles from '../styles/index.module.css';
import axios from 'axios';

const IndexPageHome = () => {
  const [data, setData] = useState<tweetDoc[] | []>([]);

  useEffect(() => {
    const handlePost = async () => {
      if (data.length == 0) {
        const response = await axios.get<Responsee | null>(
          `api/tweet/getHighImpressionTweets`
        );
        setData(response.data?.data.tweets || []);
      }
    };

    setTimeout(() => {
      handlePost();
    }, 5000);

    // handlePost();
  }, []);

  return (
    <div>
      <Header />
      <BriefDesc />
      {/* <Posts data={data }/> */}
      {data
        ?.map((i, num) => {
          return (
            <Posts
              key={num}
              _id={i._id}
              author={i.author}
              comments={i.comments}
              likes={i.likes}
              reference={i.reference}
              retweets={i.retweets}
            />
          );
        })
        .reverse()}
    </div>
  );
};

const BriefDesc = () => {
  return (
    <div className={styles.bd__container}>
      <div className={styles.bd__strip}>Show 225 dc tweets</div>
      <div className={styles.bd__card}>
        <h2 className={styles.bd__card__heading}>Welcome to Kao Kao</h2>
        <p className={styles.bd__card__description}>
          Select some topics you&apos;re interested in to help personalize your
          Twitter experience, starting with finding people to follow.
        </p>
        <button className={styles.bd__card__button} type="submit">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default IndexPageHome;
