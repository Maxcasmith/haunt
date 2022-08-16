import {Album} from "../Entities/Album";
import {Media} from "../Entities/Media";
import {FindAlbumCommand} from "./FindAlbumCommand";
import {StoreFilesCommand} from "./StoreFilesCommand";
import { MediaType } from "../Types/MediaType";

export async function AddToAlbumCommand(
    { albumId, locationId, userId, media, name }: 
        {albumId?:number, locationId?:number, userId?:number, name?:string, media:Array<File>|File}
): Promise<Album> {
    let album:Album;
    album = await FindAlbumCommand({ albumId, locationId, userId }) as Album;
    
    if (!album) {
        const blueprints:Album = new Album({ user_id:userId, location_id: locationId, name});
        album = await blueprints.create() as Album; 
    }

    [await StoreFilesCommand(media)].flat().forEach(async (path:string) => {
        const blueprints:Media = new Media({
            url: path,
            album: album.getId(),
            mediaType: MediaType.PICTURE,
            userId: 1
        });

        const m:Media = await blueprints.create();
    });
    
    return await album.withMedia();
}
