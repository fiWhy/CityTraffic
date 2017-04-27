import { mock, IControllerService } from "angular";

describe("Contributing Router", () => {
    beforeEach(mock.module("app"));

    let $state;
    
    const state = "app.contributing";

    beforeEach(inject((_$state_) => {
        $state = _$state_;
    }))
    

    it("Should check state changing", () => {
        expect($state.href(state)).toEqual("#/contributing");
    })
})