import {Query} from "../Entities/Query";
import {Vote} from "../Entities/Vote";

export async function VoteCommand(
    {voter, user, location, vote}: {voter:number, user?:number, location?:number, vote:number}
): Promise<void> {
    try {
        const query:Query = new Query();
        query
            .onTable('votes')
            .where({column: "voter_id", value: voter});

        if (user) query.where({column: "user_id", value: user, and: true})
        if (location) query.where({column: "location_id", value: location, and: true});

        const collection:Array<Vote> = (await query.get()).map((v:any) => new Vote({
            id: v.id,
            voter: v.voter_id,
            location: v.location_id,
            vote: v.vote
        }));

        if (collection.length > 0) {
            const v:Vote = collection[0];
            if (v.getVote() != vote) {
                v.setVote(vote);
                await v.update();
            }
        }
        else {
            const blueprints:Vote = new Vote({voter, user, location, vote});
            await blueprints.create();
        }
    } catch (err) {
        throw Error("Could not set vote");
    } 
}
