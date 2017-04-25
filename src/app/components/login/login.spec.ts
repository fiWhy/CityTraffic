import { mock, ui, IControllerService } from "angular";

describe("Login Controller", () => {
    beforeEach(mock.module('ui.router'));
    beforeEach(mock.module("app.components.login"));

    let $controller;
    let $state;
    
    const loginState = "app.components.login";

    beforeEach(inject((_$controller_, _$state_) => {
        $controller = _$controller_;
        $state = _$state_;
    }))
    

    it("Should check state changing", () => {
        $state.href(loginState);
        expect($state.current.name).toEqual("#/login");
    })
})