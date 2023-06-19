import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect, useState, useMemo } from 'react';
import IndexPageFeed from '../../components/feeds/bunch/IndexPageFeed';
import Navigator from '../../components/Navigator';
import { SessionProvider, useSession } from 'next-auth/react';
import axios from 'axios';
import { ThemeContext } from '../../context/UserProvider';
import PopUpBody from '../../components/PopUpBody';
import styles from '../styles/popup.module.css';
import React from 'react';
import { SocketContext, SocketContextType } from '../../context/SpcketProvider';
import { Socket, io } from 'socket.io-client';
import { Toaster, toast } from 'react-hot-toast';
// const END_POINTS = 'http://localhost:8081';
const END_POINTS = 'http://localhost:8081';
import { MoralisProvider } from 'react-moralis';

interface MyAppProps extends AppProps {
  pageProps: {
    session: any;
  };
}

export default function App({ Component, pageProps }: MyAppProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);

  const socketContextValue: SocketContextType = useMemo(
    () => ({
      socket,
      setSocket,
    }),
    [socket]
  );

  useEffect(() => {
    console.log(END_POINTS);

    const socket = io(END_POINTS, {
      // withCredentials: true,
    });

    socket?.on('getText', (data) => {
      console.log(data);
      toast.success(data.text, {
        duration: 3000,
      });
      //  setNotifications((prev: any) => [...prev, data]);
    });

    setSocket(socket);
  }, []);

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
    <MoralisProvider initializeOnMount={false}>
      <SocketContext.Provider value={socketContextValue}>
        <SessionProvider session={pageProps.session} refetchInterval={5 * 60}>
          <ThemeContext.Provider value={{ user: user!, setUser }}>
            <div className="parent">
              <div className="child left">
                <Navigator handleClick={handleClick} />
              </div>
              <div className="child scrollable">
                <div className="">
                  <Component {...pageProps} />
                  <Toaster />
                </div>
              </div>
              <div className="child right">
                <IndexPageFeed />
              </div>
              {isOpen && (
                <div>
                  <div
                    onClick={handleClick}
                    className={styles.pop__container}
                  ></div>
                  <div className={styles.pop__content__container}>
                    <PopUpBody handleClick={handleClick} />
                  </div>
                  {/* </div> */}
                </div>
              )}
            </div>
          </ThemeContext.Provider>
        </SessionProvider>
      </SocketContext.Provider>
    </MoralisProvider>
  );
}
