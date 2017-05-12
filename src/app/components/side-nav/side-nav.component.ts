import { SideNav as SideNavController } from "./side-nav";

import "./side-nav.scss";

export const SideNavComponentName = "sideNav";
export const SideNav: ng.IComponentOptions = {
    controller: SideNavController,
    controllerAs: SideNavController.name,
    template: require("./side-nav.html"),
    bindings: {
        componentId: "@",
    }
};