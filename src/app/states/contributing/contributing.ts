import { ContributingService } from "./contributing.service";
import { IRequestProvider } from "../../core/providers";
import { IAuthProvider } from "../../core/providers";
import { GeoService, ToastService } from "../../core/services";


export interface IFormData {
    title: string;
    startPoint: google.maps.GeocoderResult;
    endPoint: google.maps.GeocoderResult;
    additional?: google.maps.GeocoderResult[];
}

export class Contributing {
    static $inject = ["ContributingService", "AuthProvider", "RequestProvider", "GeoService", "ToastService", "$state"];
    public contributeFormData: IFormData;
    public currentLocation: google.maps.LatLng;
    constructor(private ContributingService: ContributingService,
        private AuthProvider: IAuthProvider,
        private RequestProvider: IRequestProvider<any>,
        private GeoService: GeoService,
        private ToastService: ToastService,
        private $state: ng.ui.IStateService) {
        this.contributeFormData = {
            title: "",
            startPoint: null,
            endPoint: null,
            additional: [],
        }
    }

    public contribute() {
        this.validate(this.contributeFormData)
            .then((data) => {
                this.ContributingService.contribute(this.contributeFormData)
                    .then(() => {
                        this.$state.go("app.dashboard");  
                    });
            }).catch(e => {
                this.ToastService.showSimple(e);
            })
    }

    private pointChanged(pointKey: string, point: google.maps.GeocoderResult) {
        // console.log(pointKey, this.contributeFormData[pointKey]);
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

    private validate(data: IFormData): Promise<IFormData> {
        return new Promise((resolve, reject) => {
            if (!data.startPoint.place_id || !data.endPoint.place_id) {
                reject("You need to pick google map item");
            } else {
                resolve(data);
            }
        })
    }

    private addAdditionalPoint() {
        this.contributeFormData.additional.push(null);
    }

    private removeAdditionalPoint(index: number) {
        this.contributeFormData.additional.splice(index, 1);
    }
}