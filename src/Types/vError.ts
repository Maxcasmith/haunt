export class vError extends Error
{
    private readonly errors:Array<string>;

    constructor(errors:Array<string>)
    {
        super("Validation Failed with errors");
        this.errors = errors;
    }
}
