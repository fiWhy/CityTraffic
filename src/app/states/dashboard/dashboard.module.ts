import * as angular from "angular";

import { routes } from "./dashboard.route";
import { menu } from "./config/menu.config";

import { DashboardService } from "./dashboard.service";

import { TrafficMap, RightSideNav } from "./components";

export const Dashboard: ng.IModule = angular.module("app.states.dashboard", [])
    .service("DashboardService", DashboardService)
    .component(TrafficMap.selector, TrafficMap)
    .component(RightSideNav.selector, RightSideNav)
    .config(routes)
    .config(menu);