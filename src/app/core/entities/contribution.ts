import { Location } from "./";

export class Contribution {
    public startTime: Date;
    public endTime: Date;
    public startPoint: google.maps.LatLng;
    public endPoint: google.maps.LatLng;
    public additional: google.maps.LatLng[];
    public userId: any;
    constructor({ startTime, endTime, startPoint, endPoint, additional }) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.startPoint = this.preparePoint(startPoint);
        this.endPoint = this.preparePoint(endPoint);
        this.additional = additional? additional.map((point) => this.preparePoint(point)): [];
    }

    private preparePoint(location: Location) {
        return new google.maps.LatLng(location.lat, location.lng);
    }
}