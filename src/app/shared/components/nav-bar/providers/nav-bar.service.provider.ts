import { NavBarServiceImplementation } from "../services/nav-bar.service";

export interface IMenuItem {
    sref: string;
    title: string;
    name: string;
    active: boolean;
    order?: number;
}

export class NavBarServiceProvider implements ng.IServiceProvider {
    private menuItems: IMenuItem[] = [];

    public addMenuItem(item: IMenuItem) {
        this.menuItems.push(item);
    }

    public $get(NavBarServiceImplementation: NavBarServiceImplementation): NavBarServiceImplementation {
        NavBarServiceImplementation.registerItems(this.menuItems);
        return NavBarServiceImplementation;
    }
}