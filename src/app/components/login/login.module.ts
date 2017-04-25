import * as angular from "angular";

import { routes } from "./config/routes";

export const Login: ng.IModule = angular.module("app.components.login", [])
    .config(routes);