import {Disk} from "../Types/Disk";

export async function StoreFilesCommand(files:File|Array<File>, disk:Disk = Disk.LOCAL): Promise<Array<string>|string>
{
    files = [files].flat();
    const paths: Array<string> = [];

    files.forEach(file => {
    });

    return paths.length == 1 ? paths[0] : paths;
}
