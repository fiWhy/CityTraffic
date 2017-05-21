import * as angular from "angular";

import { NavBar } from "./nav-bar.component";
import { NavBarServiceImplementation } from "./services/nav-bar.service";
import { NavBarServiceProvider } from "./providers/nav-bar.service.provider";

import "./nav-bar.scss";

export const NavBarModule = angular.module("app.shared.components.navbar", [])
    .service(NavBarServiceImplementation.name, NavBarServiceImplementation)
    .provider("NavBarService", NavBarServiceProvider)
    .component(NavBar.selector, NavBar);