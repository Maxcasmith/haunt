import { Coords } from "../Types/Coords";
import { Location } from "../Entities/Location";
import { User } from "../Entities/User";
import {Album} from "../Entities/Album";
import {AddToAlbumCommand} from "./AddToAlbumCommand";

export async function CreateLocationCommand(
    user:User|number,
    name:string,
    desc:string,
    coords:Coords,
    address:string,
    media:Array<File>
): Promise<Location>
{
    const userId:number = typeof user == 'number' ? user : user.getId();

    const blueprints:Location = new Location({
        authorId: userId,
        name: name,
        desc: desc,
        address: address,
        lat: coords.lat,
        lng: coords.lng
    });
    
    const loc:Location = await blueprints.create();

    await AddToAlbumCommand({ locationId: loc.getId(), media, name });

    await loc.withImages();

    return loc;
}
