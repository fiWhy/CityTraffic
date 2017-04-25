import * as angular from "angular";

import { Contributing } from "./contributing";
import { Settings } from "./settings";
import { Login } from "./login";
import { Dashboard } from "./dashboard";

export const Components: ng.IModule = angular.module("app.components", [
    Contributing.name,
    Settings.name,
    Login.name,
    Dashboard.name
]);