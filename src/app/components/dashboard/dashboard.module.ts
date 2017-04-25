import * as angular from "angular";

import { routes } from "./config/routes";

export const Dashboard: ng.IModule = angular.module("app.components.dashboard", [])
    .config(routes);