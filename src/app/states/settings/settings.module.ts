import * as angular from "angular";

import { routes } from "./settings.route";

import { SettingsService } from "./settings.service";

export const Settings: ng.IModule = angular.module("app.states.settings", [])
    .service("SettingsService", SettingsService)
    .config(routes);