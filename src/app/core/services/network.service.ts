import { merge } from "angular";

import { CacheService } from './cache.service';
import { AuthService } from "./auth.service";

import { AdditionalOptions } from '../entities/additional-options';


export class NetworkService<T> {
    defaultOptions: any;
    defaultNetworkAdditionalOptions: AdditionalOptions;
    private parseAbleErrors = [401];
    constructor(
        private CoreConstants: any,
        private $http: ng.IHttpService,
        private $q: ng.IQService,
        private CacheService: CacheService,
        private AuthService: AuthService
    ) {
        this.defaultOptions = {};
        this.prepareHeaders();
        this.defaultNetworkAdditionalOptions = new AdditionalOptions({});
    }

    prepareCaching(url: string, options: AdditionalOptions): T {
        return this.CacheService.fetch(options.cacheAlias || url);
    }

    prepareHeaders(): void {
        const existsHeader = this.$http.defaults.headers.common.Authorization;
        if (!existsHeader) {
            return;
        } else {
            this.setToken();
        }
    }

    setToken() {
        const token = this.AuthService.getToken();
        if (token) {
            this.$http.defaults.headers.common.Authorization = `bearer ${this.AuthService.getToken()}`;
        } else {
            return;
        }
    }

    prepareUrl(target: string): string {
        return `${this.CoreConstants.getUrl('API_URL')}${target}`;
    }

    prepareOptions(options: any): any {
        return merge(this.defaultOptions, options);
    }

    get(url: string, options?: any, networkAdditionalOptions?: AdditionalOptions): ng.IHttpPromise<T | T[]> {
        const additional = this.prepareAdditionalOptions(networkAdditionalOptions);
        this.checkAdditionalOptions(additional);
        let force = false;
        if (additional) {
            additional.url = url;
            force = additional.force;
        }
        const requestOptions = this.prepareOptions(options);
        const cachedData = this.prepareCaching(url, additional);
        const requestUrl = this.prepareUrl(url);
        return force || !cachedData ? this.$http.get(requestUrl, requestOptions)
            .then(this.extractData)
            .then((data: T) => this.cacheData(additional.cacheAlias || url, data))
            .catch((err) => this.handleError(err)) : this.$q.resolve(cachedData);



    }

    post(url: string, body: any, options?: any, networkAdditionalOptions?: AdditionalOptions): ng.IHttpPromise<T> {
        const additional = this.prepareAdditionalOptions(networkAdditionalOptions);
        this.checkAdditionalOptions(additional);
        const requestOptions = this.prepareOptions(options);
        return this.$http.post(this.prepareUrl(url), body, requestOptions)
            .then(this.extractData)
            .catch((err) => this.handleError(err));
    }

    put(url: string, body: any, options?: any, networkAdditionalOptions?: AdditionalOptions): ng.IHttpPromise<T> {
        const additional = this.prepareAdditionalOptions(networkAdditionalOptions);
        this.checkAdditionalOptions(additional);
        const requestOptions = this.prepareOptions(options);
        return this.$http.put(this.prepareUrl(url), body, requestOptions)
            .then(this.extractData)
            .catch((err) => this.handleError(err));
    }

    delete(url: string, options?: any, networkAdditionalOptions?: AdditionalOptions): ng.IHttpPromise<any> {
        const additional = this.prepareAdditionalOptions(networkAdditionalOptions);
        this.checkAdditionalOptions(additional);
        const requestOptions = this.prepareOptions(options);
        return this.$http.delete(this.prepareUrl(url), requestOptions)
            .catch((err) => this.handleError(err));
    }

    patch(url: string, body: any, options?: any, networkAdditionalOptions?: AdditionalOptions): ng.IHttpPromise<any> {
        const additional = this.prepareAdditionalOptions(networkAdditionalOptions);
        this.checkAdditionalOptions(additional);
        const requestOptions = this.prepareOptions(options);
        return this.$http.patch(this.prepareUrl(url), body, requestOptions)
            .then(this.extractData)
            .catch((err) => this.handleError(err));
    }

    private prepareAdditionalOptions(networkAdditionalOptions?: AdditionalOptions) {
        return Object.assign(new AdditionalOptions(networkAdditionalOptions || {}));
    }

    private checkAdditionalOptions(networkAdditionalOptions?: AdditionalOptions) { }

    private handleError(err: any) {
        let parsedError;
        if (this.parseAbleErrors.indexOf(err.status) !== -1) {
            parsedError = this.extractData(err);
        } else {
            parsedError = err;
        }
        return Promise.reject(parsedError);
    }

    private extractData(res: any): T {
        const body = JSON.parse(res);
        return body || {};
    }

    private cacheData(cacheAlias: string, res: T) {
        this.CacheService.put(cacheAlias, res);
        return res;
    }
}