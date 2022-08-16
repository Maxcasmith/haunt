import {Rank} from "../Entities/Rank";
import {iRank} from "../Types/iRank";

export async function CreateRankCommand(rank:iRank): Promise<Rank> {
    const blueprints:Rank = new Rank(rank);
    return await blueprints.create();
}
