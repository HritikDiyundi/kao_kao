import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/index.module.css';
import BookmarkIndex from '../../components/bookmark/bunch/BookmarkIndex';
import Header from '../../components/bookmark/helper/Header';
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import ms from '../styles/message.module.css';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { ThemeContext, useTheme } from '../../context/UserProvider';
import moment from 'moment';
import { AddUserIcon } from '../../components/helper/NavigtorIcons';
import { toast } from 'react-hot-toast';
import { SendNotification } from '../../functions/sendRealTimeMessage';
import { SocketContext } from '../../context/SpcketProvider';
interface Participant {
  _id: string;
  name: string;
  email: string;
  imageUrl: string;
}

interface Message {
  // define properties for messages if available
}

interface Chat {
  _id: string;
  participants: Participant[];
  messages: Message[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ChatResponse {
  data: Chat[];
  message: string;
}
const Bookmark: NextPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [chatId, setChatId] = useState<string>('');
  const [userName, setUserName] = useState<string>('select any chat.');
  const [receiver, setReceiver] = useState<string>('');
  const [Data, setData] = useState<ChatMessage[] | []>([]);
  const { user } = useTheme();
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket?.on('messageReceived', (data) => {
      console.log(data.Message);
      // @ts-ignore
      setData([...Data, data.message]);
      //  toast.success(data.text, {
      //    duration: 3000,
      //  });
      //  setNotifications((prev: any) => [...prev, data]);
    });
  }, []);

  const handleChange = (chatIId: string) => {
    setChatId(chatIId);
  };
  const handleChangeOnUserName = (name: string, _id: string) => {
    setUserName(name);
    setReceiver(_id);
  };
  return (
    <div>
      <Head>
        <title>Messages</title>
        <meta name="description" content="bookmark cowcow" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={[styles.index__container].join(' ')}>
        <div className={styles.index__content}>
          <div className={ms.message__body}>
            <div className={ms.username__container}>
              <h1 className={ms.message__username}>{userName}</h1>
            </div>
            <div className={ms.chatbody__style}>
              <ChatBody
                chatId={chatId}
                userId={user?._id || ''}
                Data={Data}
                setData={setData}
              />
            </div>

            {isOpen && (
              <PopUpBody
                setChange={handleChange}
                setNameChange={handleChangeOnUserName}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
              />
            )}
            <button
              className={ms.fixed__button}
              onClick={() => setIsOpen(!isOpen)}
            >
              <AddUserIcon className={ms.icon} />
            </button>
          </div>
        </div>
        <SendMessage
          chatId={chatId}
          sender={user?._id || ''}
          receiver={receiver}
          Data={Data}
          setData={setData}
        />
      </div>
    </div>
  );
};

interface popUpBodyProps {
  setChange: (chatIId: string) => void;
  setNameChange: (name: string, _id: string) => void;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const PopUpBody = ({
  setChange,
  setNameChange,
  isOpen,
  setIsOpen,
}: popUpBodyProps) => {
  const { data: session, status } = useSession();
  const [dataa, setData] = useState<ChatResponse | null>(null);
  const { user } = useTheme();
  // console.log(user);

  useEffect(() => {
    if (session && session.user) {
      const handleGet = async () => {
        if (dataa == null && user?._id != undefined) {
          const response = await axios.get<ChatResponse>(
            `/api/message/getAllChat?userId=${user?._id}`
          );
          // console.log(response.data);

          setData(response.data);
        }
      };
      handleGet();
    }

    console.log(dataa);

    // fetchUser(email);
  }, [session, dataa, user]);
  return (
    <div className={ms.pop__up__body}>
      {dataa?.data.map((i, key) => {
        return (
          <div className={ms.individual__chat} key={key}>
            {i.participants.map(
              (j, subkey) =>
                j._id != user?._id && (
                  <div
                    onClick={() => {
                      setChange(i._id),
                        setNameChange(j.name, j._id),
                        setIsOpen(!isOpen);
                    }}
                    key={subkey}
                  >
                    {j.name}
                  </div>
                )
            )}
          </div>
        );
      })}
    </div>
  );
};

interface ChatMessage {
  _id: string;
  content: string;
  sender: {
    _id: string;
    name: string;
    email: string;
    imageUrl: string;
  };
  receiver: {
    _id: string;
    name: string;
    email: string;
    imageUrl: string;
  };
  chatId: string;
  encrypted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ChatMessageResponse {
  data: ChatMessage[];
  message: string;
}

interface chatBodyInterface {
  chatId: string;
  userId: string;
  Data: ChatMessage[] | null;
  setData: Dispatch<SetStateAction<ChatMessage[] | []>>;
}

const ChatBody = ({ chatId, userId, Data, setData }: chatBodyInterface) => {
  // const [Data, setData] = useState<ChatMessageResponse | null>(null);
  console.log(Data);

  async function fetchMessages() {
    const response = await axios.get<ChatMessageResponse>(
      `/api/message/getMessages?chatId=${chatId}`
    );
    console.log(response.data);
    setData(response.data.data);
  }
  useEffect(() => {
    if (chatId != '') fetchMessages();
  }, [chatId]);

  return (
    <div>
      {Data != null ? (
        <div>
          {Data.map((i, key) => {
            const messageClasses =
              i.sender._id === userId
                ? [ms.message, ms.sent].join(' ')
                : [ms.message, ms.received].join(' ');
            const text =
              i.sender._id === userId ? ms.sent__text : ms.received__text;
            return (
              <div className={messageClasses} key={key}>
                <div className={ms.msgbx}>
                  <p className={text}>{i.content}</p>
                  <p className={ms.timeline}>{moment(i.createdAt).fromNow()}</p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

interface sendMessageProps {
  sender: string;
  receiver: string;
  chatId: string;
  Data: ChatMessage[] | [];
  setData: Dispatch<SetStateAction<ChatMessage[] | []>>;
}

const SendMessage = ({
  sender,
  receiver,
  chatId,
  Data,
  setData,
}: sendMessageProps) => {
  const [message, setMessage] = useState<string>('');
  const [isSending, setIsSending] = useState<boolean>(false);
  const { socket } = useContext(SocketContext);

  const handleClick = async () => {
    setIsSending(true);
    try {
      if (sender == '' || receiver == '' || chatId == '' || message == '') {
        toast.error('something went wrong !');
        return;
      }
      const response = await axios.post<ChatMessage>(
        `api/message/sendMessage`,
        {
          content: message,
          sender: sender,
          receiver: receiver,
          chatId: chatId,
        }
      );
      console.log(response);
      // @ts-ignore
      setData([...Data, response.data.data]);
      setIsSending(false);
      setMessage('');

      console.log('sending message notification');
      // @ts-ignore
      SendNotification(response.data.data, receiver, socket);
    } catch (error) {
      setIsSending(false);
    }
  };
  return (
    <div className={ms.extra__style}>
      <input
        className={ms.input__bar}
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="enter any message..."
      />
      <button
        disabled={isSending}
        onClick={() => handleClick()}
        className={ms.button__style}
      >
        {isSending ? '...' : 'Send'}
      </button>
    </div>
  );
};

export default Bookmark;
