import * as firebase from "firebase";

export class App {
    constructor(private $scope: ng.IScope, private $firebaseObject) {
        this.connectFirebaseToScope();
    }

    private connectFirebaseToScope() {
        const ref = firebase.database().ref().child("data");
        const syncObject = this.$firebaseObject(ref);
        syncObject.$bindTo(this.$scope, "data");
    }
}
