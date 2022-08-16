import { iUser } from "../Types/iUser";
import { User } from "../Entities/User";

export async function FindUserCommand(id:number): Promise<User> {
    const blueprints:User = new User({ id });
    const user:User = await blueprints.blueprintSearch();
    await user.withImages();
    return user;
}
