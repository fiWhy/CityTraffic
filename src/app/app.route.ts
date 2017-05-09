import { App } from "./app";

export const routes = ($stateProvider: ng.ui.IStateProvider, $urlRouterProvider) => {
    $urlRouterProvider.otherwise("/dashboard");
    $stateProvider.state("app", {
        abstract: true,
        controller: App,
        template: require("./app.html"),
    });
};