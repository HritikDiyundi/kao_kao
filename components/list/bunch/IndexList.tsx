import React from 'react'
import Discover from '../helper/Discover'
import Header from '../helper/Header'
import YourList from "../helper/YourList"
import styles from "../styles/index.module.css"

const IndexList = ({username}:indexProps) => {
  return (
    <div>
      <Header username={username} />
      <Description/>
      <Discover/>
      <YourList/>
    </div>
  );
}

const Description = () => {
    return (
      <div className={styles.desc__container}>
        <h3>Pinned Lists</h3>
        <p>
          Nothing to see here yet — pin your favorite Lists to access them
          quickly.
        </p>
      </div>
    );
}

type indexProps = {
    username: string;
}

export default IndexList