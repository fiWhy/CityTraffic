import { User } from "../../entities/user";

export interface IAuthResponse {
    credential: any;
    user: any;
}

export interface IRequestProvider<T> {
    get(url: string, additional?: any): Promise<T | T[]>;
    post(url: string, data: any, additional?: any): Promise<T | T[]>;
    patch(url: string, data: any, additional?: any): Promise<T | T[]>;
    put(url: string, data: any, additional?: any): Promise<T | T[]>;
    delete(url: string, additional?: any): Promise<void>;
}

export class RequestProvidersFactory {
    static $inject = ["$injector", "CoreConstants"];
    constructor($injector: any, CoreConstants) {
        return $injector.get(CoreConstants.REQUEST.PROVIDER.name);
    }
}