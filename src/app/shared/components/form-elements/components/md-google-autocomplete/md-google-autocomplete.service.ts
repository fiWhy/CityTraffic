export class MdGoogleAutocompleteService {
    static $inject = ["$q"];
    private autocompleteErrorStatuses: google.maps.places.PlacesServiceStatus[];
    private geocodeErrorStatuses: google.maps.GeocoderStatus[];
    private autocompleteService: google.maps.places.AutocompleteService;
    private geocoderService: google.maps.Geocoder;
    constructor(private $q: ng.IQService) {
        this.prepareErrors();
        this.autocompleteService = new google.maps.places.AutocompleteService();
        this.geocoderService = new google.maps.Geocoder;
    }

    public search(input: string): ng.IPromise<google.maps.places.QueryAutocompletePrediction[]> {
        const defer = this.$q.defer();
        this.autocompleteService.getQueryPredictions({
            input
        }, (result: google.maps.places.QueryAutocompletePrediction[], status: google.maps.places.PlacesServiceStatus) => {
            if (this.autocompleteErrorStatuses.indexOf(status) != -1) {
                defer.reject(result);
            } else {
                defer.resolve(result);
            }
        });
        return defer.promise;
    }

    public getLatLng(placeId: string) {
        const defer = this.$q.defer();
        this.geocoderService.geocode({
            placeId
        }, (result: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
            if (this.geocodeErrorStatuses.indexOf(status) != -1 || !result.length) {
                defer.reject(result);
            } else {
                defer.resolve(result[0]);
            }
        });
        return defer.promise;
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