interface tweetDoc {
  _id?: string;
  reference: string;
  author: author;
  likes: string[];
  retweets: string[] | userDoc[];
  comments: string[];
}

interface author {
  _id: string;
  email: string;
  imageUrl: string;
  name: string;
}

interface commentDoc {
  text: string;
  authour: author;
  tweet: string | tweetDoc;
  likes: string | userDoc[];
  createdAt?: Date;
  UpdatedAt?: Date;
}

interface tweetRes {
  tweets: tweetDoc[];
  page: number;
  totalPages: number;
}
interface Responsee {
  data: tweetRes;
  message: string;
}

interface likeTweet {
  data: null;
  message: string;
}
