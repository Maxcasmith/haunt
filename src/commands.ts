import {controllers} from "./Application";
import {commands} from "./Command";
import { bootstrap } from "./config";

bootstrap;
controllers;

const args = process.argv.slice(2);
const command = commands.find(cmd => cmd.name == args[0]);

if (command) {
    command.callback(...args.slice(1));
}
