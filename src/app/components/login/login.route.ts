import { Login } from "./login";

export const routes = ($stateProvider: ng.ui.IStateProvider) => {
    $stateProvider.state("app.login", {
        url: "/login",
        parent: "app",
        template: require("./login.html"),
        controller: Login,
        controllerAs: "Login"
    });
};