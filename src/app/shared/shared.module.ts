import * as angular from "angular";

import { SharedComponentsModule } from "./components/shared-components.module";

export const SharedModule: ng.IModule = angular.module("app.shared", [
    SharedComponentsModule.name
]);

