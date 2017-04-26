import { ICacheObject, ICacheFactoryService } from "angular";

export class CacheService {
    private cache: ICacheObject;
    constructor(CoreConstants: any, $cacheFactory: ICacheFactoryService) {
        this.cache = $cacheFactory(CoreConstants.cacheID);
    }

    public put(alias: string, data: any): void {
        this.cache.put(alias, data);
    }

    public putToObject(objectKey: string, key: string, data: any): void {
        let objectCached = this.cache.get(objectKey);
        if (!objectCached) {
            objectCached = {};
        } 
        objectCached[key] = data;
        this.cache.put(objectKey, objectCached);
    }

    public fetch(key: string): any {
        return this.cache.get(key);
    }

    public remove(key: string): void {
        this.cache.remove(key);
    }

    public clearAll(): void {
        this.cache.destroy();
    }
}