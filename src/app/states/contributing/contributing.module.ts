import * as angular from "angular";

import { routes } from "./contributing.route";

import { ContributingService } from "./contributing.service";

export const Contributing: ng.IModule = angular.module("app.states.contributing", [])
    .service("ContributingService", ContributingService)
    .config(routes);