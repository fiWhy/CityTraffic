import * as angular from "angular";
import * as firebase from "firebase";
import { SharedModule } from "./shared";
import { CoreModule } from "./core";
import { StatesModule } from "./states";

import "./app.scss";
/* Config */
import { materialConfig, routesConfig, firebaseConfig } from "./config";
import { routes } from "./app.route";

firebase.initializeApp(firebaseConfig());

import { TopBar, TopBarComponentName, SideNav, SideNavComponentName } from "./components";

import { AppService } from "./app.service";

angular.module("app", [
    "ui.router",
    "ngMaterial",
    "ngMdIcons",
    "firebase",
    "LocalStorageModule",
    "ngMap",
    SharedModule.name,
    CoreModule.name,
    StatesModule.name,
])
    .config(routes)
    .config(materialConfig)
    .config(routesConfig)
    .service(AppService.name, AppService)
    .component(TopBarComponentName, TopBar)
    .component(SideNavComponentName, SideNav)

angular.bootstrap(document.getElementById("app"), ["app"]);