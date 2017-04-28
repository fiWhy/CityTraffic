import { NavBarServiceImplementation as NavBarService } from "./nav-bar.service";
import { IMenuItem } from "./nav-bar.service.provider";

export class NavBar implements ng.IController {
    private menuItems: IMenuItem[] = [];
    constructor(public NavBarService: NavBarService) {
        this.menuItems = NavBarService.fetchMenuItems();
    }
}