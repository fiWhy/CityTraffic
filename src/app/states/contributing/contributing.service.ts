import { IDialogService } from "../../shared/dialogs";
import { GeoService } from "../../core/services/geo.service";

export class ContributingService {
    static $inject = ["ChooseOnMapDialogService", "GeoService"];
    constructor(private ChooseOnMapDialogService: IDialogService, private GeoService: GeoService) { }

    public testMethod(): number {
        return 2;
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
}