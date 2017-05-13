import { MdGoogleAutocompleteService } from "./md-google-autocomplete.service";
export class MdGoogleAutocomplete implements ng.IController {
    static $inject = ["MdGoogleAutocompleteService", "$q"];
    private selectedItem: any;
    private searchText: string;
    private oldSearchText: string;
    private queryResults: any[] = [];
    private ngModel: any;
    constructor(private MdGoogleAutocompleteService: MdGoogleAutocompleteService, private $q: ng.IQService) { }

    public placeChange({ place }) {}

    private searchTextChange(): ng.IPromise<google.maps.places.QueryAutocompletePrediction[] | any[]> {
        if (!this.searchText) {
            return this.$q.resolve([]);
        } else {
            return this.MdGoogleAutocompleteService.search(this.searchText)
                .then((data) => {
                    this.queryResults = data;
                    return data;
                }).catch((err) => {
                    console.log("Error", err);
                })
        }
    }

    private selectedItemChange() {
        if (this.selectedItem) {
            this.MdGoogleAutocompleteService.getLatLng(this.selectedItem.place_id)
                .then((place: google.maps.GeocoderResult) => {
                    this.ngModel = place;
                    this.placeChange({ place });
                }).catch((err) => {
                    console.log("Error", err);
                })
        } else {
            return;
        }
    }

    private getQueryResults() {
        this.ngModel = null;
        const result = this.searchText !== this.oldSearchText ? this.searchTextChange() : this.queryResults;
        this.oldSearchText = this.searchText;
        return result;
    }
}