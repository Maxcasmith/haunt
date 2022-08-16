import {iRank} from "../Types/iRank";
import {Column, Entity} from "./Entity";

export class Rank extends Entity
{
    @Column('id') private id:number|undefined;
    @Column('title') private title:string|undefined;
    @Column('points' )private points:number|undefined;

    constructor(data: iRank)
    {
        super('ranks');
        this.id = data.id;
        this.title = data.title;
        this.points = data.points;
    }
}
