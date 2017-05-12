import * as angular from "angular";

import { routes } from "./dashboard.route";
import { menu } from "./config/menu.config";

import { DashboardService } from "./dashboard.service";

import { TrafficMap, TrafficMapComponentName } from "./components";

export const Dashboard: ng.IModule = angular.module("app.states.dashboard", [])
    .service("DashboardService", DashboardService)
    .component(TrafficMapComponentName, TrafficMap)
    .config(routes)
    .config(menu);