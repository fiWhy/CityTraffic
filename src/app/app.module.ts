import * as angular from "angular";
import { SharedModule } from "./shared";
import { CoreModule } from "./core";
import { ComponentsModule } from "./components";

/* Config */
import { materialConfig, routesConfig } from "./config";

angular.module("app", [
    "ui.router",
    "ngMaterial",
    "LocalStorageModule",
    SharedModule.name,
    CoreModule.name,
    ComponentsModule.name,
])
    .config(materialConfig)
    .config(routesConfig);

angular.bootstrap(document.getElementById("app"), ["app"]);