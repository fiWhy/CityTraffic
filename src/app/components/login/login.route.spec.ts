import { mock, IControllerService } from "angular";

describe("Login Router", () => {
    beforeEach(mock.module("app"));

    let $state;
    
    const loginState = "login";

    beforeEach(inject((_$state_) => {
        $state = _$state_;
    }))
    

    it("Should check state changing", () => {
        const state = $state.href(loginState);
        expect(state).toEqual("#/login");
    })
})