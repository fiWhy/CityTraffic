export class MdGoogleAutocompleteService {
    static $inject = ["$q"];
    private autocompleteErrorStatuses: google.maps.places.PlacesServiceStatus[];
    private geocodeErrorStatuses: google.maps.GeocoderStatus[];
    private autocompleteService: google.maps.places.AutocompleteService;
    private geocoderService: google.maps.Geocoder;
    private beforeFoundPlace: google.maps.GeocoderResult;
    constructor(private $q: ng.IQService) {
        this.prepareErrors();
        this.autocompleteService = new google.maps.places.AutocompleteService();
        this.geocoderService = new google.maps.Geocoder;
    }

    public search(input: string, location: google.maps.LatLng, radius: number, bounds?: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral): ng.IPromise<google.maps.places.QueryAutocompletePrediction[]> {
        const defer = this.$q.defer();
        const options: google.maps.places.AutocompletionRequest = this.prepareSearchOptions(input, location, radius, bounds);
        this.autocompleteService.getQueryPredictions(options, (result: google.maps.places.QueryAutocompletePrediction[], status: google.maps.places.PlacesServiceStatus) => {
            if (this.autocompleteErrorStatuses.indexOf(status) != -1) {
                defer.reject(result);
            } else {
                defer.resolve(result);
            }
        });
        return defer.promise;
    }

    public getLatLng(placeId: string): ng.IPromise<google.maps.GeocoderResult> {
        const defer = this.$q.defer();
        if (!this.beforeFoundPlace || placeId !== this.beforeFoundPlace.place_id) {
            this.geocoderService.geocode({
                placeId
            }, (result: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
                if (this.geocodeErrorStatuses.indexOf(status) != -1 || !result.length) {
                    defer.reject(result);
                } else {
                    this.beforeFoundPlace = result[0];
                    defer.resolve(result[0]);
                }
            });
        } else {
            defer.resolve(this.beforeFoundPlace);
        }
        return defer.promise;
    }

    private prepareSearchOptions(input: string,
        location: google.maps.LatLng,
        radius: number,
        bounds?: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral): google.maps.places.AutocompletionRequest {
        const options = {
            input,
        };

        if (location) {
            Object.assign(options, {
                location,
                radius,
            });
        }

        if (bounds) {
            Object.assign(options, {
                bounds,
                strictBounds: true,
            });
        }

        return options;
    }

    private prepareErrors() {
        this.autocompleteErrorStatuses = [
            google.maps.places.PlacesServiceStatus.INVALID_REQUEST,
            google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT,
            google.maps.places.PlacesServiceStatus.REQUEST_DENIED,
            google.maps.places.PlacesServiceStatus.UNKNOWN_ERROR,
        ];

        this.geocodeErrorStatuses = [
            google.maps.GeocoderStatus.ERROR,
            google.maps.GeocoderStatus.INVALID_REQUEST,
            google.maps.GeocoderStatus.REQUEST_DENIED,
            google.maps.GeocoderStatus.UNKNOWN_ERROR,
            google.maps.GeocoderStatus.OVER_QUERY_LIMIT,
        ];
    }
}