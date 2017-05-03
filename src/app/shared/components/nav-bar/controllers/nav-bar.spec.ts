import { mock, IControllerService } from "angular";

describe("Navbar component", () => {
    beforeEach(mock.module("app.shared.components"));

    let $componentController;

    beforeEach(inject((_$componentController_) => {
        $componentController = _$componentController_;
    }))
    
    it("should initiates", () => {
        const controller = $componentController('navBar');
        expect(controller).toBeDefined();
    })
})