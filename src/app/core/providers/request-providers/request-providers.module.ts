import * as angular from "angular";

import { RequestProvidersFactory } from "./request-providers.factory";

import { FirebaseRequestProvider } from "./firebase-request.provider";


export const RequestProvidersModule = angular.module("app.core.providers.request-providers", [

])
    .factory("RequestProvider", RequestProvidersFactory)
    .service(FirebaseRequestProvider.name, FirebaseRequestProvider);


export { IRequestProvider } from "./request-providers.factory";