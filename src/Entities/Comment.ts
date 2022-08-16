import {iComment} from "../Types/iComment";
import {Column, Entity} from "./Entity";

export class Comment extends Entity
{
    @Column('id') private id:number|undefined;
    @Column('author') private authorId:number|undefined;
    @Column('parent_id') private parent:number|undefined;
    @Column('location') private locId:number|undefined;
    @Column('body') private body:string|undefined;

    constructor(data: iComment)
    {
        super('comments');
        this.id = data.id;
        this.authorId = data.authorId;
        this.locId = data.locId;
        this.body = data.body;
        this.parent = data.parent;
    }
}
