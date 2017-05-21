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
    private bounds: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral;
    constructor(private MdGoogleAutocompleteService: MdGoogleAutocompleteService,
        private $timeout: ng.ITimeoutService,
        private $scope: ng.IScope,
        private $q: ng.IQService) {
        this.setWatchers();
    }

    public placeChange({ place }) { }

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
            this.MdGoogleAutocompleteService.getLatLng(this.selectedItem.place_id)
                .then((place: google.maps.GeocoderResult) => {
                    this.ngModel = place;
                    this.$timeout(() => {
                        this.placeChange({ place });
                    });
                }).catch((err) => {
                    console.log("Error", err);
                });
        } else {
            return;
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
    controllerAs: MdGoogleAutocompleteController.name,
    template: require("./md-google-autocomplete.html"),
    bindings: {
        label: "@",
        placeholder: "@",
        isDisabled: "<",
        noCache: "<",
        visibleModel: "=",
        ngModel: "=",
        placeChange: "&",
        required: "=",
        location: "<",
        radius: "<",
        bounds: "<",
    },
};