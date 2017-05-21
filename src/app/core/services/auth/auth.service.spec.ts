import { mock } from "angular";

import { User } from "../../entities/user";

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
        const user = authService.initiateUser();
        const preparedClearUser = new User(clearUser);
        delete(preparedClearUser.lastLogin);
        delete(user.lastLogin);
        expect(user).toEqual(preparedClearUser);
    })

    it("should initiate user and he is not exist", () => {
        console.log("USER 2", localStorageService.get("User"))
        const user = authService.initiateUser();
        const preparedClearUser = new User({});
        delete(preparedClearUser.lastLogin);
        delete(user.lastLogin);
        expect(user).toEqual(preparedClearUser);
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
        const preparedClearUser = new User(localStorageService.get("User"));
        delete(preparedClearUser.lastLogin);
        delete(object.user.lastLogin);
        const localObject = { user: preparedClearUser, token: localStorageService.get("Token") };
        expect(localObject).toEqual(object);
    })
})