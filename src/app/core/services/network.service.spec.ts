import * as angular from "angular";

import { mock } from "angular";
import { spy } from "sinon";

describe("Network Service", () => {
    let cacheService,
        http,
        networkService,
        requestHandler,
        localStorage,
        root;

    const cacheID = `networkSpec-`;
    const putKey = "test";

    const API_URL = "/";

    const fakeConstants = {
        cacheID,
        API_URL
    }

    const fakeResponse = {
        test: true
    }

    const fakeCachedResponse = {
        test: true,
        cached: true,
    }

    const error = {
        error: true,
    }

    const fakePostBody = fakeResponse;

    const fail = (error) => {
        expect(error).toEqual(error);
    }

    beforeEach(mock.module("LocalStorageModule"));
    beforeEach(mock.module("app.core"));

    beforeEach(mock.module("app.core", ($provide) => {
        $provide.constant("CoreConstants", fakeConstants);
    }));

    beforeEach(inject((_CacheService_, _NetworkService_, $httpBackend, $rootScope) => {
        cacheService = _CacheService_;
        http = $httpBackend;
        networkService = _NetworkService_;
        root = $rootScope;

        http.when("GET", "/test").respond(200, fakeResponse);
        http.when("POST", "/test").respond(200, fakeResponse);
        http.when("PUT", "/test").respond(200, fakeResponse);
        http.when("PATCH", "/test").respond(200, fakeResponse);
        http.when("DELETE", "/test").respond(200, fakeResponse);

    }))

    afterEach(() => {
        cacheService.clearAll();
    })


    it("should check GET response without forcing and cached data", (done) => {
        networkService.get("test")
            .then((response) => {
                expect(response).toEqual(fakeResponse);
            })
            .catch(fail)
            .finally(done);
        http.flush();
    })

    it("should check GET response with forcing", (done) => {
        networkService.get("test", {}, { force: true })
            .then((response) => {
                expect(response).toEqual(fakeResponse);
            })
            .catch(fail)
            .finally(done);
        http.flush();
    })

    it("should check get response with no cached data", (done) => {
        networkService.get("test", {}, { cacheAlias: "fake" })
            .then((response) => {
                expect(response).toEqual(fakeResponse);
            })
            .catch(fail)
            .finally(done);
        http.flush();
    })

    it("should check GET response with cached data by additional cacheAlias", (done) => {
        cacheService.put(putKey, fakeCachedResponse);
        networkService.get("test", {}, { cacheAlias: putKey })
            .then((response) => {
                expect(response).toEqual(fakeCachedResponse);
            })
            .catch(fail)
            .finally(done);

        root.$digest();
    })

    it("should cache data after GET request by url if additional cacheAlias is not exists", (done) => {
        networkService.get("test")
            .then((response) => {
                const data = cacheService.fetch("test");
                expect(data).toEqual(fakeResponse);
            })
            .catch(fail)
            .finally(done);
        http.flush();
    })

    it("should work with errors when GET", (done) => {
        http.expectGET("/test").respond(400, error)
        networkService.get("test")
            .catch(fail)
            .finally(done);
        http.flush();
    })

    it("should work return string error if error is BE exception", (done) => {
        const errorString = "ERROR!";
        http.expectGET("/test").respond(500, errorString)
        networkService.get("test")
            .catch((error) => {
                expect(error).toBe(errorString);
            })
            .finally(done);
        http.flush();
    })

    it("should check POST request", (done) => {
        networkService.post("test", fakePostBody)
            .then((response) => {
                expect(response).toEqual(fakeResponse);
            })
            .catch(fail)
            .finally(done);
        http.flush();
    })

    it("should work with errors when POST", (done) => {
        http.expectPOST("/test").respond(400, error)
        networkService.post("test", fakePostBody)
            .catch(fail)
            .finally(done);
        http.flush();
    })

    it("should check PUT request", (done) => {
        networkService.put("test", fakePostBody)
            .then((response) => {
                expect(response).toEqual(fakeResponse);
            })
            .catch(fail)
            .finally(done);
        http.flush();
    })

    it("should work with errors when PUT", (done) => {
        http.expectPUT("/test").respond(400, error)
        networkService.put("test", fakePostBody)
            .catch(fail)
            .finally(done);
        http.flush();
    })

    it("should check DELETE request", (done) => {
        networkService.delete("test")
            .then((response) => {
                expect(response).toEqual(fakeResponse);
            })
            .catch(fail)
            .finally(done);
        http.flush();
    })

    it("should work with errors when DELETE", (done) => {
        http.expectDELETE("/test").respond(400, error)
        networkService.delete("test")
            .catch(fail)
            .finally(done);
        http.flush();
    })

    it("should check PATCH request", (done) => {
        networkService.patch("test", fakePostBody)
            .then((response) => {
                expect(response).toEqual(fakeResponse);
            })
            .catch(fail)
            .finally(done);
        http.flush();
    })

    it("should work with errors when PATCH", (done) => {
        http.expectPATCH("/test").respond(400, error)
        networkService.patch("test", fakePostBody)
            .catch(fail)
            .finally(done);
        http.flush();
    })
})