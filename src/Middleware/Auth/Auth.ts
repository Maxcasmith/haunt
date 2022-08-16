import { authList, userPermissions } from "./AuthList";
import { User } from "../../Entities/User";

export function Auth() {
    return function (target: Object, key: string, descriptor: PropertyDescriptor) {
        const child = descriptor.value;

        descriptor.value = async function(...args:any[]) {
            const req:any = args[0];
            const command:string = `${target.constructor.name}.${key}`;

            let accessRole:number = 0;

            Object.entries(authList).forEach((role) => {
                if (role[1].includes(command))
                    accessRole = userPermissions[role[0]];
            });

            //TODO Design how user's are to be pulled
            //const user:User = await (new User({ id: req.headers.id })).blueprintSearch();

            const canAccess = 15 & accessRole;

            if (!canAccess) throw Error("Unauthorized");

            return child.apply(this, args);
        }
        
        return descriptor;
    }
}
