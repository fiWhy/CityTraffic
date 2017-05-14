import * as angular from "angular";

import { CacheService } from "./services/cache.service";
import { NetworkService } from "./services/network.service";
import { AuthService } from "./services/auth/auth.service";
import { GeoService } from "./services/geo.service";

import { ProvidersModule } from "./providers/providers.module";

import { coreConstants } from "./core.constants";
import { keyConstants } from "./key.constants";

export const CoreModule: ng.IModule = angular.module("app.core", [
    ProvidersModule.name,
]).service(CacheService.name, CacheService)
    .service(NetworkService.name, NetworkService)
    .service(AuthService.name, AuthService)
    .service(GeoService.name, GeoService)
    .constant("CoreConstants", coreConstants())
    .constant("KeyConstants", keyConstants());