import { mock } from "angular";
import { NavBarServiceImplementation } from "../services/nav-bar.service";

describe("Navbar service provider", () => {
    beforeEach(mock.module("app.shared.components.navbar"));

    let navBarService;

    beforeEach(inject((_NavBarService_) => {
        navBarService = _NavBarService_;
    }))
    
    it("should initiate nav bar service", () => {
        expect(navBarService instanceof NavBarServiceImplementation).toBeTruthy();
    })
})