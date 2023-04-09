import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Tweets from './Tweets';
import TAR from './TweetsAndReply';
import Media from './Media';
import Likes from './Likes';
import styles from '../styles/profiletab.module.css';

const Ptab = () => {
  const [activeComponent, setActiveComponent] =
    useState<string>('ComponentOne');
  const handleButtonClick = (componentName: string) => {
    setActiveComponent(componentName);
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case 'ComponentOne':
        return <Likes />;
      case 'ComponentTwo':
        return <TAR />;
      case 'ComponentThree':
        return <Media />;
      case 'ComponentFour':
        return <Tweets />;
      default:
        return <Likes />;
    }
  };

  // return (
  //   <div>
  //     <PTabNavigator state={activeTab} setState={setActiveTab} />
  //     {/* <div>
  //       {(() => {
  //         if (activeTab == 3) return <Likes />;
  //         else if (activeTab == 1) return <TAR />;
  //         else if (activeTab == 2) return <Media />;
  //         else if (activeTab == 0) return <Tweets />;
  //       })()}
  //     </div> */}

  //   </div>
  // );
  return (
    <div>
      <PTabNavigator
        state={activeComponent}
        setState={setActiveComponent}
        handleClick={handleButtonClick}
      />
      <div>{renderComponent()}</div>
    </div>
  );
};

const PTabNavigator = ({ state, setState, handleClick }: navigatorTypes) => {
  return (
    <div className={styles.pt__container}>
      <div
        className={`${styles.pt__tab} ${
          state == 'ComponentOne' ? styles.selected__tab : ''
        }`}
        onClick={() => handleClick('ComponentOne')}
      >
        <p>Tweets</p>
      </div>
      <div
        title="Tweets_&_replies"
        className={`${styles.pt__tab} ${
          state == 'ComponentTwo' ? styles.selected__tab : ''
        }`}
        onClick={() => handleClick('ComponentTwo')}
      >
        <p>Tweets & replies</p>
      </div>
      <div
        title="Followers"
        className={`${styles.pt__tab} ${
          state == 'ComponentThree' ? styles.selected__tab : ''
        }`}
        onClick={() => handleClick('ComponentThree')}
      >
        <p>Followers</p>
      </div>
      <div
        title="Likes"
        className={`${styles.pt__tab} ${
          state == 'ComponentFour' ? styles.selected__tab : ''
        }`}
        onClick={() => handleClick('ComponentFour')}
      >
        <p>Likes</p>
      </div>
    </div>
  );
};

type navigatorTypes = {
  state: string;
  setState: Dispatch<SetStateAction<string>>;
  handleClick: (componentName: string) => void;
};

export default Ptab;
