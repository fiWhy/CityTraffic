export class TrafficMap {
    constructor(private NgMap,
        private $mdToast: ng.material.IToastService,
        private CoreConstants,
        private $q: ng.IQService) {
        this.tryingToSetCenterAndNotifyPosition();
    }
    private tryingToSetCenterAndNotifyPosition() {
        this.getCurrentCoordinates()
            .then((pos) => this.setCenter(pos))
            .then((latLng) => this.notifyAboutUsersPosition(latLng))
            .catch((err) => {
                this.notify(err);
            });
    }

    private getCurrentCoordinates(): ng.IPromise<Position> {
        const defered = this.$q.defer();
        navigator.geolocation.getCurrentPosition((pos) => {
            defered.resolve(pos);
        }, (err) => {
            defered.reject(err.message)
        });
        return defered.promise;
    }

    private setCenter(pos: Position): google.maps.LatLng {
        const preparedCoordinate = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        this.NgMap.getMap().then((map) => {
            map.setCenter(preparedCoordinate);
        })
        return preparedCoordinate;
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