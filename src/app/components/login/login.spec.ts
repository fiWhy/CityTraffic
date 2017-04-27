import { mock, IControllerService } from "angular";

describe("Login Controller", () => {
    beforeEach(mock.module("app"));

    let $controller;
    let $state;
    let currentState;
    let controller;
    
    const loginState = "app.login";

    beforeEach(inject((_$controller_, _$state_) => {
        $controller = _$controller_;
        $state = _$state_;
    }))
    
    beforeEach(() => {
        currentState = $state.get(loginState);
        controller = new currentState.controller();
    })
    
    it("Should check controller initiates", () => {
        expect(currentState.controller.name).toEqual("Login");
    })
})