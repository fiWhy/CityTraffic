import { NavBar as NavBarController } from "./controllers/nav-bar";

export const NavBarComponentName = "navBar";
export const NavBar = {
    template: require("./nav-bar.html"),
    controller: NavBarController,
    controllerAs: NavBarController.name,
    bindings: {
        list: "<",
    },
};