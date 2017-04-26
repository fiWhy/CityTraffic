import { mock } from "angular";
import { LoginService } from "./login.service";

describe("Login Service", () => {
    beforeEach(mock.module("app"));

    let loginService;
    
    beforeEach(inject((_LoginService_) => {
        loginService = _LoginService_;
    }))
    
   it("Should check login service test method", () => {
        expect(loginService.testMethod()).toEqual(2);
   })
})