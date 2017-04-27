import * as angular from "angular";

import { CacheService } from "./services/cache.service";
import { NetworkService } from "./services/network.service";
import { AuthService } from "./services/auth.service";

import { coreConstants } from "./core.constants";

export const CoreModule: ng.IModule = angular.module("app.core", [
]).service("CacheService", CacheService)
    .service("NetworkService", NetworkService)
    .service("AuthService", AuthService)
    .constant("CoreConstants", coreConstants());