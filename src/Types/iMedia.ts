import {MediaType} from "./MediaType";

export interface iMedia { 
    id?:number,
    userId?:number,
    album?:number,
    mediaType?:MediaType|number,
    url?:string,
    headerOrder?:number
}
