import { MainMenu as MainMenuController } from "./main-menu";

export const MainMenu: ng.IComponentOptions = {
    controller: MainMenuController,
    controllerAs: MainMenuController.name,
    template: require("./main-menu.html"),
};