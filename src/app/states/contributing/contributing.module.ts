import * as angular from "angular";

import { routes } from "./contributing.route";

import { menu } from "./config/menu.config";

import { ContributingService } from "./contributing.service";

export const Contributing: ng.IModule = angular.module("app.states.contributing", [])
    .service("ContributingService", ContributingService)
    .config(menu)
    .config(routes);