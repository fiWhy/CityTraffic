import { mock } from "angular";

describe("SideNav component controller", () => {
    let $componentController;
    beforeEach(mock.module('app'));
    beforeEach(inject((_$componentController_) => {
        $componentController = _$componentController_;
    }));

    it("should initiates controller", () => {
        const controller = $componentController("sideNav");
        expect(controller).toBeDefined();
    })
})