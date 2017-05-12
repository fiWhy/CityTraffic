export class TopBar {
    static $inject = ["$mdSidenav"];
    private isLeftSideNavOpened: boolean = true;
    private leftSideNavId: string;

    constructor(private $mdSidenav: ng.material.ISidenavService) { }

    private toggleLeftSideNav() {
        this.$mdSidenav(this.leftSideNavId).toggle();
        this.isLeftSideNavOpened = !this.isLeftSideNavOpened;
    }
}