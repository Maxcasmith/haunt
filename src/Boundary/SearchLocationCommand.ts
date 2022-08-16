import {Location} from "../Entities/Location";
import {iLocation} from "../Types/iLocation";
import { Query } from "../Entities/Query";

export async function SearchLocationCommand({ term, limit, last, verified }:any): Promise<Array<iLocation>> {
    limit = Number(limit) || 20;
    verified = verified == "true";

    const query:Query = new Query();
    query
        .onTable('locations')
        .where({
            column: "name",
            operator: "LIKE",
            value: `%${term}%`
        });

    if (verified) query.where({
        column: "verified",
        value: true,
        and: true
    });

    query.limit(limit);

    const collection:Array<iLocation> = await query.get();

    return collection;
}
