import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import IndexPageFeed from '../../components/feeds/bunch/IndexPageFeed';
import Navigator from '../../components/Navigator';
import { SessionProvider, useSession } from 'next-auth/react';
import axios from 'axios';
import { ThemeContext } from '../../context/UserProvider';
import PopUpBody from '../../components/PopUpBody';
import styles from '../styles/popup.module.css'

interface MyAppProps extends AppProps {
  pageProps: {
    session: any;
  };
}

export default function App({ Component, pageProps }: MyAppProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  if (typeof window !== 'undefined') {
    if (isOpen) {
      document.body.classList.add('active__tab');
    } else {
      document.body.classList.remove('active__tab');
    }
  }
  return (
    // <div className="grid-container">
    //   <div>{/* left navigation */}</div>
    //   <div>
    //     <Component {...pageProps} />
    //   </div>
    //   <div>{/* Feed section */}</div>
    // </div>
    <SessionProvider session={pageProps.session} refetchInterval={5 * 60}>
      <ThemeContext.Provider value={{ user: user!, setUser }}>
        <div className="parent">
          <div className="child left">
            <Navigator handleClick={handleClick} />
          </div>
          <div className="child scrollable">
            <div className="">
              <Component {...pageProps} />
            </div>
          </div>
          <div className="child right">
            <IndexPageFeed />
            <h3>right</h3>
          </div>
          {isOpen && (
            <div>
              <div onClick={handleClick} className={styles.pop__container}></div>
              <div className={styles.pop__content__container}>
                <PopUpBody handleClick={handleClick} />
              </div>
              {/* </div> */}
            </div>
          )}
        </div>
      </ThemeContext.Provider>
    </SessionProvider>
  );
}
