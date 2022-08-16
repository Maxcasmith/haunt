import {AuthRole} from "./AuthRole";

export interface iUser { 
    id?:number,
    handle?:string,
    bio?:string,
    email?:string,
    auth?:AuthRole|number,
    rank?:number,
    points?:number,
    upvotes?:number,
    downvotes?:number,
}
