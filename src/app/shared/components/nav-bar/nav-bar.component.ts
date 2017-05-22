import { NavBarServiceImplementation as NavBarService } from "./services/nav-bar.service";
import { IMenuItem } from "./providers/nav-bar.service.provider";

class NavBarController implements ng.IController {
    private menuItems: IMenuItem[] = [];
    constructor(public NavBarService: NavBarService, private $state: ng.ui.IStateService) {
        this.menuItems = NavBarService.fetchMenuItems();
    }

    goTo(link: string) {
        this.$state.go(link);
    }
}
export const NavBar = {
    selector: "navBar",
    template: require("./nav-bar.html"),
    controller: NavBarController,
    controllerAs: "NavBar",
    bindings: {
        list: "<",
    },
};