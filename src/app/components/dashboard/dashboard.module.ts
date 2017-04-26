import * as angular from "angular";

import { routes } from "./dashboard.route";

import { DashboardService } from "./dashboard.service";

export const Dashboard: ng.IModule = angular.module("app.components.dashboard", [])
    .service("DashboardService", DashboardService)
    .config(routes);