import * as angular from "angular";

import { CacheService } from "./services/cache.service";
import { NetworkService } from "./services/network.service";
import { AuthService } from "./services/auth/auth.service";

import { ProvidersModule } from "./providers/providers.module";

import { coreConstants } from "./core.constants";
import { keyConstants } from "./key.constants";

export const CoreModule: ng.IModule = angular.module("app.core", [
    ProvidersModule.name,
]).service("CacheService", CacheService)
    .service("NetworkService", NetworkService)
    .service("AuthService", AuthService)
    .constant("CoreConstants", coreConstants())
    .constant("KeyConstants", keyConstants());