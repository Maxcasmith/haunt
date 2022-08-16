import {CreateRankCommand} from "../Boundary/CreateRankCommand";
import {command} from "../Command";
import ranksSeedData from "../SeedData/Ranks";

export default class RanksController
{
    @command('rank:seed')
    async seed()
    {
        console.log("Seeding Ranks");
        ranksSeedData.forEach(async rank => {
            await CreateRankCommand(rank); 
        })
        console.log("Ranks seeded");
    }
}
