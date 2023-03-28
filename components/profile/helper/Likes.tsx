import React from 'react'
import styles from "../styles/likes.module.css"

const Likes = () => {
  const [hasLike, setHasLike] = React.useState(false);
 if(hasLike){
  return (
    <div>
      You do have some likes.
    </div>
  )
 }else{
  return(
    <NoLike/>
  )
 }
}

const NoLike  = () =>{
  return (
    <div className={styles.nolike__container}>
      <h2>
        You don&apos;t have any Likes yet
      </h2>
      <p>Tap the heart on any dc tweet to show it some love.<br/>
      When you do, it&apos;ll show up here.</p>
     
    </div>
  )
}

export default Likes