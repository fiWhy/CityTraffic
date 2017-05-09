import { AuthService } from "./core/services/auth.service";

export class AppService {
    public static $inject = ["$firebaseObject", "$firebaseAuth", "AuthService"];
    private authService: any;
    private provider: any;
    constructor(private $firebaseObject: any, private $firebaseAuth: any, private AuthService: AuthService) {
        this.authService = this.$firebaseAuth();
    }

    public connectFirebaseToScope($scope: ng.IScope): void {
        const ref = firebase.database().ref().child("data");
        const syncObject = this.$firebaseObject(ref);
        syncObject.$bindTo($scope, "data");
    }

    public authenticate() {
        return this.AuthService.login(this.authService.$signInWithPopup);
    }
}