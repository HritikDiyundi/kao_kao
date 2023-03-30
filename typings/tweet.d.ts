interface tweetDoc{
    reference:string;
    author:author;
    likes:string[] | userDoc[];
    retweets:string[] | userDoc[];
    comments:string[] ;
}

interface author{
    _id:string;
    email:string;
    imageUrl:string;
    name:string;
}

interface commentDoc{
    text:string;
    authour:author;
    tweet:string |tweetDoc;
    likes:string | userDoc[];
    createdAt?:Date;
    UpdatedAt?:Date;

}

interface tweetRes{
    tweets:tweetDoc[],
    page:number,
    totalPages:number
}
interface Responsee{
    data:tweetRes,
    message:string
}