import { IAuthResponse, IAuthProvider } from "./auth-providers.factory";
import { User } from "../../entities/user";
import { FirebaseRequestProvider } from "../request-providers/firebase-request.provider";

export interface IFirebaseAuthResponse extends IAuthResponse {
    user: firebase.UserInfo;
}

export class FirebaseAuthProvider implements IAuthProvider {
    static $inject = ["$firebaseObject", "$firebaseArray", "$firebaseAuth", "FirebaseRequestProvider", "$rootScope"];
    public currentUser: User;
    public status: boolean = false;
    private auth: any;
    private firebaseRef: any;
    private firebaseUserArrayRef: any;
    constructor(private $firebaseObject,
        private $firebaseArray,
        private $firebaseAuth,
        private FirebaseRequestProvider: FirebaseRequestProvider<User>,
        private $rootScope: ng.IRootScopeService) {
        this.auth = this.$firebaseAuth();
        this.registerListeners();
        this.firebaseRef = this.prepareFirebaseRef();
        this.firebaseUserArrayRef = this.$firebaseArray(this.firebaseRef.child("users"));
    }

    connect($scope: ng.IScope): Promise<boolean> {
        const ref = this.firebaseRef;
        const syncObject = this.$firebaseObject(ref);
        syncObject.$bindTo($scope, "firebase");
        return Promise.resolve(true);
    }

    authenticate(): Promise<User> {
        const authProvider = new firebase.auth.GoogleAuthProvider();
        return this.auth.$signInWithPopup(authProvider)
            .then((result: IFirebaseAuthResponse) => {
                if (result.credential) {
                    const user = this.createOrUpdateUserInFirebase(result.user);
                    return user;
                } else {
                    throw result;
                }
            });
    }

    signOut(): Promise<any> {
        const uid = this.currentUser.providerId;
        return this.FirebaseRequestProvider.patch(`users/${uid}`, {
            online: false
        }).then(() => {
            this.auth.$signOut();
        });
    }

    getUser(): User {
        return this.currentUser;
    }

    getStatus() {
        return this.status;
    }

    private prepareFirebaseRef() {
        return firebase.database().ref();
    }

    private createOrUpdateUserInFirebase(user: firebase.UserInfo) {
        const userRef = this.$firebaseObject(this.firebaseRef.child("users"));
        this.getUserFromFirebase(user.uid).then((fbUser: User) => {
            const preparedUser = new User(this.prepareUser(user));
            if (!fbUser) {
                userRef[preparedUser.providerId] = preparedUser;
                userRef.$save();
            }
            return preparedUser;
        })

    }

    private registerListeners() {
        this.auth.$onAuthStateChanged((firebaseUser) => {
            if (firebaseUser) {
                this.getUserFromFirebase(firebaseUser.uid).then((user: User) => {
                    this.FirebaseRequestProvider.patch(`users/${firebaseUser.uid}`, {
                        online: true
                    });
                    this.currentUser = new User(user);
                    this.status = true;
                    this.$rootScope.$broadcast("$userAuthorized");
                });
            } else {
                this.currentUser = null;
                this.status = false;
            }
        });
    }

    private getUserFromFirebase(uid: string): Promise<User> {
        return this.firebaseUserArrayRef.$loaded().then((data) => {
            const record = data.$getRecord(uid);
            if (record) {
                this.FirebaseRequestProvider.patch(`users/${uid}`, {
                    lastLogin: new Date(),
                })
            }
            return record;
        });
    }

    private prepareUser(user: firebase.UserInfo) {
        return {
            id: user.uid,
            providerId: user.uid,
            image: user.photoURL,
            email: user.email,
            username: user.displayName,
        };
    }
}