import { ContributingService } from "./contributing.service";



export class Contributing {
    static $inject = ["ContributingService"];
    public contributeFormData: any = { additional: [] };
    constructor(private ContributingService: ContributingService) {
    }

    public contribute() {
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