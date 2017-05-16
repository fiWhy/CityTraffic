import { IDialogService } from "../../shared/dialogs";
import { GeoService } from "../../core/services";
import { IRequestProvider, IAuthProvider } from "../../core/providers";
import { Contribution } from "../../core/entities";
import { IFormData } from "./contributing";

export class ContributingService {
    static $inject = ["ChooseOnMapDialogService", "GeoService", "RequestProvider", "AuthProvider", "CoreConstants"];
    constructor(private ChooseOnMapDialogService: IDialogService,
        private GeoService: GeoService,
        private RequestProvider: IRequestProvider<Contribution>,
        private AuthProvider: IAuthProvider,
        private CoreConstants) { }

    public testMethod(): number {
        return 2;
    }

    contribute(data: any) {
        const url = `${this.CoreConstants.REQUEST.ROUTES.CONTRIBUTION}/${this.AuthProvider.currentUser.placeId}`;
        const preparedData = this.prepareData(data);
        return this.RequestProvider.post(url, preparedData, { asArray: true });
    }

    public showDialog(): ng.IPromise<any> {
        let coordinates: number[];
        return this.GeoService.getCurrentCoordinates()
            .then((pos) => {
                coordinates = [pos.coords.latitude, pos.coords.longitude];
            }).catch((err) => { })
            .then(() => {
                return this.ChooseOnMapDialogService.show({
                    zoom: 12,
                    center: coordinates,
                })
            })

    }

    private prepareData(data: IFormData) {
        const preparedData = {
            userId: null,
            title: `${data.startPoint.formatted_address} -${data.endPoint.formatted_address}`,
            startPoint: this.GeoService.exportLatLng(data.startPoint),
            endPoint: this.GeoService.exportLatLng(data.endPoint),
            additional: data.additional? data.additional.map((add) => this.GeoService.exportLatLng(add)): [],
        };
        preparedData.userId = this.AuthProvider.currentUser.id;
        return preparedData
    }
}