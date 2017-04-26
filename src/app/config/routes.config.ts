import * as angular from "angular";

export const routesConfig = ($locationProvider: angular.ILocationProvider) => {
    $locationProvider.hashPrefix("");
};