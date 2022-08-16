import { ValidatorRule, ValidationFunctionOptions } from "donut-validatior";

function number({data}:ValidationFunctionOptions) {
    return !isNaN(data);
}

function file(options:ValidationFunctionOptions) {
    return true;
}

function lowest({data, prop}:ValidationFunctionOptions) {
    return Number(data) >= Number(prop);
}

function highest({data, prop}:ValidationFunctionOptions) {
    return Number(data) <= Number(prop);
}

function maxSize({data, prop}:ValidationFunctionOptions) {
    const sizeMap:any = {
        "KB": 1000,
        "MB": 100000,
        "B": 1,
    }

    let current:string = "";

    Object.keys(sizeMap).forEach(s => {
        if (prop.includes(s)) {
            current = s;
            prop = prop.slice(0, -current.length);
        }
    });

    const size:number = data.size / sizeMap[current];

    return size <= prop;
}

function unique(options:ValidationFunctionOptions) {
    return true;
}

export const rules:Array<ValidatorRule> = [
    { name: "number", func: number, errorMessage: "{field} is not a number" },
    { name: "file", func: file, errorMessage: "{field} is not a file" },
    { name: "lowest", func: lowest, errorMessage: "lowest value {field} can be is {prop}" },
    { name: "highest", func: highest, errorMessage: "highest value {field} can be is {prop}" },
    { name: "maxSize", func: maxSize, errorMessage: "{field} exceeds maximum allowed size of {prop}" },
    { name: "unique", func: unique, errorMessage: "{field} is not unique" },
];
