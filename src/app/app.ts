import * as firebase from "firebase";
import { AppService } from "./app.service";

export class App {
    static $inject = ["$scope", "AppService", "CoreConstants"];
    private leftSideNavId: string = "leftNav";
    constructor(
        private $scope: ng.IScope,
        private AppService: AppService,
        private CoreConstants,
    ) {
        this.connectToServer();
    }

    private connectToServer() {
        this.AppService.connect(this.$scope);
    }

    private findCoordinatesAndSaveToUser() {
        this.AppService.findCoordinatesAndSaveToUser();
    }

    private auth() {
        this.AppService.authenticate();
    }

    private signOut() {
        this.AppService.signOut();
    }
}
