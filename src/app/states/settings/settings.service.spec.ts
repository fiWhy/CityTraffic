import { mock } from "angular";
import { SettingsService } from "./settings.service";

describe("Settings Service", () => {
    beforeEach(mock.module("app"));

    let settingsService;
    
    beforeEach(inject((_SettingsService_) => {
        settingsService = _SettingsService_;
    }))
    
   it("Should check login service test method", () => {
        expect(settingsService.testMethod()).toEqual(2);
   })
})