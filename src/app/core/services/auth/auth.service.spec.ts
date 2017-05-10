import { mock } from "angular";

import { User } from "../../entities";

describe("Auth service", () => {
    let authService;
    let localStorageService;

    const clearUser = new User({
        token: "test",
        username: "test",
        password: "test",
    });

    beforeEach(mock.module("app"));
    afterEach(() => {
        localStorageService.clearAll();
    })

    beforeEach(inject((_AuthService_, _localStorageService_) => {
        authService = _AuthService_;
        localStorageService = _localStorageService_;
    }))

    it("should initiate user and he exists", () => {
        localStorageService.set("User", clearUser);
        console.log("USER", localStorageService.get("User"))
        const user = authService.initiateUser();
        expect(user).toEqual(clearUser);
    })

    it("should initiate user and he is not exist", () => {
        console.log("USER 2", localStorageService.get("User"))
        const user = authService.initiateUser();
        expect(user).toEqual(new User({}));
    })
    it("should check token exists", () => {
        expect(authService.isLoggedIn()).toBeFalsy();
    })

    it("should authorize", () => {
        authService.authorize(clearUser);
        expect(authService.getUser()).toEqual(clearUser);
    })

    it("should authorize and remember", () => {
        authService.authorize(clearUser, true);
        const object = { user: clearUser, token: clearUser.token };
        const localObject = { user: new User(localStorageService.get("User")), token: localStorageService.get("Token") };
        expect(localObject).toEqual(object);
    })
})