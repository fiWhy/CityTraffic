import { Dashboard } from "../dashboard";

export const routes = ($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) => {
    $urlRouterProvider.otherwise('/');
    $stateProvider.state("dashboard", {
        url: "/",
        template: require("../dashboard.html"),
        controller: Dashboard,
        controllerAs: "Dashboard"
    })
}