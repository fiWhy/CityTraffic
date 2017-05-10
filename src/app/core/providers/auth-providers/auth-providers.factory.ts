import { User } from "../../entities/user";

export interface IAuthResponse {
    credential: any;
    user: any;
}

export interface IAuthProvider {
    currentUser: User;
    status: boolean;
    getStatus(): boolean;
    getUser(): User;
    connect(data: any): Promise<boolean>;
    authenticate(data?: any): Promise<User>;
    signOut(): Promise<any>;
}

export class AuthProvidersFactory {
    static $inject = ["$injector", "CoreConstants"];
    constructor($injector: any, CoreConstants) {
        return $injector.get(CoreConstants.AUTH.PROVIDER.name);
    }
}