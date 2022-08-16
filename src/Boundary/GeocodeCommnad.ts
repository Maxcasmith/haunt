import NodeGeocoder, { Options, Entry, Geocoder, Location } from 'node-geocoder';
import {Coords} from '../Types/Coords';

const options:Options = {
    provider: "google",
    apiKey: "AIzaSyCNCoJ2H56ODBDC7iIZeaB8rRTF6vsMQno"
}

export async function GeocodeCommand({address, geolocation}: {address?:string, geolocation?:Coords|Location}): Promise<Entry|null> {
    const geo:Geocoder = NodeGeocoder(options);

    if (address) {
        const res:Entry[] = await geo.geocode(address);
        return res.length > 0 ? res[0] : null;
    }
    if (geolocation) {
        const res:Entry[] = await geo.reverse(geolocation as Location);
        return res.length > 0 ? res[0] : null;
    }

    throw Error("Could not geocode");
}
