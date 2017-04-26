import { Login } from "./login";

export const routes = ($stateProvider: ng.ui.IStateProvider) => {
    $stateProvider.state("login", {
        url: "/login",
        template: require("./login.html"),
        controller: Login,
        controllerAs: "Login"
    });
};