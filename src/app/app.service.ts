import { AuthService } from "./core/services/auth/auth.service";
import { GeoService } from "./core/services/geo.service";
import { IAuthProvider, IRequestProvider } from "./core/providers";
import { User } from "./core/entities/user";

export class AppService {
    public static $inject = ["AuthService", "AuthProvider", "RequestProvider", "GeoService", "$mdToast", "CoreConstants"];
    private authService: any;
    private provider: any;
    constructor(
        private AuthService: AuthService,
        private AuthProvider: IAuthProvider,
        private RequestProvider: IRequestProvider<User>,
        private GeoService: GeoService,
        private $mdToast: ng.material.IToastService,
        private CoreConstants) {
    }

    public connect($scope: ng.IScope): Promise<boolean> {
        return this.AuthProvider.connect($scope);
    }

    public findCoordinatesAndSaveToUser() {
        const pinPosition = this.CoreConstants.MAIN_TOAST_POSITION;
        this.GeoService.getCurrentCoordinates()
            .then((pos: Position) => {
                this.RequestProvider.patch(`user/${this.AuthProvider.currentUser.id}`, {
                    location: this.GeoService.positionToLatLng(pos)
                })
            }).catch((err) => {
                this.$mdToast.show(
                    this.$mdToast.simple()
                        .position(pinPosition)
                        .textContent("Cannot reach geo service. Check your browser's configuration")
                );
            });
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