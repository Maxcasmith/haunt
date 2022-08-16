import {iLocation} from "../Types/iLocation";
import { Location } from "../Entities/Location";

export async function FindLocationCommand(id:number): Promise<Location> {
    const blueprints:Location = new Location({ id });
    const location:Location = await blueprints.blueprintSearch();
    await location.withImages();
    return location;
}
