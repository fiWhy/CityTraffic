import { ContributingService } from "./contributing.service";

export class Contributing {
    public contributeFormData: any;
    constructor(private ContributingService: ContributingService) {
    }

    public contribute() {
        console.log("Contributing", this.contributeFormData);
    }
    
    private startPointChanged(startPoint: google.maps.GeocoderResult) {
        console.log("Changed", startPoint);
    }

}