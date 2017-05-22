class TopBarController {
    static $inject = ["$mdSidenav"];
    private isLeftSideNavOpened: boolean = true;
    private leftSideNavId: string;

    constructor(private $mdSidenav: ng.material.ISidenavService) { }

    private toggleLeftSideNav() {
        this.$mdSidenav(this.leftSideNavId).toggle();
        this.isLeftSideNavOpened = !this.isLeftSideNavOpened;
    }
}

export const TopBar = {
    selector: "topBar",
    controller: TopBarController,
    controllerAs: "TopBar",
    bindings: {
        auth: "&",
        signOut: "&",
        findCoordinates: "&",
        user: "<",
        leftSideNavId: "@",
    },
    template: require("./top-bar.html"),
};