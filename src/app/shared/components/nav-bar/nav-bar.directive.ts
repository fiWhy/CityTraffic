import { NavBar } from "./nav-bar";

export class NavBarDirective {
    public static id: string = "navBar";
    public static $inject = [];
    public restrict: "E";
    public template: string = require("./nav-bar.html");
    public controller: Function = NavBar;
    public controllerAs: string = NavBar.name;
    constructor() {}
}