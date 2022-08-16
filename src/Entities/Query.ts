import { QueryObject } from "./Entity";
import mysql, { Pool } from "mysql";
import {BlueprintSearchOptions} from "../Types/BlueprintSearchOptions";

const connection:Pool = mysql.createPool({
    connectionLimit: 10,
    database: "haunt",
    user: "max",
    password: ""
});

export class Query
{
    private table:string = "";
    private queryString:string = "";
    private queryData:any = [];

    private queryLoader:Array<{
        set:string,
        column?:string,
        operator?:string,
        value?:any,
        fields?:Array<string>
    }> = [];

    rawQueryString(queryString:string, queryData:any = null):this {
        this.queryString = queryString;
        this.queryData = queryData;
        return this;
    }

    onTable(table:string):this {
        this.table = table;
        return this;
    }

    where(
        { column, operator, value, or, and }: 
            {column:string, operator?:string, value:any, or?:boolean, and?:boolean}
    ):this {
        let set:string = "WHERE";
        if (and) set = "AND";
        if (or) set = "OR";
        this.queryLoader.push({ set, column, operator, value })
        return this;
    }

    limit(limit:number): this {
        this.queryLoader.push({set: "LIMIT", value: limit});
        return this;
    }

    buildQuery() {
        this.queryLoader.forEach(item => {
            switch (item.set) {
                case "SELECT":
                    this.queryString += `SELECT ${[...item.fields || "*"]} FROM ${this.table} `;
                    break;
                case "WHERE":
                case "AND":
                case "OR":
                    this.queryString += `${item.set} ${item.column} ${item.operator || '='} ? `;
                    this.queryData.push(item.value);
                    break;
                case "LIMIT":
                    this.queryString += `LIMIT ? `;
                    this.queryData.push(item.value);
                    break;
            }
        });
        this.queryString = this.queryString.replace(/.$/,";");
    }

    async get(fields?:Array<string>) {
        this.queryLoader.unshift({ set: "SELECT", fields })

        return this.submitQuery();
    }

    async blueprintSearch(payload:QueryObject)
    {
        const { table, data } = payload;

        const query:Query = new Query();
        query.queryData = [];

        query.onTable(table);
        for (let d in data) {
            query.where({
                column: d,
                value: data[d]
            });
        }

        return await query.get();
    }

    async findById(payload:QueryObject)
    {
        const { table, data } = payload;
        
        this.queryString = `SELECT * FROM ${table} WHERE id = ?`;
        this.queryData = data.id;

        return await this.submitQuery();
    }

    async create(payload:QueryObject)
    {
        const { table, data } = payload;

        this.queryString = `INSERT INTO ${table} SET ?`;
        this.queryData = data;

        return await this.submitQuery();
    }

    async update(payload:QueryObject)
    {
        const { table, data } = payload;
        this.queryData = [data, data.id];

        this.queryString = `UPDATE ${table} SET ? WHERE id = ?`;
        return await this.submitQuery();
    }

    async delete(payload:QueryObject)
    {
        const { table, data } = payload;
        this.queryData = data.id;

        this.queryString = `DELETE FROM ${table} WHERE id = ?`;
        return await this.submitQuery();
    }

    submitQuery(verbose:boolean = false): Promise<any>
    {
        if (this.queryLoader.length > 0) this.buildQuery();

        if (verbose) console.log(this.queryString, this.queryData);

        return new Promise((resolve, reject) => {
            const cb = (error:any, results:any, fields:any) => {
                if (error) reject(error);
                resolve(results);
            }

            if (this.queryData) connection.query(this.queryString, this.queryData, cb);
            else connection.query(this.queryString, cb);
        });
    }
}
