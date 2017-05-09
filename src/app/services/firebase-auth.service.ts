import { IAuthResponse } from "../core/services/auth.service";

export interface IFirebaseAuthResponse extends IAuthResponse {
    credential: any;
    user: firebase.UserInfo;
}

export class FirebaseAuthService {
    constructor() { }

    handleResponse(result): IFirebaseAuthResponse {
        if (result.credential) {
            return result;
        } else {
            throw result;
        }
    }
}