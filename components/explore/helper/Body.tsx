import React, { useState } from 'react'
import styles from "../styles/body.module.css"
import Entertainment from './Entertainment'
import ForYou from './ForYou'
import News from './News'
import Sports from './Sports'
import Trending from './Trending'

const BodyIndex = () => {
  const [Tab, setTab] = useState<bodyIndexProps>({
    tab:selection.foryou
  });
  const handleOnClickEvent = ({tab}: bodyIndexProps) => {
   setTab({tab:tab});
  };
  return (
    <div className={styles.body__container}>
      <div className={styles.body__navigation__container}>
        <p
          onClick={() => handleOnClickEvent({ tab: selection.foryou })}
          className={`${Tab.tab == selection.foryou ? styles.active__tab : ''}`}
        >
          For you
        </p>
        <p
          onClick={() => handleOnClickEvent({ tab: selection.trending })}
          className={`${Tab.tab == selection.trending ? styles.active__tab : ''}`}
        >
          Trending
        </p>
        <p
          onClick={() => handleOnClickEvent({ tab: selection.news })}
          className={`${Tab.tab == selection.news ? styles.active__tab : ''}`}
        >
          News
        </p>
        <p
          onClick={() => handleOnClickEvent({ tab: selection.sports })}
          className={`${Tab.tab == selection.sports ? styles.active__tab : ''}`}
        >
          Sports
        </p>
        <p
          onClick={() => handleOnClickEvent({ tab: selection.entertainment })}
          className={`${Tab.tab == selection.entertainment ? styles.active__tab : ''}`}
        >
          Entertainment
        </p>
      </div>
      <RenderComponent tab={Tab.tab}/>
    </div>
  );
}

const RenderComponent = ({tab}: bodyIndexProps) => {
  if (tab == selection.trending) return <Trending />;
  else if (tab == selection.news) return <News />;
  else if (tab == selection.sports) return <Sports />;
  else if (tab == selection.entertainment) return <Entertainment />;
  else return <ForYou />;
};

enum selection {
  foryou= "foryou",
  trending="trending",
  news="news",
  sports="sports",
  entertainment="entertainment"
}

type bodyIndexProps = {
  tab: selection;
};

export default BodyIndex