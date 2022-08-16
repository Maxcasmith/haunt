import {Album} from "../Entities/Album";
import {Query} from "../Entities/Query";

export async function FindAlbumCommand({ albumId, locationId, userId }: {albumId?:number, locationId?:number, userId?:number}): Promise<Album|null> {
    const query:Query = new Query();
    query.onTable('albums')

    if (albumId) query.where({ column: "id", value: albumId });
    if (locationId) query.where({ column: "location", value: locationId });
    if (userId) query.where({ column: "author", value: userId });

    const data:Array<Album> = await query.get();

    return data[0] || null;
}
