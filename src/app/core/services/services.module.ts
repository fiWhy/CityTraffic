import * as angular from "angular";

import { CacheService } from "./cache.service";
import { NetworkService } from "./network.service";
import { AuthService } from "./auth/auth.service";
import { GeoService } from "./geo.service";
import { ToastService } from "./toast.service";

export const ServicesModule: ng.IModule = angular.module("app.core.services", [
])
    .service(CacheService.name, CacheService)
    .service(NetworkService.name, NetworkService)
    .service(AuthService.name, AuthService)
    .service(GeoService.name, GeoService)
    .service(ToastService.name, ToastService);