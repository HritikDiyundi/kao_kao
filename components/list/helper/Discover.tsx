import React from 'react'
import { ListIcon } from '../../helper/NavigtorIcons'
import styles from "../styles/discover.module.css"

const Discover = () => {
  return (
    <div className={styles.dis__main__container}>
      <h3 className={styles.discover__heading}>Discover new lists</h3>
      <IList
        id="1"
        ownerName="Bhushan Raipurkar"
        title="MaJaMAA"
        username="bhushan_r"
        key={1}
      />
      <IList
        id="2"
        ownerName="Ritik Diyudi"
        title="Raapchick"
        username="hritik__02"
        key={2}
      />
      <IList
        id="3"
        ownerName="Rakesh Sorde"
        title="__bakchodi"
        username="rakeshR"
        key={3}
      />
      <div className={styles.show__more}>
        Show more
      </div>
    </div>
  );
}

const IList = ({id,ownerName,title,username}:IlistProps) => {
  var colors = [
    '#E0245E',
    '#FECD78',
    '#1DA1F2',
    '#06DFBC',
    '#DADADA',
    '#C5F0FF',
    '#794BC4',
  ];
  var randomColor = colors[Math.floor(Math.random() * colors.length)];
  
  
  return (
    <div key={JSON.stringify(id)} className={styles.Ilist__container}>
      <div id="setcolor" style={{backgroundColor:randomColor}} className={styles.icon__container}>
        <ListIcon className={styles.discover__icon} />
      </div>
      <div className={styles.Ilist__middle__div}>
        <p className={styles.Ilist__title}>{title}</p>
        <p className="name" style={{fontSize:"14px"}}>
          {ownerName}
          <span className="username" style={{marginLeft:"5px", fontSize:"13px",fontWeight:"lighter"}}>@{username}</span>
        </p>
      </div>
      <button className={styles.Ilist__button}>Follow</button>
    </div>
  );
}

type IlistProps = {
    id:string;
    title:string;
    ownerName:string;
    username:string;
}

export default Discover