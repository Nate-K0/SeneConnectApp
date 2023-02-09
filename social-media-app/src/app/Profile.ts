export class Profile {
    _id!: string;
    userName!: string;
    profilePic!: string;
    bio!: string;
    followers!: number;
    followedBy!: Array<string>;
    following!: Array<string>;
}