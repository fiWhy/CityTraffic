import { Injectable } from "angular";

export interface INgSingleton extends Array<any> { }

export interface ISingletonInstance {
    [key: string]: any;

}

export interface ISingletonConstructor {
    new (...args: any[]): ISingletonInstance;
}

export class NgCreator {
    public static createSingletonFactory(factory: ISingletonConstructor): INgSingleton {
        const stringFactory = factory.toString();
        const reg = /(function|constructor)\s*[^\(]*\(\s*([^\)]*)\)/m;
        const parsedStructure = stringFactory.match(reg);
        let arrayOfArguments;
        if (parsedStructure && parsedStructure[2]) {
            arrayOfArguments = parsedStructure[2].replace(/ /g, "").split(",");
        } else {
            arrayOfArguments = [];
        }

        arrayOfArguments.push(NgCreator.geterateDirectiveFactory(factory));

        return arrayOfArguments;
    }

    public static geterateDirectiveFactory(factory: ISingletonConstructor): ng.IDirectiveFactory {
        return (...arrayOfArguments): ng.IDirective => {
            return new factory(...arrayOfArguments);
        };
    }
}