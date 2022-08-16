import { validator } from "./Validator";
import { vError } from "../../Types/vError";

export function Validate(ruleList:any) {
    return function (target: Object, key: string, descriptor: PropertyDescriptor) {
        const child = descriptor.value;

        descriptor.value = async function(...args:any[]) {
            const {query, body, params, files} = args[0];

            const errors: Array<string> = [];

            Object.keys(ruleList).forEach(async rule => {
                const validationValue:any = params[rule] || query[rule] || body[rule] || (files && files[rule]);

                if (validationValue == undefined && ruleList[rule].includes("required")) errors.push(`${rule} is required`); 
                if (validationValue) {
                    await validator.validate(validationValue, ruleList[rule], {
                        field: rule,
                        onError: (msg) => { errors.push(msg); } 
                    });
                }
            });

            if (errors.length > 0) throw new vError(errors); 

            return child.apply(this, args);
        }
        
        return descriptor;
    }
}
