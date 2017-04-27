export const routes = ($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) => {
    $urlRouterProvider.otherwise("/dashboard");
    $stateProvider.state("app", {
        abstract: true,
        template: require("./app.html"),
    });
};