type RCommentAuthor = {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
};

type RComment = {
  id: string;
  text: string;
  author: RCommentAuthor;
  likes: string[]; // Assuming an array of user IDs who liked the comment
  createdAt: string;
  updatedAt: string;
};

type RCommentResponse = {
  data: RComment[];
  message: string;
};
