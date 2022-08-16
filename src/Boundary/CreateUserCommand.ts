import {User} from "../Entities/User";
import {AuthRole} from "../Types/AuthRole";
import {iUser} from "../Types/iUser";
import {AddToAlbumCommand} from "./AddToAlbumCommand";
import {StoreFilesCommand} from "./StoreFilesCommand";
import { Album } from "../Entities/Album";

export async function CreateUserCommand(handle:string, email:string, bio:string, auth:AuthRole = AuthRole.USER, media:File[]|null = null): Promise<iUser>
{
    const blueprints:User = new User({handle, email, auth, bio});

    const user:iUser = await blueprints.create();

    const album:Album = await AddToAlbumCommand({
        userId: user.id,
        name: user.handle,
        media: media || []
    })

    return user;
}
