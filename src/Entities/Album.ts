import {iAlbum} from "../Types/iAlbum";
import {Column, Entity} from "./Entity";
import {Media} from "./Media";

export class Album extends Entity
{
    @Column('id') private id:number|undefined;
    @Column('author') private user_id:number|undefined;
    @Column('location') private location_id:number|undefined;
    @Column('name') private name:string|undefined;

    private media:Array<Media> = [];

    constructor({ id, user_id, location_id, name }:iAlbum)
    {
        super('albums');
        this.id = id;
        this.user_id = user_id;
        this.location_id = location_id;
        this.name = name;
    }

    getId():number {
        return this.id as number;
    }

    async withMedia():Promise<this> {
        /*const blueprints:Media = new Media({album: this.id});
        this.media = await blueprints.blueprintSearch();
        */
        this.media = [
            new Media({mediaType: 0, url: "https://unsplash.it/400"}),
            new Media({mediaType: 0, url: "https://unsplash.it/400?image=222"}),
            new Media({mediaType: 0, url: "https://unsplash.it/400?image=12"}),
        ];
        return this;
    }
}
