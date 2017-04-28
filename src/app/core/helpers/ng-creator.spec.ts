import { NgCreator } from "../helpers";

class Test {
    constructor(test1, test2) {

    }
}

class EmptyArgumentsTest {
    constructor() {

    }
}

describe("Ng creator", () => {
    const singleton = NgCreator.createSingletonFactory(Test);
    const singletonWithNoArguments = NgCreator.createSingletonFactory(EmptyArgumentsTest);
    const factory = singleton.pop();
    const noArgumentsFactory = singletonWithNoArguments.pop();

    it("should return array with strings at first", () => {
        const testArrayOfArguments = ["test1", "test2"];
        expect(singleton).toEqual(testArrayOfArguments);
    })

    it("should return empty array if no arguments in class", () => {
        const testArrayOfArguments = [];
        expect(singletonWithNoArguments).toEqual(testArrayOfArguments);
    })

    it("should return last element of array as factory function", () => {
        expect(typeof factory).toBe("function");
    })

    it("should return instance of setted class", () => {
        const instance = factory("a", "b");
        expect(typeof factory).toBe("function");
    })


})  