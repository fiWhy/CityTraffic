import * as angular from "angular";
import { Shared } from "./shared";

/* Config */
import { materialConfig } from "./config/material.config";

angular.module("app", [
    "ui.router",
    "ngMaterial",
    Shared
]).config(materialConfig);

angular.bootstrap(document.getElementById("app"), ["app"]);