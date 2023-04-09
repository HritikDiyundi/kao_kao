import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import {
  CommmentIcon,
  HeartIcon,
  MoreIcon,
  Retweet,
  ShareIcon,
  VerifiedIcon,
} from '../../helper/NavigtorIcons';
import styles from '../styles/posts.module.css';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useTheme } from '../../../context/UserProvider';
import moment from 'moment';
import 'react-tooltip/dist/react-tooltip.css';
import Tooltip from 'react-tooltip';

interface Props {
  data: {
    tweet: tweetDoc | null;
  };
}

const Posts = ({
  author,
  comments,
  likes,
  reference,
  retweets,
  _id,
}: tweetDoc) => {
  const { user } = useTheme();
  const { data: session, status } = useSession();
  const [isCommentOpen, setIsCommentOpen] = useState<boolean>(false);

  const [comment, setComment] = useState<string>('');

  const handleClick = async (): Promise<void> => {
    const response = await axios.post<ResponseData>(
      `/api/tweet/createComment?tweetId=${_id}`,
      { text: comment, userId: user?._id }
    );

    setComment('');
    setIsCommentOpen(false);
  };

  return (
    <div className={styles.post__container}>
      <div className={styles.post__owner__photo}>
        <div className={styles.comment__image}>
          <Image
            src="/first.jpg"
            alt="username"
            height={50}
            width={50}
            className={styles.owner__photo}
          />
        </div>
      </div>
      <div className={styles.metadata__index__container}>
        <Metadata userName={author.email} name={author.name} />
        <PostBody tweetData={reference} />
        {status === 'authenticated' ? (
          <PostAction
            state={isCommentOpen}
            setState={setIsCommentOpen}
            LikedList={likes}
            userId={user?._id || ''}
            tweetId={_id || ''}
          />
        ) : (
          <div></div>
        )}
        {isCommentOpen && (
          <Comments
            PostAComment={handleClick}
            commentState={comment}
            setCommentState={setComment}
            _id={_id || ' '}
          />
        )}
      </div>
    </div>
  );
};
interface metadataprops {
  name: string;
  userName: string;
}

const Metadata = ({ name, userName }: metadataprops) => {
  return (
    <div className={styles.metadata__container}>
      <div className={styles.metadata__left}>
        <p className={styles.metadata__name}>{name}</p>
        <VerifiedIcon className={styles.verified__icon} />
        {/* <p className={styles.metadata__username}>@{userName}.</p> */}
        <pre className={styles.metadata__date}>Oct 13</pre>
      </div>
      <div>
        <MoreIcon className={`${styles.icon__style} ${styles.more__icon}`} />
      </div>
    </div>
  );
};

interface postBodyProps {
  tweetData: string;
}

const PostBody = ({ tweetData }: postBodyProps) => {
  return (
    <div className={styles.postbody__container}>
      <p>{tweetData}</p>
    </div>
  );
};

interface postActionProps {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  LikedList: string[];
  userId: string;
  tweetId: string;
}
export const PostAction = ({
  setState,
  state,
  LikedList,
  userId,
  tweetId,
}: postActionProps) => {
  const handleCommentOpen = () => {
    setState(!state);
  };
  const [isLike, setIsLike] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(LikedList.length);
  const handleLike = async () => {
    setIsLike(!isLike);
    setLikeCount(isLike ? likeCount - 1 : likeCount + 1);
    await axios.put(`/api/tweet/like?tweetId=${tweetId}`, { userId: userId });
  };

  function isStringPresentInArray(arr: string[], target: string): void {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === target) {
        setIsLike(true);
      }
    }
  }

  useEffect(() => {
    isStringPresentInArray(LikedList, userId);
  }, [LikedList, userId]);

  return (
    <div className={styles.postaction__container}>
      <div
        className={styles.postaction__individual}
        onClick={() => handleCommentOpen()}
      >
        <CommmentIcon
          className={`${styles.icon__style} ${styles.postaction__comment__icon}`}
        />
        <p
          data-tip="Example tooltip"
          data-for="example-tooltip"
          className={styles.postaction__comment__text}
        >
          2.3k
        </p>
      </div>
      <div className={styles.postaction__individual}>
        <Retweet
          className={`${styles.icon__style} ${styles.postaction__retweet__icon}`}
        />
        <p className={styles.postaction__retweet__text}>3.3k</p>
      </div>
      <div
        onClick={() => handleLike()}
        className={`${styles.postaction__individual} ${isLike && styles.liked}`}
      >
        <HeartIcon
          className={`${styles.icon__style} ${styles.postaction__heart__icon}`}
        />
        <p className={styles.postaction__heart__text}>{likeCount}</p>
      </div>
      <div className={styles.postaction__individual}>
        <ShareIcon
          className={`${styles.icon__style} ${styles.postaction__share__icon}`}
        />
      </div>
    </div>
  );
};

interface commentProps {
  commentState: string;
  setCommentState: React.Dispatch<React.SetStateAction<string>>;
  PostAComment: () => Promise<void>;
  _id: string;
}

const Comments = ({
  PostAComment,
  commentState,
  setCommentState,
  _id,
}: commentProps) => {
  const [Comments, setComments] = useState<RComment[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getAllComments = async () => {
    try {
      const response = await axios.get<RCommentResponse>(
        `api/tweet/getComments?tweetId=${_id}`
      );

      setComments(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (Comments.length == 0) {
      getAllComments();
    }
  }, []);

  return (
    <div className={styles.comment__container}>
      <div className={styles.comment__post__container}>
        <div className={styles.comment__input__bar}>
          <input
            className={styles.comment__input}
            type="text"
            name="comment"
            id="comment"
            value={commentState}
            onChange={(e) => setCommentState(e.target.value)}
            placeholder="Enter comment here..."
          />
        </div>
        <button
          onClick={() => PostAComment()}
          className={styles.comment__post__button}
        >
          Send
        </button>
      </div>
      <div className={styles.comment__display__div}>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            {Comments?.map((comment, i) => (
              <OneComment
                key={comment.id}
                commentText={comment.text}
                AuthorName={comment.author.name}
                createdAt={comment.createdAt}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

interface OneCommentProps {
  commentText: string;
  AuthorName: string;
  createdAt: string;
}

const OneComment = ({
  commentText,
  AuthorName,
  createdAt,
}: OneCommentProps) => {
  return (
    <div className={styles.comment__content__container}>
      <p className={styles.comment}>
        {commentText}
        <span className={styles.comment__owner__name}>{AuthorName}</span>
        <span className={styles.comment__owner__createdat}>
          {moment(createdAt).fromNow()}
        </span>
      </p>
    </div>
  );
};

export default Posts;

// return (
//   <div className={styles.comment__container}>
//     <div className={styles.comment__post__container}>
//       <div className={styles.comment__input__bar}>
//         <input
//           className={styles.comment__input}
//           type="text"
//           name="comment"
//           id="comment"
//           value={commentState}
//           onChange={(e) => setCommentState(e.target.value)}
//           placeholder="Enter comment here..."
//         />
//       </div>
//       <button
//         onClick={() => PostAComment()}
//         className={styles.comment__post__button}
//       >
//         Send
//       </button>
//     </div>
//     <div className={styles.comment__display__div}>
//       <OneComment />
//       <OneComment />
//     </div>
//   </div>
// );
