import axios from 'axios';
import { useContext } from 'react';
import { Socket } from 'socket.io-client';

interface User {
  _id: string;
  name: string;
  email: string;
  imageUrl: string;
  followers: string[];
  following: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ForThisUser {
  _id: string;
  name: string;
  email: string;
  imageUrl: string;
  followers: User[];
  following: User[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ForThisResponseData {
  data: ForThisUser;
  message: string;
}

function SendNotification(email: string, postId: string, socket: Socket) {
  if (email == '' || postId == '') {
    console.log(email, postId);
    console.log('cant send notification because of insufficient data.');
    return;
  }

  console.log('checkpoint-1');
  console.log(postId);

  const getFollowers = async () => {
    try {
      const response = await axios.get<ForThisResponseData>(
        `/api/user/getPopulatedUser?email=${email}`
      );
      const followers = response.data.data?.followers;
      sendNotificationToFollowers(followers);
      console.log('checkpoint-2');
    } catch (error) {
      console.log(error);
    }
  };

  const sendNotificationToFollowers = (followers: User[] = []) => {
    followers.forEach((follower) => {
      try {
        const senderName = email; // Replace with your app name
        const receiverEmail = follower.email;
        const Image = follower.imageUrl;
        const name = follower.name;
        const text = `A new post has been created by ${postId}`;
        console.log(text);

        socket?.emit('sendText', { senderName, receiverEmail, text });
        console.log('checkpoint-3');
      } catch (error) {
        console.log(error);
      }
    });
  };

  getFollowers();
}

export { SendNotification };
