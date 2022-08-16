import { get, post, Request } from "donut-router";
import {CreateLocationCommand} from "../Boundary/CreateLocationCommand";
import {SearchLocationCommand} from "../Boundary/SearchLocationCommand";
import { FindLocationCommand } from "../Boundary/FindLocationCommand";
import { Auth } from "../Middleware/Auth/Auth";
import {Validate} from "../Middleware/Validate/Validate";
import { Coords } from "../Types/Coords";
import {iLocation} from "../Types/iLocation";
import {command} from "../Command";
import locationSeedData from "../SeedData/Locations";
import {VoteCommand} from "../Boundary/VoteCommand";
import {GeocodeCommand} from "../Boundary/GeocodeCommnad";

export default class LocationController
{
    @command('location:seed')
    async seed() {
        console.log("Seeding Locations");
        locationSeedData.forEach(async (location:any) => {
            await CreateLocationCommand(
                location.authorId,
                location.name,
                location.desc,
                { lat: location.lat, lng: location.lng },
                location.address,
                []
            );
        });
        console.log("Finished Seeding");
    }

    @get('/api/location')
    async list(req: Request) {
    }

    @get('api/location/:id')
    @Validate({ id: "number|lowest:1" })
    async findById(req:Request) {
        const { id } = req.params;

        const location = await FindLocationCommand(id);
        return location;
    }

    @get('/api/location/search')
    @Validate({ 
        term: "min:3",
        lat: "number",
        lng: "number",
        limit: "number|lowest:0|highest:100",
        last: "number",
    })
    async search(req: Request) {
        const { term, limit, last, verified } = req.query;

        const collection:Array<iLocation> = await SearchLocationCommand({term, limit, last, verified});
        return collection;
    }

    @post('/api/location/create')
    @Auth()
    @Validate({
        name: "required|min:5|max:50",
        story: "required|min:25|max:500",
        lat: "required|number",
        lng: "required|number",
        address: "min:20"
    })
    async create(req: Request) {
        const { name, story, lat, lng } = req.body;
        let { address } = req.body;
        const coords:Coords = { lat, lng };

        if (!address) {
            const res = await GeocodeCommand({ geolocation: coords });
            if (res) address = res.formattedAddress;
        }

        const location = await CreateLocationCommand(
            1,
            name,
            story,
            coords,
            address,
            req.files
        );

        return location;
    }

    @post('/api/location/vote')
    @Auth()
    @Validate({
        location_id: "required|number|lowest:1",
        vote: "number|lowest:-1|highest:1"
    })
    async vote(req: Request) {
        const { location_id, vote } = req.body;
        await VoteCommand({ voter: 1, location: location_id, vote});
        
        return { success: true, voted: vote };
    }

    @post('/api/location/geocode')
    @Auth()
    @Validate({
        address: "required|min:20",
    })
    async geocode(req:Request) {
        const { address } = req.body;

        const res = await GeocodeCommand({address});
        return res;
    }
}
