import * as angular from "angular";
import { NavBarModule } from "./";

export const SharedComponentsModule: ng.IModule = angular.module("app.shared.components", [
    NavBarModule.name
]);

