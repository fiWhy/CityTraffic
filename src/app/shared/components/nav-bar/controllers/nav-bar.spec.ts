import { mock, IControllerService } from "angular";
import "angular-ui-router";

describe("Navbar component", () => {
    beforeEach(mock.module("ui.router"));
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