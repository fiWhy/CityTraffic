import { ContributingService } from "./contributing.service";
import { IRequestProvider } from "../../core/providers";
import { IAuthProvider } from "../../core/providers";
import { GeoService } from "../../core/services/geo.service";

export class Contributing {
    static $inject = ["ContributingService", "AuthProvider", "RequestProvider", "GeoService"];
    public contributeFormData: any = { additional: [] };
    public currentLocation: google.maps.LatLng;
    constructor(private ContributingService: ContributingService,
        private AuthProvider: IAuthProvider,
        private RequestProvider: IRequestProvider<any>,
        private GeoService: GeoService) {
    }

    public contribute() {
        console.log(this.RequestProvider);
        console.log("Contributing", this.contributeFormData);
    }

    private pointChanged(pointKey: string, point: google.maps.GeocoderResult) {
        console.log(pointKey, this.contributeFormData.startPoint);
    }

    private chooseOnMap(formDataKey: string, additional: boolean = false) {
        this.ContributingService.showDialog()
            .then((result: google.maps.GeocoderResult) => {
                if (additional) {
                    this.contributeFormData.additional[formDataKey] = result;
                } else {
                    this.contributeFormData[formDataKey] = result;
                }
            }).catch(() => { });
    }

    private addAdditionalPoint() {
        this.contributeFormData.additional.push(undefined);
    }

    private removeAdditionalPoint(index: number) {
        this.contributeFormData.additional.splice(index, 1);
    }
}