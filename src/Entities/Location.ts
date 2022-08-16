import { Column, Entity } from "./Entity";
import { Comment } from "./Comment";
import { User } from "./User";
import {iLocation} from "../Types/iLocation";
import {Album} from "./Album";

export class Location extends Entity
{
    @Column('id') private id:number|undefined;
    @Column('author') private authorId:number|undefined;
    @Column('name') private name:string|undefined;
    @Column('description') private desc:string|undefined;
    @Column('address') private address:string|undefined;
    @Column('lat') private lat:number|undefined;
    @Column('lng') private lng:number|undefined;
    @Column('verified') private verified:boolean|undefined;
    @Column('upvotes') private upvotes:number|undefined;
    @Column('downvotes') private downvotes:number|undefined;

    private images:Album|undefined;
    private comments:Comment[]|Comment = [];
    private author:User|undefined;

    constructor(data: iLocation)
    {
        super('locations');
        this.id = data.id;
        this.name = data.name;
        this.desc = data.desc;
        this.address = data.address;
        this.lat = data.lat;
        this.lng = data.lng;
        this.authorId = data.authorId;
        this.verified = data.verified;
        this.upvotes = data.upvotes;
        this.downvotes = data.downvotes;
    }

    getId(): number
    {
        return this.id as number;
    }

    async getAuthor()
    {
        return 1;
    }

    async withImages(): Promise<this>
    {
        const blueprints:Album = new Album({location_id: this.id});
        const album:Album = await blueprints.blueprintSearch();
        await album.withMedia();
        if (album) this.images = album;
        return this;
    }
}
