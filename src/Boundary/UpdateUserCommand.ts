import {User} from "../Entities/User";
import {iUser} from "../Types/iUser";

export async function UpdateUserCommand(data: iUser): Promise<iUser>
{
    const user:User = new User(data);
    return await user.update();
}
