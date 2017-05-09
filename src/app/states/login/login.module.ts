import * as angular from "angular";

import { LoginService } from "./login.service";

import { routes } from "./login.route";

export const Login: ng.IModule = angular.module("app.states.login", [])
    .service("LoginService", LoginService)
    .config(routes);