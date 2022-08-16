export const commands:any[] = [];

export function command(name:string) {
    return function (target: Object, key: string | symbol, descriptor: PropertyDescriptor) {
        commands.unshift({ name, callback: descriptor.value });
    }
}
