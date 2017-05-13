import { NavBarServiceProvider } from "../../../shared/components/nav-bar";

export const menu = (NavBarServiceProvider: NavBarServiceProvider) => {
    NavBarServiceProvider.addMenuItem({
        sref: "app.contributing",
        title: "Contributing",
        name: "contributing",
        active: false,
        order: 2,
    });
};