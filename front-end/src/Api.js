import {Request} from "./Request";

class Api
{
    constructor(host = '')
    {
        this.host = host;
    }

    async findUserById(id)
    {
        const req = new Request();
        req
            .GET()
            .setEndpoint(`${this.host}/user/${id}`);

        const { data } = await req.send();

        if (data.length == 0) throw Error("No Explorer with id: " + id)
        
        return data;
    }

    async searchLocations(payload)
    {
        const req = new Request();
        req
            .GET()
            .setEndpoint(`${this.host}/location/search`)
            .setQueries(payload);

        const { data } = await req.send();
        return data;
    }

    async findLocationById(id)
    {
        const req = new Request();
        req
            .GET()
            .setEndpoint(`${this.host}/location/${id}`);

        const { data } = await req.send();
        
        if (data.length == 0) throw Error("No Location with id: " + id)
        
        return data;
    }

    async createLocation({ name, address, story, images, coords })
    {
        const fd = new FormData();

        fd.append("name", name);
        if (address != "") fd.append("address", address);
        fd.append("story", story);

        images.forEach((image, index) => {
            fd.append(`image_${index}`, image, image.filename);
        });

        fd.append("lat", coords.lat);
        fd.append("lng", coords.lng);

        const req = new Request();
        req
            .POST()
            .setEndpoint(`${this.host}/location/create`)
            .setBody(fd);

        const data = await req.send();
    }

    async voteLocation(id, vote)
    {
        const req = new Request();
        req
            .POST()
            .setEndpoint(`${this.host}/location/vote`)
            .setBody({
                location_id: id,
                vote
            });

        const { data } = await req.send();

        return data;
    }

    async voteUser(id, vote)
    {
        const req = new Request();
        req
            .POST()
            .setEndpoint(`${this.host}/user/vote`)
            .setBody({
                user_id: id,
                vote
            });

        const { data } = await req.send();

        return data;
    }

    async getCoordsByAddress(address)
    {
        const req = new Request();
        req
            .POST()
            .setEndpoint(`${this.host}/location/geocode`)
            .setBody({ address });

        const { data } = await req.send();

        return data;
    }
    
}

const home = "192.168.0.108";
const ryans = "192.168.0.62";
const api = new Api(`http://${home}:3000/api`);

export const findUserById = async (id) => await api.findUserById(id);
export const createLocation = async (payload) => await api.createLocation(payload);
export const findLocationById = async (id) => await api.findLocationById(id);
export const searchLocations = async (payload) => await api.searchLocations(payload);
export const voteLocation = async (id, vote) => await api.voteLocation(id, vote);
export const voteUser = async (id, vote) => await api.voteUser(id, vote);
export const getCoordsByAddress = async (address) => await api.getCoordsByAddress(address);
