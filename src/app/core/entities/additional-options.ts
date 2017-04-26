import { Options } from "./options";

export class AdditionalOptions extends Options {
    public cache = false;
    public cacheAlias = null;
    public local = false;
    public url: string;
    public force = false;
    constructor(options: any) {
        super();
        this.cache = options.cache;
        this.cacheAlias = options.cacheAlias;
        this.local = options.local;
        this.force = options.force;
    }
}
