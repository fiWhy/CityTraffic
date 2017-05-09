import * as firebase from "firebase";
import { AppService } from "./app.service";

export class App {
    constructor(
        private $scope: ng.IScope,
        private AppService: AppService
    ) {
        this.connectFirebaseToScope();
    }

    private connectFirebaseToScope() {
        this.AppService.connectFirebaseToScope(this.$scope);
    }

    private auth() {
        this.AppService.authenticate()
            .then((success) => {
                console.log("Success", success);
            }).catch((err) => {
                console.log("Err", err);
            })
    }
}
