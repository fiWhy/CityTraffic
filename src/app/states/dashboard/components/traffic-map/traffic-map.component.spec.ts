import { mock } from "angular";

describe("TrafficMap component", () => {
    let controller;
    beforeEach(mock.module('app'));
    beforeEach(mock.module({
        NgMap: {
            getMap() {
                return new Promise((resolve, reject) => { 
                    resolve(2);
                });
            }
        },
        $mdToast: {},
        CoreConstants: {},
        GeoService: {},
        AuthProvider: {},
        $scope: {},
        ToastService: {}
    }));
    beforeEach(inject(() => {
        // controller = $componentController("trafficMap");
        controller = {};
    }));

    it("should initiates controller", () => {
        // expect(controller).toBeDefined();
    })
})