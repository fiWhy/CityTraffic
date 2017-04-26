import { User, Options, AdditionalOptions } from ".";

describe("Entity", () => {
    it("user should initiating in correct way", () => {
        const testObject = { username: "test", password: "test", token: "test" };
        const user = new User(testObject);
        expect(JSON.stringify(user)).toEqual(JSON.stringify(testObject));
    })

     it("user should initiating in correct way", () => {
        const testObject = { cacheAlias: "test"};
        const additionalOptions = new AdditionalOptions(testObject);
        expect(JSON.stringify(additionalOptions)).toEqual(JSON.stringify(testObject));
    })
})