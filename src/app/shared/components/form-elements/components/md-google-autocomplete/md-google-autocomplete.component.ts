import { MdGoogleAutocompleteService } from "./md-google-autocomplete.service";
import { map, isEqual } from "lodash";

class MdGoogleAutocompleteController implements ng.IController {
    static $inject = ["MdGoogleAutocompleteService", "$timeout", "$scope", "$q"];
    private selectedItem: any;
    private searchText: string;
    private oldSearchText: string;
    private queryResults: any[] = [];
    private ngModel: any;
    private location: google.maps.LatLng;
    private radius: number;
    private currentLocation: google.maps.LatLng | string;
    private bounds: google.maps.LatLngBounds;
    constructor(private MdGoogleAutocompleteService: MdGoogleAutocompleteService,
        private $timeout: ng.ITimeoutService,
        private $scope: ng.IScope,
        private $q: ng.IQService) {
        this.setWatchers();
    }

    public placeChange({ place }) { }

    public onError({ error }) { }

    private setWatchers() {
        this.$scope.$watch("MdGoogleAutocomplete.ngModel", (newData: any, oldData: any) => {
            if (!isEqual(newData, oldData)) {
                this.selectedItem = newData;
            } else {
                return;
            }
        }, true);
    }

    private searchTextChange(): ng.IPromise<google.maps.places.QueryAutocompletePrediction[] | any[]> {
        if (!this.searchText) {
            return this.$q.resolve([]);
        } else {
            return this.MdGoogleAutocompleteService.search(this.searchText, this.location, this.radius, this.bounds)
                .then((data) => {
                    if (!data) {
                        this.queryResults = [];
                        return [];
                    } else {
                        this.queryResults = this.adaptingAddresses(data);
                        return data;
                    }
                }).catch((err) => {
                    return [];
                });
        }
    }

    private adaptingAddresses(data: google.maps.places.QueryAutocompletePrediction[]): google.maps.places.QueryAutocompletePrediction[] {
        return map(data, (result) => {
            return Object.assign({}, result, {
                formatted_address: result.description
            });
        });
    }

    private selectedItemChange() {
        if (this.selectedItem) {
            this.checkForLocation(this.selectedItem);
        } else {
            return;
        }
    }

    private checkForLocation(selectedItem) {
        this.MdGoogleAutocompleteService.getLatLng(selectedItem.place_id)
            .then((place: google.maps.GeocoderResult) => {
                if (this.checkLocation(place, this.bounds)) {
                    this.ngModel = place;
                    this.$timeout(() => {
                        this.placeChange({ place });
                    });
                } else {
                    this.onError({ error: "Location in wrong area!" });
                }
            }).catch((err) => {
                console.log("Error", err);
            });
    }

    private checkLocation(place: google.maps.GeocoderResult, bounds: google.maps.LatLngBounds) {
        if (!bounds) {
            return true;
        } else {
            return bounds.contains(place.geometry.location);
        }
    }

    private getQueryResults() {
        const result = this.searchText !== this.oldSearchText ? this.searchTextChange() : this.$q.resolve(this.queryResults);
        this.oldSearchText = this.searchText;
        return result;
    }
}

export const MdGoogleAutocomplete = {
    selector: "mdGoogleAutocomplete",
    controller: MdGoogleAutocompleteController,
    controllerAs: "MdGoogleAutocomplete",
    template: require("./md-google-autocomplete.html"),
    bindings: {
        label: "@",
        placeholder: "@",
        isDisabled: "<",
        noCache: "<",
        visibleModel: "=",
        ngModel: "=",
        placeChange: "&",
        onError: "&",
        required: "=",
        location: "<",
        currentLocation: "<",
        radius: "<",
        bounds: "<",
    },
};