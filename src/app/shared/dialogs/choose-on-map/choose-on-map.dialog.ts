import { GeoService } from "../../../core/services/geo.service";

export class ChooseOnMapDialog {
    static $inject = ["$mdDialog", "GeoService", "zoom", "center", "$q"];
    private defaultZoom: number = 15;
    private geoCoderService: google.maps.Geocoder;
    constructor(private $mdDialog: ng.material.IDialogService,
        private GeoService: GeoService,
        private zoom: number,
        private center: google.maps.LatLng,
        private $q: ng.IQService) {
        this.geoCoderService = new google.maps.Geocoder();
    }

    private getPoint = (event): void => {
        this.GeoService.askGeocoder({ location: event.latLng }, ["street_address"])
            .then((results: google.maps.GeocoderResult[]) => {
                let result;
                if(!results.length) {
                    result = undefined;
                } else {
                    result = results[0];
                }
                this.$mdDialog.hide(result);
            });
    }
}