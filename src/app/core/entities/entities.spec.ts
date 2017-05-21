import { User } from "./user";
import { Options } from "./options";
import { AdditionalOptions } from "./additional-options";

describe("Entity", () => {
    beforeEach(() => {
        window["google"] = {
            maps: {
                LatLng: () => undefined,
                LatLngBounds: () => undefined
            }
        }
    })
    it("user should initiating in correct way", () => {
        console.log("User", User);
        const testObject = { location: { location: null, bounds: null }, id: 1, providerId: null, username: "test", email: "test@gmail.com", image: "fake.png", token: "test", additionalInfo: {}, lastLogin: new Date(), online: false, placeId: null };
        const user = new User(testObject);
        expect(JSON.stringify(user)).toEqual(JSON.stringify(testObject));
    })

    it("user should initiating in correct way", () => {
        const testObject = { cacheAlias: "test" };
        const additionalOptions = new AdditionalOptions(testObject);
        expect(JSON.stringify(additionalOptions)).toEqual(JSON.stringify(testObject));
    })
})