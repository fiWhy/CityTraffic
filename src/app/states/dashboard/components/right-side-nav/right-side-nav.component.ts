import * as angular from "angular";

import { RightSideNav as RightSideNavController } from "./right-side-nav";

export const RightSideNavComponentName = "rightSideNav";
export const RightSideNav: ng.IComponentOptions = {
    controller: RightSideNavController,
    controllerAs: RightSideNavController.name,
    template: require("./right-side-nav.html"),
    bindings: {
        directions: "<",
        selectedDirection: "=",
        directionSelected: "&",
        currentUser: "<",
    },
};