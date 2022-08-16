import {BlueprintSearchOptions} from "../Types/BlueprintSearchOptions";

let iQuery:any|undefined;

export function Column(columnName:string): any {
    return function (target: Object, key: string | symbol) {
        target.constructor.prototype[`db:column:${columnName}`] = key;
    }
}

export function setQueryInterface(queryInterface:any) {
    iQuery = queryInterface;
}

function throwMethodNotFoundException(method:string) {
    throw { status: 500, body: { success: false, message: `No ${method} method found on query interface` } }
}

export interface QueryObject {
    table: string;
    data: any;
}

export class Entity 
{
    constructor(tableName:string)
    {
        this.constructor.prototype['db:table'] = tableName;
    }

    private convertToDBDTO() {    
        const metadata = this.constructor.prototype;
        const keys = Object.keys(metadata).filter(datum => datum.includes("db:column"));

        const data:any = {};

        keys.forEach(key => {
            if (
                (this as any)[metadata[key]] != null &&
                (this as any)[metadata[key]] != undefined
            ) data[key.split(":")[2]] = (this as any)[metadata[key]]
        });
        
        return { table: this.constructor.prototype['db:table'], data };
    }

    private convertToEntityDTO(data:any) {
        data = [data].flat();
        const metadata = this.constructor.prototype;
        const keys = Object.keys(metadata).filter(datum => datum.includes("db:column"));
        
        const constructable = this.constructor as { new(T: any): Entity }

        const res = data.map((e:any) => {
            const data:any = {};
            keys.forEach(key => data[metadata[key]] = e[key.split(':')[2]]);
            return new constructable(data);
        });

        return res;
    }

    async blueprintSearch() {
        if (iQuery.blueprintSearch) {
            const data:QueryObject = this.convertToDBDTO();
            const response = await iQuery.blueprintSearch(data);
            const res = this.convertToEntityDTO(response);

            if (res.length == 1) return res[0];
            return res;
        } else {
            throwMethodNotFoundException("blueprintSearch");
        }
    }

    async findById() {
        if (iQuery.findById) {
            const data:QueryObject = this.convertToDBDTO();
            const response = await iQuery.findById(data);
            const res = this.convertToEntityDTO(response);

            if (res.length == 1) return res[0];
            return res;
        } else {
            throwMethodNotFoundException("findById");
        }
    }

    async create() { 
        if (iQuery.create) {
            const payload:QueryObject = this.convertToDBDTO();
            const response = await iQuery.create(payload);
            payload.data.id = response.insertId;
            const res = this.convertToEntityDTO(payload.data);

            return res[0];
        } else {
            throwMethodNotFoundException("create");
        }
    }

    async update() { 
        if (iQuery.update) {
            const payload:QueryObject = this.convertToDBDTO();
            const response = await iQuery.update(payload);
            const res = this.convertToEntityDTO(response);

            return res[0];
        } else {
            throwMethodNotFoundException("update")
        }
    }

    async delete() {
        if (iQuery.delete) {
            const payload:QueryObject = this.convertToDBDTO();
            const response = await iQuery.delete(payload);

            return { status: 200, message: `Deleted ${this.constructor.name}` };
        } else {
            throwMethodNotFoundException("delete")
        }
    }
}
