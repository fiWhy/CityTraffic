import { Contributing } from "./contributing";

export const routes = ($stateProvider: ng.ui.IStateProvider) => {
    $stateProvider.state("app.contributing", {
        url: "/contributing",
        parent: "app",
        template: require("./contributing.html"),
        controller: Contributing,
        controllerAs: "Contributing"
    });
};