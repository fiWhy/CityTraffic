import { IDialogService } from "../";
import { ChooseOnMapDialog } from "./choose-on-map.dialog";

import "./choose-on-map.scss";

export interface IChooseOnMapDialogScope {
    zoom: number;
    center: google.maps.LatLng;
}

export class ChooseOnMapDialogService implements IDialogService {
    static $inject = ["$mdDialog"];
    constructor(private $mdDialog: ng.material.IDialogService) { }

    show(scope?: IChooseOnMapDialogScope): ng.IPromise<any> {
        return this.$mdDialog.show({
            locals: {
                zoom: scope? scope.zoom: undefined,
                center: scope? scope.center: undefined,
            },
            controller: ChooseOnMapDialog,
            controllerAs: ChooseOnMapDialog.name,
            template: require("./choose-on-map.html"),
            clickOutsideToClose: true,
            escapeToClose: true,
        })
    }
}