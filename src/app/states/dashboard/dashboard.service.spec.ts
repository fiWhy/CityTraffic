import { mock } from "angular";
import { DashboardService } from "./dashboard.service";

describe("Login Service", () => {
    beforeEach(mock.module("app"));

    let dashboardService;
    
    beforeEach(inject((_DashboardService_) => {
        dashboardService = _DashboardService_;
    }))
    
   it("Should check login service test method", () => {
        expect(dashboardService.testMethod()).toEqual(2);
   })
})