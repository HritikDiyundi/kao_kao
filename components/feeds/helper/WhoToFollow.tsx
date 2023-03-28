import React, { useEffect, useState, useContext } from 'react';
import Image from 'next/image';
import styles from '../style/whotofollow.module.css';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useTheme } from '../../../context/UserProvider';

const WhoToFollow = () => {
  const { user } = useTheme();
  // console.log(user?.following);

  const { data: session, status } = useSession();
  const [popularUser, setPopularUser] = useState<User[] | []>([]);
  const [userFollowings, setUserFollowers] = useState<string[]>([]);

  useEffect(() => {
    setUserFollowers(user?.following || []);
  }, [user]);

  useEffect(() => {
    const handlePost = async () => {
      if (session && session.user && popularUser.length === 0) {
        console.log('entered');

        const response = await axios.get<longResponse>(
          `/api/user/whoToFollow?email=${session.user.email}`
        );
        setPopularUser(response.data.data.popularUsers);
        // console.log(response);
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

  if (popularUser.length !== 0) {
    return (
      <div className={styles.wtf__container}>
        <h3 className={styles.wtf__heading}>Who To Follow</h3>
        <div className={styles.wtf__scrollable__container}>
          {popularUser.map((i, index) => {
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
  return (
    <div className={styles.person__container}>
      <div>
        <Image
          className={styles.person__dp}
          src="/first.jpg"
          alt="sample"
          height={35}
          width={35}
        />
      </div>
      <div className={styles.person__info__container}>
        <div>
          <p className={styles.person__name}>{name.slice(0, 15)}</p>
          <p className={styles.person__username}>@{email.slice(0, 18)}</p>
        </div>
        <div>
          <button
            className={
              follow
                ? styles.person__unfollow__button
                : styles.person__follow__button
            }
            onClick={() => handleChange(id, userId)}
          >
            {follow ? 'Unfollow' : 'Follow'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WhoToFollow;
