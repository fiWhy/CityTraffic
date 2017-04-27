import { merge } from "angular";

import { CacheService } from "./cache.service";
import { AuthService } from "./auth.service";

import { AdditionalOptions } from "../entities/additional-options";


export class NetworkService<T> {
    private defaultOptions: any;
    private defaultNetworkAdditionalOptions: AdditionalOptions;
    private parseAbleErrors = [400, 401];
    constructor(
        private CoreConstants: any,
        private $http: ng.IHttpService,
        private $q: ng.IQService,
        private CacheService: CacheService,
        private AuthService: AuthService
    ) {
        this.defaultOptions = {};
        this.defaultNetworkAdditionalOptions = new AdditionalOptions({});
    }

    get(url: string, options?: any, networkAdditionalOptions?: AdditionalOptions): ng.IHttpPromise<T | T[]> {
        const additional = this.prepareAdditionalOptions(networkAdditionalOptions);
        let force = additional && additional.force;
        const requestOptions = this.prepareOptions(options);
        const cachedData = this.prepareCaching(url, additional);
        const requestUrl = this.prepareUrl(url);
        if (force || !cachedData) {
            return this.$http.get(requestUrl, requestOptions)
                .then(this.extractData)
                .then((data: T) => this.cacheData(additional.cacheAlias || url, data))
                .catch((err) => this.handleError(err));
        } else {
            return this.$q.resolve(cachedData)
        }
    }

    post(url: string, body: any, options?: any, networkAdditionalOptions?: AdditionalOptions): ng.IHttpPromise<T> {
        const additional = this.prepareAdditionalOptions(networkAdditionalOptions);
        const requestOptions = this.prepareOptions(options);
        const requestUrl = this.prepareUrl(url);
        return this.$http.post(requestUrl, body, requestOptions)
            .then(this.extractData)
            .catch((err) => this.handleError(err));
    }

    put(url: string, body: any, options?: any, networkAdditionalOptions?: AdditionalOptions): ng.IHttpPromise<T> {
        const additional = this.prepareAdditionalOptions(networkAdditionalOptions);
        const requestOptions = this.prepareOptions(options);
        const requestUrl = this.prepareUrl(url);
        return this.$http.put(requestUrl, body, requestOptions)
            .then(this.extractData)
            .catch((err) => this.handleError(err));
    }

    delete(url: string, options?: any, networkAdditionalOptions?: AdditionalOptions): ng.IHttpPromise<any> {
        const additional = this.prepareAdditionalOptions(networkAdditionalOptions);
        const requestOptions = this.prepareOptions(options);
        const requestUrl = this.prepareUrl(url);
        return this.$http.delete(requestUrl, requestOptions)
            .then(this.extractData)
            .catch((err) => this.handleError(err));
    }

    patch(url: string, body: any, options?: any, networkAdditionalOptions?: AdditionalOptions): ng.IHttpPromise<any> {
        const additional = this.prepareAdditionalOptions(networkAdditionalOptions);
        const requestOptions = this.prepareOptions(options);
        const requestUrl = this.prepareUrl(url);
        return this.$http.patch(requestUrl, body, requestOptions)
            .then(this.extractData)
            .catch((err) => this.handleError(err));
    }

    private prepareCaching(url: string, additional: AdditionalOptions): T {
        return this.CacheService.fetch(additional.cacheAlias || url);
    }

    private prepareUrl(target: string): string {
        return `${this.CoreConstants.API_URL}${target}`;
    }

    private prepareOptions(options: any): any {
        return merge(this.defaultOptions, options);
    }

    private prepareAdditionalOptions(networkAdditionalOptions?: AdditionalOptions) {
        return Object.assign(new AdditionalOptions(networkAdditionalOptions || {}));
    }

    private handleError(err: any) {
        let parsedError;
        if (this.parseAbleErrors.indexOf(err.status) !== -1) {
            parsedError = this.extractData(err);
        } else {
            parsedError = err;
        }

        return parsedError;
    }

    private extractData(res: any): T {
        return res.data;
    }

    private cacheData(cacheAlias: string, res: T) {
        this.CacheService.put(cacheAlias, res);
        return res;
    }
}