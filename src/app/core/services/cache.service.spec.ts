import * as angular from "angular";

import { mock } from "angular";
import { spy } from "sinon";

describe("Cache Service", () => {

    let cacheService;
    const cacheID = `cacheSpec-`;
    const putKey = "test";
    const additionalKey = "newKey";
    const subObject = "subObject";

    const fakeConstants = {
        cacheID
    }

    const testObject = { id: 1, subObject: {} };
    const secondTestObject = angular.copy(testObject);

    beforeEach(mock.module("app.core", ($provide) => {
        $provide.constant("CoreConstants", fakeConstants);
    }));

    afterEach(() => {
        cacheService.clearAll();
    })

    beforeEach(inject((CacheService) => {
        cacheService = CacheService;
        cacheService.put(putKey, testObject);
    }))

    it("Should exec cache put method", () => {
        const cb = spy(cacheService, "put");
        cacheService.put(putKey, testObject);
        expect(cb.calledOnce).toBeTruthy();
    })


    it("Should get data from cache", () => {
        const data = cacheService.fetch(putKey);
        expect(data).toEqual(testObject);
    })

    it("Should remove data from cache", () => {
        cacheService.remove(putKey);
        const data = cacheService.fetch(putKey);
        expect(data).toEqual(undefined);
    })

    it("Should update already existing object in cache", () => {
        const cb = spy(cacheService, "putToObject");
        cacheService.putToObject(putKey, subObject, secondTestObject);
        const dataFromCache = cacheService.fetch(putKey);
        expect(testObject[subObject]).toEqual(dataFromCache[subObject]);
    })

    it("Should create not existed object in cache and update it by key", () => {
        const cb = spy(cacheService, "putToObject");
        cacheService.putToObject(additionalKey, subObject, secondTestObject);
        expect(cb.called).toBeTruthy();
    })

})