import * as angular from "angular";

import { ChooseOnMapDialogService } from "./";

export const SharedDialogsModule: ng.IModule = angular.module("app.shared.dialogs", [

])
    .service(ChooseOnMapDialogService.name, ChooseOnMapDialogService);