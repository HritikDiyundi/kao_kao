import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Tweets from './Tweets';
import TAR from './TweetsAndReply';
import Media from './Media';
import Likes from './Likes';
import styles from '../styles/profiletab.module.css';

const Ptab = () => {
  const [activeTab, setActiveTab] = useState<Number>(0);

  return (
    <div>
      <PTabNavigator state={activeTab} setState={setActiveTab} />
      <div>
        {(() => {
          if (activeTab == 3) return <Likes />;
          else if (activeTab == 1) return <TAR />;
          else if (activeTab == 2) return <Media />;
          else if (activeTab == 0) return <Tweets />;
        })()}
      </div>
    </div>
  );
};

const PTabNavigator = ({ state, setState }: navigatorTypes) => {
  return (
    <div className={styles.pt__container}>
      <div
        className={`${styles.pt__tab} ${
          state === 0 ? styles.selected__tab : ''
        }`}
      >
        <p onClick={() => setState(0)}>Tweets</p>
      </div>
      <div
        title="Tweets_&_replies"
        className={`${styles.pt__tab} ${
          state === 1 ? styles.selected__tab : ''
        }`}
      >
        <p onClick={() => setState(1)}>Tweets & replies</p>
      </div>
      <div
        title="Followers"
        className={`${styles.pt__tab} ${
          state === 2 ? styles.selected__tab : ''
        }`}
      >
        <p onClick={() => setState(2)}>Followers</p>
      </div>
      <div
        title="Likes"
        className={`${styles.pt__tab} ${
          state === 3 ? styles.selected__tab : ''
        }`}
      >
        <p onClick={() => setState(3)}>Likes</p>
      </div>
    </div>
  );
};

type navigatorTypes = {
  state: Number;
  setState: Dispatch<SetStateAction<Number>>;
};

export default Ptab;
