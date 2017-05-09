import { AuthService } from "./core/services/auth.service";
import { FirebaseAuthService } from "./services/firebase-auth.service";

export class AppService {
    public static $inject = ["$firebaseObject", "$firebaseAuth", "AuthService", "FirebaseAuthService", "$mdToast"];
    private authService: any;
    private provider: any;
    constructor(private $firebaseObject: any,
        private $firebaseAuth: any,
        private AuthService: AuthService,
        private FirebaseAuthService: FirebaseAuthService,
        private $mdToast: ng.material.IToastService) {
        this.authService = this.$firebaseAuth();
    }

    public connectFirebaseToScope($scope: ng.IScope): void {
        const ref = firebase.database().ref().child("data");
        const syncObject = this.$firebaseObject(ref);
        syncObject.$bindTo($scope, "data");
    }

    public authenticate() {
        const pinPosition = "top right";
        return this.AuthService.login(this.authService.$signInWithPopup)
            .then((result) => this.FirebaseAuthService.handleResponse(result), (err) => {
                console.log(err);
            })
            .then((data) => {
                console.log(data);
                this.$mdToast.show(
                    this.$mdToast.simple()
                        .position(pinPosition)
                        .textContent(`Welcome, ${data.user.displayName}`)
                )
            }).catch((err) => {
                this.$mdToast.show(
                    this.$mdToast.simple()
                        .position(pinPosition)
                        .textContent(err.message)
                )
            });
    }
}