import * as angular from "angular";

import { routes } from "./dashboard.route";
import { menu } from "./config/menu.config";

import { DashboardService } from "./dashboard.service";

import { TrafficMap, TrafficMapComponentName, RightSideNav, RightSideNavComponentName } from "./components";

export const Dashboard: ng.IModule = angular.module("app.states.dashboard", [])
    .service("DashboardService", DashboardService)
    .component(TrafficMapComponentName, TrafficMap)
    .component(RightSideNavComponentName, RightSideNav)
    .config(routes)
    .config(menu);