export class Comment{ 
    author!: string;
    comment!: string;
    date!: string;
    replies!: Array<Comment>;
}