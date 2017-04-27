import { mock, IControllerService } from "angular";

describe("Settings Controller", () => {
    beforeEach(mock.module("app"));

    let $controller;
    let $state;
    let currentState;
    let controller;
    
    const state = "app.settings";

    beforeEach(inject((_$controller_, _$state_) => {
        $controller = _$controller_;
        $state = _$state_;
    }))
    
    beforeEach(() => {
        currentState = $state.get(state);
        controller = new currentState.controller();
    })
    
    it("Should check controller initiates", () => {
        expect(currentState.controller.name).toEqual("Settings");
    })
})