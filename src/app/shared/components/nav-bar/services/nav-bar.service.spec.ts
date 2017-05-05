import { mock } from "angular";
import { NavBarServiceImplementation } from "../services/nav-bar.service";

describe("Navbar service", () => {
    const testMenuItem = {
        sref: "app.test1",
        title: "Test1",
        name: "test1",
        active: true,
    };

    const anotherTestMenuItem = {
        sref: "app.test2",
        title: "Test2",
        name: "test2",
        active: false,
    };

    const listOfMenuItems = [testMenuItem, anotherTestMenuItem];

    beforeEach(mock.module("app.shared.components.navbar", (NavBarServiceProvider) => {
        NavBarServiceProvider.addMenuItem(testMenuItem);
        NavBarServiceProvider.addMenuItem(anotherTestMenuItem);
    }));

    let navBarService;

    beforeEach(inject((_NavBarService_) => {
        navBarService = _NavBarService_;
    }))

    it("should return active element", () => {
        expect(navBarService.activeMenuItem).toEqual(testMenuItem);
    })

    it("should change active main-menu element", () => {
        navBarService.activeMenuItem = "test2";
        expect(navBarService.activeMenuItem).toEqual(anotherTestMenuItem);
    })

     it("should unselect each main-menu item", () => {
        navBarService.deactivateAllMenuItems();
        expect(navBarService.activeMenuItem).toBeUndefined();
     });

     it("Should return all main-menu items", () => {
         expect(navBarService.fetchMenuItems()).toEqual(listOfMenuItems);
     })
})