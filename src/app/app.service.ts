import { AuthService } from "./core/services/auth/auth.service";
import { IAuthProvider } from "./core/providers/auth-providers/auth-providers.factory";
import { User } from "./core/entities/user";

export class AppService {
    public static $inject = ["AuthService", "AuthProvider", "$mdToast"];
    private authService: any;
    private provider: any;
    constructor(
        private AuthService: AuthService,
        private AuthProvider: IAuthProvider,
        private $mdToast: ng.material.IToastService,
        private CoreConstants) {
    }

    public connect($scope: ng.IScope): Promise<boolean> {
        return this.AuthProvider.connect($scope);
    }

    public authenticate() {
        const pinPosition = this.CoreConstants.MAIN_TOAST_POSITION;
        return this.AuthProvider.authenticate()
            .then((data) => {
                this.$mdToast.show(
                    this.$mdToast.simple()
                        .position(pinPosition)
                        .textContent(`Welcome, ${data.username}`)
                );
            }).catch((err) => {
                this.$mdToast.show(
                    this.$mdToast.simple()
                        .position(pinPosition)
                        .textContent(err.message)
                );
            });
    }

    signOut() {
        return this.AuthProvider.signOut();
    }

    getUser(): User {
        return this.AuthProvider.currentUser;
    }
}