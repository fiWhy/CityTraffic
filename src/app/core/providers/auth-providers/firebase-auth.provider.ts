import { IAuthResponse, IAuthProvider } from "./auth-providers.factory";
import { User } from "../../entities/user";

export interface IFirebaseAuthResponse extends IAuthResponse {
    user: firebase.UserInfo;
}

export class FirebaseAuthProvider implements IAuthProvider {
    static $inject = ["$firebaseObject", "$firebaseAuth"];
    public currentUser: User;
    public status: boolean = false;
    private auth: any;
    constructor(private $firebaseObject, private $firebaseAuth) {
        this.auth = this.$firebaseAuth();
        this.registerListeners();
    }

    connect($scope: ng.IScope): Promise<boolean> {
        const ref = firebase.database().ref().child("data");
        const syncObject = this.$firebaseObject(ref);
        syncObject.$bindTo($scope, "data");
        return Promise.resolve(true);
    }

    authenticate(): Promise<User> {
        const authProvider = new firebase.auth.GoogleAuthProvider();
        return this.auth.$signInWithPopup(authProvider)
            .then((result: IFirebaseAuthResponse) => {
                if (result.credential) {
                    return this.prepareUser(result.user);
                } else {
                    throw result;
                }
            });
    }

    signOut(): Promise<any> {
        return this.auth.$signOut();
    }

    getUser(): User {
        return this.currentUser;
    }

    getStatus() {
        return this.status;
    }


    private registerListeners() {
        this.auth.$onAuthStateChanged((firebaseUser) => {
            if (firebaseUser) {
                this.currentUser = this.prepareUser(firebaseUser);
                this.status = true;
            } else {
                this.currentUser = null;
                this.status = false;
            }
        });
    }

    private prepareUser(user: firebase.UserInfo): User {
        if (!user) {
            return undefined;
        } else {
            return new User({
                username: user.displayName,
                email: user.email,
                id: user.uid,
                image: user.photoURL
            });
        }
    }
}