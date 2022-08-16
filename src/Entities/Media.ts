import { Column, Entity } from "./Entity";
import { iMedia } from "../Types/iMedia";
import {MediaType} from "../Types/MediaType";

export class Media extends Entity
{
    @Column('id') private id:number|undefined;
    @Column('author') private userId:number|undefined;
    @Column('url') private url:string|undefined;
    @Column('album') private album:number|undefined;
    @Column('type') private mediaType:MediaType|number|undefined;
    @Column('header_order') private headerOrder:number|undefined;

    constructor({ id, url, album, mediaType, userId, headerOrder }: iMedia)
    {
        super('media');
        this.id = id;
        this.userId = userId;
        this.url = url;
        this.album = album;
        this.mediaType = mediaType;
        this.headerOrder = headerOrder;
    }
}
