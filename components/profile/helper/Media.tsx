import React, { useEffect, useState, useContext } from 'react';
import Image from 'next/image';
// import styles from '../../feeds/style/whoToFollow.module.css';
import styles from '../styles/media.module.css';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useTheme } from '../../../context/UserProvider';
import { useRouter } from 'next/router';

const Media = () => {
  const { user } = useTheme();
  // console.log(user?.following);

  const { data: session, status } = useSession();
  const [Followings, setFollowings] = useState<subUsers[] | []>([]);
  const [userFollowings, setUserFollowers] = useState<string[]>([]);

  useEffect(() => {
    setUserFollowers(user?.following || []);
  }, [user]);

  useEffect(() => {
    const handlePost = async () => {
      if (session && session.user && Followings.length === 0) {
        console.log('entered');

        const response = await axios.get<completeFollowings>(
          `/api/user/getAllFollowing?email=${session.user.email}`
        );
        setFollowings(response.data.data.following);
        console.log(response.data.data.following);
      }
    };

    const timer = setTimeout(() => {
      handlePost();
    }, 5000);

    // handlePost();
  }, []);

  const handleFollow = async (
    followerId: string,
    userId: string,
    setState: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    const response = await axios.post<ResponseData>(
      `/api/user/folunfo?followerId=${followerId}&userId=${userId}`
    );
    if (response.data) {
    }
  };

  if (Followings.length !== 0) {
    return (
      <div className={styles.wtf__container}>
        <h3 className={styles.wtf__heading}></h3>
        <div className={styles.wtf_scrollable_container}>
          {Followings.map((i, index) => {
            if (i.email != session?.user?.email)
              return (
                <Person
                  key={index}
                  name={i.name}
                  email={i.email}
                  id={i._id}
                  userFollowings={userFollowings}
                  userId={user?._id || ''}
                />
              );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.wtf__container}>
        <h3 className={styles.wtf__heading}>Who To Follow</h3>
        <p>loading...</p>
      </div>
    );
  }
};

interface personType {
  name: string;
  email: string;
  id: string;
  userFollowings: string[];
  userId: string;
}

interface sub {
  followerId: string;
  userId: string;
}

const Person = ({ email, name, id, userFollowings, userId }: personType) => {
  const [follow, setFollow] = useState<boolean>(false);
  const router = useRouter();
  // console.log(followers);

  function isIdInArray(idArray: string[], idToCheck: string) {
    const idSet = new Set(idArray);
    return idSet.has(idToCheck);
  }

  const handleChange = async (followerId: string, userId: string) => {
    setFollow(!follow);
    const response = await axios.put<ResponseData>(
      `/api/user/folunfo?followerId=${followerId}&userId=${userId}`
    );
  };

  const handleMessage = async (userId: string, receiverId: string) => {
    const response = await axios.post<any>(`/api/message/createChat`, {
      participants: [userId, receiverId],
    });
    console.log(response);
    router.push('/message');
  };
  return (
    <div className={styles.person__container}>
      <div>
        <Image
          className={styles.person__dp}
          src="/first.jpg"
          alt="sample"
          height={50}
          width={50}
        />
      </div>
      <div className={styles.person_info_container}>
        <div>
          <p className={styles.person__name}>{name}</p>
          <p className={styles.person__username}>@{email.slice(0, 18)}</p>
        </div>
        <div className={styles.person__button__container}>
          <button
            className={styles.person_unfollow_button}
            onClick={() => {
              handleMessage(userId, id);
            }}
          >
            Message
          </button>
          <button
            className={
              follow
                ? styles.person_unfollow_button
                : styles.person_follow_button
            }
            onClick={() => handleChange(id, userId)}
          >
            {follow ? 'Follow' : 'unfollow'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Media;
