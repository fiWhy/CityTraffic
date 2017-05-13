import { mock } from "angular";
import { spy, mock as sinonMock } from "sinon";

import { App } from "./app";

describe("App controller", () => {
    let controller;
    let $scope;
    let AppService;
    let AuthService;
    let $firebaseObject;

    beforeEach(mock.module("app"));
    beforeEach(() => {
        AppService = {
            connect($scope) {
                console.log("Called");
            },

            authenticate() { }
        };
    })
    beforeEach(inject(($rootScope) => {
        $scope = $rootScope.$new();
        controller = new App($scope, AppService, {}, {});
    }));

    it("should initiate itself", () => {
        expect(controller).toBeDefined();
    })

    it("should call initiate firebase method", () => {
        // TODO
        // let spied = spy(AppService, "connectFirebaseToScope");
        // expect(spied.called).toBeTruthy();
    })
})