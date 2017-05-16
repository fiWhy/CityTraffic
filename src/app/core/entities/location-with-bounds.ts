export class LocationWithBounds {
    location: google.maps.LatLng;
    bounds: google.maps.LatLngBounds;

    constructor(location) {
        this.location = location && location.location ? new google.maps.LatLng(location.location.lat, location.location.lng) : null;
        this.bounds = location && location.bounds ? new google.maps.LatLngBounds(location.bounds.sw, location.bounds.ne) : null;
    }
}