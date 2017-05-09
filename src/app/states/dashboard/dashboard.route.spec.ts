import { mock, IControllerService } from "angular";

describe("Dashboard Router", () => {
    beforeEach(mock.module("app"));

    let $state;
    
    const state = "app.dashboard";

    beforeEach(inject((_$state_) => {
        $state = _$state_;
    }))
    

    it("Should check state changing", () => {
        expect($state.href(state)).toEqual("#/dashboard");
    })
})