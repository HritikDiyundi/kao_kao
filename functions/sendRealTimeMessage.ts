import axios from 'axios';
import { useContext } from 'react';
import { Socket } from 'socket.io-client';

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

function SendNotification(
  Message: ChatMessage,
  receiver: string,
  socket: Socket
) {
  if (Message == null || receiver == '') {
    console.log(Message, receiver);
    console.log('cant send notification because of insufficient data.');
    return;
  }
  console.log(Message, receiver);
  try {
    socket?.emit('sentMessage', { Message, receiver });
  } catch (error) {
    console.log(error);
  }
}

export { SendNotification };
