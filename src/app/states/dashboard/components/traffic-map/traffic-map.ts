import { GeoService } from "../../../../core/services/geo.service";
import { IAuthProvider } from "../../../../core/providers";

export class TrafficMap {
    static $inject = ["NgMap", "$mdToast", "CoreConstants", "GeoService", "AuthProvider", "$q", "$scope"];
    private zoom: number;
    private center: google.maps.LatLng;
    private defaultZoom: number = 10;
    constructor(private NgMap,
        private $mdToast: ng.material.IToastService,
        private CoreConstants,
        private GeoService: GeoService,
        private AuthProvider: IAuthProvider,
        private $q: ng.IQService,
        private $scope: ng.IScope) {
        this.setWatchers();
    }

    private setWatchers() {
        this.$scope.$watch("TrafficMap.center", (oldVal: google.maps.LatLng, newVal: google.maps.LatLng) => this.backToCenter(newVal));
        this.$scope.$watch("TrafficMap.zoom", (oldVal: number, newVal: number) => this.backToZoom(newVal));
    }

    private getCurrentCoordinates(): google.maps.LatLng {
        return this.AuthProvider.currentUser.location;
    }

    private setCenter(pos: google.maps.LatLng): void {
        this.NgMap.getMap().then((map) => {
            this.backToCenter(pos);
            this.backToZoom(this.zoom || this.defaultZoom);
        })
    }

    private backToCenter(center: google.maps.LatLng) {
        if (center) {
            this.notifyAboutUsersPosition(center)
            this.NgMap.getMap().then((map) => {
                map.setCenter(center);
            })
        } else {
            this.notify("Please set your current coordinates first");
        }
    }

    private backToZoom(zoom: number) {
        this.NgMap.getMap().then((map) => {
            map.setZoom(zoom || this.defaultZoom);
        })
    }

    private notifyAboutUsersPosition(location: google.maps.LatLng) {
        const geocoder = new google.maps.Geocoder;
        geocoder.geocode({
            location,
        }, (res, status) => {
            const administrativeArea = this.findAdministrativeArea(res);
            const result = administrativeArea.length ? administrativeArea[0] : {};
            this.notify(result.formatted_address);
        })
    }

    private findAdministrativeArea(areas: any[]) {
        return areas.filter((area) => {
            return area.types.indexOf("administrative_area_level_1") != -1;
        });
    }

    private notify(message): void {
        this.$mdToast.show(
            this.$mdToast.simple()
                .position(this.CoreConstants.MAIN_TOAST_POSITION)
                .textContent(message)
        );
    }
}