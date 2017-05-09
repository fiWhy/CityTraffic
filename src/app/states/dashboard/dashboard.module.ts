import * as angular from "angular";

import { routes } from "./dashboard.route";
import { menu } from "./config/menu.config";

import { DashboardService } from "./dashboard.service";

export const Dashboard: ng.IModule = angular.module("app.states.dashboard", [])
    .service("DashboardService", DashboardService)
    .config(routes)
    .config(menu);