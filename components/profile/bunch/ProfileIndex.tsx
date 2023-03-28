import React, { useContext, useEffect, useState } from 'react';
import Likes from '../helper/Likes';
import Media from '../helper/Media';
import ProfilePoster from '../helper/ProfilePoster';
import PTab from '../helper/ProfileTab';
import Tweets from '../helper/Tweets';
import TAR from '../helper/TweetsAndReply';
import { useSession } from 'next-auth/react';

import axios from 'axios';
import { NextPage } from 'next';
import { ThemeContext, useTheme } from '../../../context/UserProvider';

const ProfileIndex = () => {
  const { data: session, status } = useSession();
  const [User, setUsers] = useState<User | null>(null);
  const { setUser } = useTheme();

  useEffect(() => {
    const handleGet = async () => {
      if (session && session.user && User == null) {
        const response = await axios.get<ResponseData>(
          `/api/user/getByEmail?email=${session.user.email}`
        );
        setUsers(response.data.data);
        setUser?.(response.data.data);
        //  setData(response.data);
        //  setUsers(response.data.data);
      }
    };

    handleGet();
  }, [session, User]);

  if (status === 'authenticated') {
    return (
      <div>
        <ProfilePoster />
        <PTab />

        {/* <h2>{users?.email}</h2> */}
      </div>
    );
  } else {
    return (
      <div>
        <h1>Login first</h1>
      </div>
    );
  }
};

export default ProfileIndex;
