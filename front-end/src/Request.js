import axios from "axios";

export class Request
{ 
    constructor() 
    {
        this.type = "";
        this.endpoint = "";
        this.query = "";
        this.body = null;
    }

    GET() {
        this.type = "GET";
        return this;
    }

    POST() {
        this.type = "POST";
        return this;
    }

    setEndpoint(endpoint) {
        this.endpoint = endpoint;
        return this;
    }

    setQueries(data = {}) {
        this.query = "?";
        Object.keys(data).forEach(datum => {
            this.query += `${datum}=${data[datum]}&`;
        });
        this.query = this.query.slice(0, -1);

        return this;
    }

    setBody(body) {
        this.body = body;
        return this;
    }

    async send() {
        if (this.type == "GET") {
            return await axios.get(`${this.endpoint}${this.query}`);
        }
        if (this.type == "POST") {
            return await axios.post(`${this.endpoint}${this.query}`, this.body);
        }
    }
    
}
