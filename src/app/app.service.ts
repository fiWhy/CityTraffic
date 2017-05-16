import { GeoService, ToastService, AuthService } from "./core/services";
import { IAuthProvider, IRequestProvider } from "./core/providers";
import { User } from "./core/entities/user";

export class AppService {
    public static $inject = ["AuthService", "AuthProvider", "RequestProvider", "GeoService", "ToastService", "CoreConstants"];
    private authService: any;
    private provider: any;
    constructor(
        private AuthService: AuthService,
        private AuthProvider: IAuthProvider,
        private RequestProvider: IRequestProvider<User>,
        private GeoService: GeoService,
        private ToastService: ToastService,
        private CoreConstants) {
    }

    public connect($scope: ng.IScope): Promise<boolean> {
        return this.AuthProvider.connect($scope);
    }

    public findCoordinatesAndSaveToUser() {
        const pinPosition = this.CoreConstants.MAIN_TOAST_POSITION;
        this.GeoService.getCurrentCoordinates()
            .then((pos: Position) => this.GeoService.getCity(pos))
            .then((city: google.maps.GeocoderResult) => {
                const latLng = city.geometry.location;
                const sw = city.geometry.bounds.getSouthWest();
                const ne = city.geometry.bounds.getNorthEast();
                const updates = {
                    location: {
                        location: { lat: latLng.lat(), lng: latLng.lng() },
                        bounds: {
                            sw: { lat: sw.lat(), lng: sw.lng() },
                            ne: { lat: ne.lat(), lng: ne.lng() },
                        },
                    },
                    placeId: city.place_id,
                };
                Object.assign(this.AuthProvider.currentUser, updates);
                this.RequestProvider.patch(`users/${this.AuthProvider.currentUser.id}`, updates)
                return city;
            }).then((city) => {
                this.ToastService.showSimple(city.formatted_address);
            }).catch((err) => {
                this.ToastService.showSimple(err || "Cannot reach geo service. Check your browser's configuration");
            });
    }

    public authenticate() {
        const pinPosition = this.CoreConstants.MAIN_TOAST_POSITION;
        return this.AuthProvider.authenticate()
            .then((data) => {
                this.ToastService.showSimple(`Welcome, ${data.username}`)
            }).catch((err) => {
                this.ToastService.showSimple(err.message)
            });
    }

    signOut() {
        return this.AuthProvider.signOut();
    }

    getUser(): User {
        return this.AuthProvider.currentUser;
    }
}