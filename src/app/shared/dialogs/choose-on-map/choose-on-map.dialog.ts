import { GeoService } from "../../../core/services/geo.service";

export class ChooseOnMapDialog {
    static $inject = ["$mdDialog", "GeoService", "zoom", "center", "$q", "NgMap"];
    private defaultZoom: number = 15;
    private geoCoderService: google.maps.Geocoder;
    constructor(private $mdDialog: ng.material.IDialogService,
        private GeoService: GeoService,
        private zoom: number,
        private center: google.maps.LatLng,
        private $q: ng.IQService,
        private NgMap) {
        this.geoCoderService = new google.maps.Geocoder();
        this.initMap();
    }

    private initMap() {
        this.NgMap.getMap().then((map) => {
            const center = this.createCenter();
            google.maps.event.trigger(map, "resize");
            if (center) {
                map.setCenter(center);
            } else {
                return;
            }
        });
    }

    private createCenter() {
        if (this.center) {
            if (Array.isArray(this.center)) {
                return new google.maps.LatLng(this.center[0], this.center[1]);
            } else {
                return this.center;
            }
        } else {
            return;
        }
    }

    private getPoint = (event): void => {
        this.GeoService.askGeocoder({ location: event.latLng })
            .then((results: google.maps.GeocoderResult[]) => {
                let result;
                if (!results.length) {
                    result = undefined;
                } else {
                    result = results[0];
                }
                this.$mdDialog.hide(result);
            });
    }
}