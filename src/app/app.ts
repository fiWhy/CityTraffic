import * as firebase from "firebase";
import { AppService } from "./app.service";

export class App {
    static $inject = ["$rootScope", "AppService", "CoreConstants"];
    private leftSideNavId: string = "leftNav";
    constructor(
        private $rootScope: ng.IScope,
        private AppService: AppService,
        private CoreConstants
    ) {
        this.connectToServer();
    }

    private connectToServer() {
        this.AppService.connect(this.$rootScope);
    }

    private findCoordinatesAndSaveToUser() {
        this.AppService.findCoordinatesAndSaveToUser();
    }

    private auth() {
        console.log("auth");
        this.AppService.authenticate();
    }

    private signOut() {
        this.AppService.signOut();
    }
}
