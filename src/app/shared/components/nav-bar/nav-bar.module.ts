import * as angular from "angular";

import { NavBar, NavBarComponentName } from "./nav-bar.component";
import { NavBarServiceImplementation } from "./nav-bar.service";
import { NavBarServiceProvider } from "./nav-bar.service.provider";

export const NavBarModule = angular.module("app.shared.components.navbar", [])
    .service(NavBarServiceImplementation.name, NavBarServiceImplementation)
    .provider("NavBarService", NavBarServiceProvider)
    .component(NavBarComponentName, NavBar);