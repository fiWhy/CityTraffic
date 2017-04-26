import { Contributing } from "./contributing";

export const routes = ($stateProvider: ng.ui.IStateProvider) => {
    $stateProvider.state("contributing", {
        url: "/contributing",
        template: require("./contributing.html"),
        controller: Contributing,
        controllerAs: "Contributing"
    });
};