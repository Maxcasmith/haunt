import { get, post, Request } from "donut-router";

export default class TestFunctions 
{
    @get('*')
    async renderIndex(req:Request)
    {
        return {type: "html", page: "index.html"};
    }
}
