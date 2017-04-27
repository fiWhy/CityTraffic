import * as angular from "angular";

import { NavBarDirective } from "./components";

export const SharedModule: ng.IModule = angular.module("app.shared", [

]).directive(NavBarDirective.id, () => new NavBarDirective);

