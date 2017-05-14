import { GeoService } from "../../../../core/services/geo.service";

export class TrafficMap {
    static $inject = ["NgMap", "$mdToast", "CoreConstants", "GeoService", "$q", "$scope"];
    private zoom: number;
    private center: google.maps.LatLng;
    private defaultZoom: number = 10;
    private defaultCenter: google.maps.LatLng;
    constructor(private NgMap,
        private $mdToast: ng.material.IToastService,
        private CoreConstants,
        private GeoService: GeoService,
        private $q: ng.IQService,
        private $scope: ng.IScope) {
        this.tryingToSetCenterAndNotifyPosition();
        this.setWatchers();
    }

    private tryingToSetCenterAndNotifyPosition() {
        this.getCurrentCoordinates()
            .then((pos) => this.setCenter(pos))
            .then((latLng) => this.notifyAboutUsersPosition(latLng))
            .catch((err) => {
                this.notify(err);
            });
    }

    private setWatchers() {
        this.$scope.$watch("TrafficMap.center", (oldVal: google.maps.LatLng, newVal: google.maps.LatLng) => this.backToCenter(newVal));
        this.$scope.$watch("TrafficMap.zoom", (oldVal: number, newVal: number) => this.backToZoom(newVal));
    }

    private getCurrentCoordinates(): ng.IPromise<Position> {
        return this.GeoService.getCurrentCoordinates();
    }

    private setCenter(pos: Position): google.maps.LatLng {
        const preparedCoordinate = this.GeoService.positionToLatLng(pos);
        this.defaultCenter = preparedCoordinate;
        this.NgMap.getMap().then((map) => {
            this.backToCenter(preparedCoordinate);
            this.backToZoom(this.zoom || this.defaultZoom);
        })
        return preparedCoordinate;
    }

    private backToCenter(center?: google.maps.LatLng) {
        this.NgMap.getMap().then((map) => {
            map.setCenter(center || this.defaultCenter);
        })
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