import { NavBarServiceProvider } from "../../../shared/components/nav-bar";

export const menu = (NavBarServiceProvider: NavBarServiceProvider) => {
    NavBarServiceProvider.addMenuItem({
        sref: "app.dashboard",
        title: "Dashboard",
        name: "dashboard",
        active: true,
        order: 1,
    });
};