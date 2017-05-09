import { mock } from "angular";

describe("TopBar component controller", () => {
    let $componentController;
    beforeEach(mock.module('app'));
    beforeEach(inject((_$componentController_) => {
        $componentController = _$componentController_;
    }));

    it("should initiates controller", () => {
        const controller = $componentController("topBar");
        expect(controller).toBeDefined();
    })
})