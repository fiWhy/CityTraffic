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

angular.module("app", [
    "ui.router",
    "ngMaterial",
    "firebase",
    "LocalStorageModule",
    SharedModule.name,
    CoreModule.name,
    StatesModule.name,
])
    .config(routes)
    .config(materialConfig)
    .config(routesConfig);

angular.bootstrap(document.getElementById("app"), ["app"]);