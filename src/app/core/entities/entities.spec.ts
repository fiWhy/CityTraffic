import { User, Options, AdditionalOptions } from ".";

describe("Entity", () => {
    it("user should initiating in correct way", () => {
        const testObject = { id: 1, username: "test", email: "test@gmail.com", image: "fake.png", token: "test", additionalInfo: {}, lastLogin: false, cityAddress: null, online: false };
        const user = new User(testObject);
        expect(JSON.stringify(user)).toEqual(JSON.stringify(testObject));
    })

     it("user should initiating in correct way", () => {
        const testObject = { cacheAlias: "test"};
        const additionalOptions = new AdditionalOptions(testObject);
        expect(JSON.stringify(additionalOptions)).toEqual(JSON.stringify(testObject));
    })
})