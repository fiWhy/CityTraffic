export class Location {
    public lat: number;
    public lng: number;
    constructor(coords: any) {
        this.lat = coords.lat;
        this.lng = coords.lng;
    }
}