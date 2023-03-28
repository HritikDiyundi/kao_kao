import React, { useState } from 'react'
import styles from "../styles/yourlist.module.css"

const IndexComponent = () => {
    const [isEmpty, setisEmpty] = useState<boolean>(true);
  return(
    <div className={styles.index__comp__container}>
        {(()=>{
            if (isEmpty) {
                return <NoList/>
            } else {
               return <List/> 
            }
        })()}
    </div>
  )
}

const NoList = () => {
    return (
      <div>
        <h3>Your Lists</h3>
        <p className={styles.nolist__description}>
          You haven&apos;t created or followed any Lists. When you do,
          they&apos;ll show up here.
        </p>
      </div>
    );
}

const List = () => {
    return(
        <div>
            <p>you have some list</p>
        </div>
    )
}

export default IndexComponent