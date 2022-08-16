import { Validator, DefaultRules } from "donut-validatior";
import {rules} from "./rules";

export const validator:Validator = new Validator([...DefaultRules, ...rules]);
