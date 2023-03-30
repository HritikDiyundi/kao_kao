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

interface userDoc{
  name:string,
  email:string,
  imageUrl:string,
  followers:string[],
  following:string[]
}


interface subUsers {
  _id: string;
  name: string;
  email: string;
  imageUrl: string;
  followers: string[];
}

interface subUsersArray {
  _id: string;
  name: string;
  email: string;
  imageUrl: string;
  following: subUsers[];
  followers: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface completeFollowings {
  data: subUsersArray;
  message: string;
}

interface ResponseData {
  data: User | null;
  message: string;
}

interface threeUser {
  oldUsers: User[];
  popularUsers: User[];
  suggestedUsers: User[];
}

interface longResponse {
  data: threeUser;
  message: string;
}

interface UserContextType {
  user: User | null;
  setUser?: (user: User | null) => void;
}
