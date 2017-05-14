import { IRequestProvider } from "./request-providers.factory";

export class FirebaseRequestProvider<T> implements IRequestProvider<T> {
    get(url: string): Promise<T | T[]> {
        return new Promise(() => { });
    }
    post(url: string, data: any): Promise<T | T[]> {
        return new Promise(() => { });
    }
    patch(url: string, data: any): Promise<T | T[]> {
        return new Promise(() => { });
    }
    put(url: string, data: any): Promise<T | T[]> {
        return new Promise(() => { });
    }
    delete(url: string): Promise<T | T[]> {
        return new Promise(() => { });
    }
}