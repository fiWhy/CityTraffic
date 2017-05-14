import { TopBar as TopBarController } from "./top-bar";

export const TopBarComponentName = "topBar";
export const TopBar: ng.IComponentOptions = {
    controller: TopBarController,
    controllerAs: TopBarController.name,
    bindings: {
        auth: "&",
        signOut: "&",
        findCoordinates: "&",
        user: "<",
        leftSideNavId: "@",
    },
    template: require("./top-bar.html"),
};