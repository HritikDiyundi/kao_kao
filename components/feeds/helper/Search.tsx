import React from 'react';
import styles from '../style/search.module.css';
import { Search__Icon } from '../../helper/NavigtorIcons';
import { ConnectButton } from 'web3uikit';
import { useSession } from 'next-auth/react';

const Search = () => {
  const { status } = useSession();
  if (status === 'authenticated') {
    return <ConnectButton moralisAuth={false} />;
  } else {
    return <div></div>;
  }
};

export default Search;
