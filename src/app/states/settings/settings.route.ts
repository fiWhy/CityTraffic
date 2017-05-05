import { Settings } from "./settings";

export const routes = ($stateProvider: ng.ui.IStateProvider) => {
    $stateProvider.state("app.settings", {
        url: "/settings",
        parent: "app",
        template: require("./settings.html"),
        controller: Settings,
        controllerAs: "Settings"
    });
};