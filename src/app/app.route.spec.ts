import { mock, IControllerService } from "angular";

describe("Dashboard Router", () => {
    beforeEach(mock.module("app"));

    let $state;
    
    const state = "app";

    beforeEach(inject((_$state_) => {
        $state = _$state_;
    }))
    

    it("Should be abstract", () => {
        const abstract = $state.get(state);
        expect(abstract.abstract).toBeTruthy();
    })
})