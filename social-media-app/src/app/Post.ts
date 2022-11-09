import { Comment } from "./Comment";

export class Post {
    _id!: string;
    postDate!: string; 
    featuredImage!: string;
    caption!: string;
    postedBy!: string;
    comments!: Array<Comment>; 
    likes!: number;
}