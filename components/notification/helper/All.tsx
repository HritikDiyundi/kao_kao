import Image from 'next/image'
import React from 'react'
import { StarIcon,LogoDark } from '../../helper/NavigtorIcons'
import styles from "../styles/all.module.css"

function truncate({text,length}:truncateProps):string{
    return text.substring(0,length)+"...";
}

const temptext = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam omnis molestiae dolorum officia ipsam perspiciatis. Obcaecati magni eaque facere quidem eligendi molestias maiores aspernatur quo voluptatum, enim exercitationem! Dicta doloremque atque repudiandae incidunt earum voluptatem error id voluptates laboriosam quos obcaecati, commodi et iste non quaerat velit qui perferendis neque."

const All = () => {
  return (
    <>
      <Single />
      <Single />
      <Card />
    </>
  );
}
const Single = () => {
     return (
         <div className={styles.all__container}>
           <div>
             <StarIcon className={styles.all__icon__style} />
           </div>
           <div className={styles.all__identity}>
             <div>
               <Image
                 className={styles.user__image}
                 src="/first.jpg"
                 alt="sammmmmple"
                 height={30}
                 width={30}
               />
             </div>
             <div className={styles.all__heading}>
               Lorem ipsum{' '}
               <span className={styles.all__highlight}>bhushan </span>dolor sit
               amet.
             </div>
             <div className={styles.all__description}>
               {truncate({ text: temptext, length: 200 })}
             </div>
           </div>
         </div>
     );
}
const Card = () => {
    return (
      <div className={styles.card__container}>
        <div className={styles.card__body}>
          <LogoDark className={styles.card__logo} />
          <p className={styles.card__description}>
            cow__cow have been changed his policies.
          </p>
        </div>
      </div>
    );
}

type truncateProps = {
    text:string;
    length:number;
}

export default All