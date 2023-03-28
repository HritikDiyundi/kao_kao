import React from 'react'
import styles from "../style/search.module.css"
import {Search__Icon} from "../../helper/NavigtorIcons"

const Search = () => {
  return (
    <div className={styles.search__container}>
      <div className={styles.search__icon}>
        <Search__Icon/>
      </div>
      <input type="text" placeholder="Search here" />
    </div>
  );
}

export default Search