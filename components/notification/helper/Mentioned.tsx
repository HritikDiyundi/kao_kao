import React from 'react'
import styles from "../styles/mentioned.module.css"
import Posts from '../../home/helper/Posts';

const Mentioned = () => {
  return (
    <div className={styles.mention__container}>
      <div></div>
      <div className={styles.mention__metadata}>
        <h2 className={styles.mention__heading}>Control which conversations you&apos;re mentioned in</h2>
        <p className={styles.mention__description}>
          Use the action menu — those three little dots on a Tweet — to untag
          yourself and leave a conversation. <span className={styles.mention__link}>Learn more</span>
        </p>
      </div>
      <div>
        <Posts/>
      </div>
    </div>
  );
}

export default Mentioned