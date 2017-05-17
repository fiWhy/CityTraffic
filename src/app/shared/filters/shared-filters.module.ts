import { ObjectToArrayFilter, ObjectToArrayFilterName } from "./object-to-array.filter";
export const SharedFiltersModule: ng.IModule = angular.module("app.shared.filters", [

])
    .filter(ObjectToArrayFilterName, ObjectToArrayFilter);