import React from 'react';
import All from '../helper/All';
import Mentioned from '../helper/Mentioned';
import styles from '../styles/index.module.css';

const IndexNotification = () => {
  const [tab, setTab] = React.useState<Number>(0);
  const handleSwitch = (expectNo: Number) => {
    setTab(expectNo);
    return tab;
  };
  return (
    <div className={styles.in__container}>
      <p className={styles.in__heading}>Notifications</p>
      <IndexNavigator activate={tab} handleClick={handleSwitch} />
      <div className={styles.in__body}>
        {(() => {
          if (tab === 1) return <Mentioned />;
          else return <All />;
        })()}
      </div>
    </div>
  );
};

const IndexNavigator = ({ handleClick, activate }: INProps) => {
  return (
    <div className={styles.navi__container}>
      <div
        className={`${styles.only__tab} ${
          activate === 0 ? styles.activate__tab : ''
        }`}
        onClick={() => handleClick(0)}
      >
        <p>All</p>
      </div>
      <div
        className={`${styles.only__tab} ${
          activate === 1 ? styles.activate__tab : ''
        }`}
        // onClick={() => handleClick(1)}
      >
        <p>Mentioned</p>
      </div>
    </div>
  );
};

type INProps = {
  activate: Number;
  handleClick: (expectNo: Number) => Number;
};

export default IndexNotification;
