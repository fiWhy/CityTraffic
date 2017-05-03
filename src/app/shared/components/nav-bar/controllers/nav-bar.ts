import { NavBarServiceImplementation as NavBarService } from "../services/nav-bar.service";
import { IMenuItem } from "../providers/nav-bar.service.provider";

export class NavBar implements ng.IController {
    private menuItems: IMenuItem[] = [];
    constructor(public NavBarService: NavBarService) {
        this.menuItems = NavBarService.fetchMenuItems();
    }
}