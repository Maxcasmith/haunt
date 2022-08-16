import { get, post, Request } from "donut-router";
import {CreateUserCommand} from "../Boundary/CreateUserCommand";
import {UpdateUserCommand} from "../Boundary/UpdateUserCommand";
import {command} from "../Command";
import { Auth } from "../Middleware/Auth/Auth";
import usersSeedData from "../SeedData/Users";
import {iUser} from "../Types/iUser";
import { Validate } from "../Middleware/Validate/Validate";
import {FindUserCommand} from "../Boundary/FindUserCommand";
import { VoteCommand } from "../Boundary/VoteCommand";

export default class UserController
{
    @command('user:seed')
    async seed()
    {
        console.log("Seeding Users");
        usersSeedData.forEach(async (user:any) => {
            await CreateUserCommand(user.handle, user.email, user.bio, user.auth);
        });
        console.log("Finished Seeding");
    }

    @get('/api/user/:id')
    @Validate({ id: "number|lowest:1" })
    async findById(req:Request) {
        const { id } = req.params;
        const user = await FindUserCommand(id);        

        return user;
    }

    @command('user:make')
    async create(handle:string, email:string, bio:string, auth?:number)
    {
        await CreateUserCommand(handle, email, bio, auth);
        console.log(`User ${handle} created`);
    }

    @post('/api/admin/user/update')
    @Auth()
    @Validate({
        id: "required|number",
        handle: "unique|min:3|max:50",
        email: "unique|email|min:10|max:50",
        auth: "number|lowest:1|highest:15",
        avatar: "file|maxSize:20MB",
        points: "number|lowest:0",
        rank: "number|lowest:1|highest:20"
    })
    async update(req:Request)
    {
        const { body } = req;
        return await UpdateUserCommand(body as iUser); 
    }

    @post('/api/user/vote')
    @Auth()
    @Validate({
        user_id: "required|number|lowest:1",
        vote: "number|lowest:-1|highest:1"
    })
    async vote(req: Request) {
        const { user_id, vote } = req.body;
        await VoteCommand({ voter: 1, user: user_id, vote});
        
        return { success: true, voted: vote };
    }
}
