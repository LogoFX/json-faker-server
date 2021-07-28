export class ServerConfig
{
    public watch: boolean = false;

    public port: number = 3000;
    public host: string = "localhost";
    public routes?: string;
    public middlewares?: string[];
    public quiet: boolean = false;
    public readOnly: boolean = false;
    public noCors: boolean = false;
    public noGzip: boolean = false;
    public static?: string;
    public delay?: number;
    public snapshots: string = ".";
    public id: string = "id";
}