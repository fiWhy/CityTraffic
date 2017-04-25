import * as angular from "angular";
import { Shared } from "./shared";
import { Components } from "./components";

/* Config */
import { materialConfig } from "./config/material.config";

angular.module("app", [
    "ui.router",
    "ngMaterial",
    Shared.name,
    Components.name,
]).config(materialConfig);

angular.bootstrap(document.getElementById("app"), ["app"]);