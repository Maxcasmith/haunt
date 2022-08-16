import {Column, Entity} from "./Entity";
import { iVote } from "../Types/iVote";

export class Vote extends Entity
{
    @Column('id') private id:number|undefined;
    @Column('voter_id') private voter:number|undefined;
    @Column('user_id') private user:number|undefined;
    @Column('location_id') private location:number|undefined;
    @Column('vote') private vote:number|undefined;

    constructor({id, voter, user, location, vote}: iVote)
    {
        super('votes');
        this.id = id;
        this.voter = voter;
        this.user = user;
        this.location = location;
        this.vote = vote;
    }

    getVote(): number|undefined {
        return this.vote;
    }

    setVote(vote:number): this {
        this.vote = vote;
        return this;
    }
}
