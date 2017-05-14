import * as angular from "angular";

import { SharedComponentsModule } from "./components/shared-components.module";
import { SharedDialogsModule } from "./dialogs/shared-dialogs.module";

export const SharedModule: ng.IModule = angular.module("app.shared", [
    SharedComponentsModule.name,
    SharedDialogsModule.name
]);

