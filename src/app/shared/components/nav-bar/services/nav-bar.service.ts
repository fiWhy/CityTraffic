import { IMenuItem } from "../providers/nav-bar.service.provider";

export class NavBarServiceImplementation {
    private _menuItems: IMenuItem[] = [];

    public registerItems(menuItems: IMenuItem[]) {
        this._menuItems = menuItems;
    }

    public fetchMenuItems(): IMenuItem[] {
        return this._menuItems.sort((prev, next) => {
              return prev.order - next.order;
        });
    }

    public get activeMenuItem(): IMenuItem {
        return this._menuItems.find((item: IMenuItem) => {
            return item.active;
        });
    }

    public set activeMenuItem(menuItem: IMenuItem) {
        this.deactivateAllMenuItems();
        this.setActiveMenuItem(menuItem.toString());
    }

    public deactivateAllMenuItems() {
        this._menuItems.forEach((item) => {
            item.active = false;
        });
    }

    public setActiveMenuItem(menuItemName: string) {
        const settedMenuItem = this._menuItems.find(menuItem => menuItem.name === menuItemName);
        settedMenuItem.active = true;
    }
}