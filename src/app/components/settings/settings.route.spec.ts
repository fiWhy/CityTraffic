import { mock, IControllerService } from "angular";

describe("Settings Router", () => {
    beforeEach(mock.module("app"));

    let $state;
    
    const state = "settings";

    beforeEach(inject((_$state_) => {
        $state = _$state_;
    }))
    

    it("Should check state changing", () => {
        expect($state.href(state)).toEqual("#/settings");
    })
})