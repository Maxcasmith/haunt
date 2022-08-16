import {iUser} from "../Types/iUser";
import {Album} from "./Album";
import {Column, Entity} from "./Entity";

export class User extends Entity
{
    @Column('id') private id:number|undefined;
    @Column('handle') private handle:string|undefined;
    @Column('email') private email:string|undefined;
    @Column('auth') private auth:number|undefined;
    @Column('rank') private rank:number|undefined;
    @Column('points') private points:number|undefined;
    @Column('bio') private bio:string|undefined;
    @Column('upvotes') private upvotes:number|undefined;
    @Column('downvotes') private downvotes:number|undefined;

    private images:Album|undefined;

    constructor({ id, handle, email, auth, rank, points, bio, upvotes, downvotes }: iUser)
    {
        super('users');
        this.id = id;
        this.handle = handle;
        this.email = email;
        this.auth = auth;
        this.rank = rank;
        this.points = points;
        this.bio = bio;
        this.upvotes = upvotes;
        this.downvotes = downvotes;
    }

    getId(): number
    {
        return this.id as number;
    }

    async withImages(): Promise<this>
    {
        const blueprints:Album = new Album({user_id: this.id});
        const album:Album = await blueprints.blueprintSearch();
        await album.withMedia();
        if (album) this.images = album;
        return this;
    }
}
