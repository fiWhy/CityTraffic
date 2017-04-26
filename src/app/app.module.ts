import * as angular from "angular";
import { Shared } from "./shared";
import { Components } from "./components";

/* Config */
import { materialConfig, routesConfig } from "./config";

angular.module("app", [
    "ui.router",
    "ngMaterial",
    Shared.name,
    Components.name,
])
.config(materialConfig)
.config(routesConfig);

angular.bootstrap(document.getElementById("app"), ["app"]);