import { AuthService } from "./core/services/auth/auth.service";
import { IAuthProvider } from "./core/providers/auth-providers/auth-providers.factory";
import { User } from "./core/entities/user";

export class AppService {
    public static $inject = ["AuthService", "AuthProvidersFactory", "$mdToast"];
    private authService: any;
    private provider: any;
    constructor(
        private AuthService: AuthService,
        private AuthProvidersFactory: IAuthProvider,
        private $mdToast: ng.material.IToastService,
        private CoreConstants) {
    }

    public connect($scope: ng.IScope): Promise<boolean> {
        return this.AuthProvidersFactory.connect($scope);
    }

    public authenticate() {
        const pinPosition = this.CoreConstants.MAIN_TOAST_POSITION;
        return this.AuthProvidersFactory.authenticate()
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
        return this.AuthProvidersFactory.signOut();
    }

    getUser(): User {
        return this.AuthProvidersFactory.currentUser;
    }
}