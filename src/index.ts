import Koa from "koa";
import send from "koa-send";
import serve from "koa-static";
import koaBody from "koa-body";
import cors from "@koa/cors";
import { resolve } from "path";
import { Router, routes } from "donut-router";
import { controllers } from "./Application";
import { bootstrap } from "./config";

bootstrap;
controllers;

const app:Koa = new Koa();
const port:number = 3000;
const router = new Router(routes);
const root:string = resolve(__dirname, "../client/"); 

app.use(cors());
app.use(serve(root));
app.use(koaBody({ multipart: true }));
app.use(async (ctx, next) => {
    try {
        const res:any = await router.direct({ 
            path: ctx.path, 
            method: ctx.method,
            query: ctx.query,
            body: ctx.request.body,
            headers: ctx.headers,
            files: ctx.request.files,
        });
  
        if (res.type == 'html') await send(ctx, res.body.page, { root });
        else {
            ctx.status = res.status;
            ctx.body = res.body;
        }
    } catch (err:any) {
        ctx.status = 500;
        ctx.body = {
            errors: err.errors || [err.message],
            stack: err.stack
        };
    }
});

app.listen(port);

