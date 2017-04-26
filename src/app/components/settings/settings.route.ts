import { Settings } from "./settings";

export const routes = ($stateProvider: ng.ui.IStateProvider) => {
    $stateProvider.state("settings", {
        url: "/settings",
        template: require("./settings.html"),
        controller: Settings,
        controllerAs: "Settings"
    });
};