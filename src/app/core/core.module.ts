import * as angular from "angular";

import { ProvidersModule } from "./providers/providers.module";
import { ServicesModule } from "./services/services.module";

import { coreConstants } from "./core.constants";

export const CoreModule: ng.IModule = angular.module("app.core", [
    ProvidersModule.name,
    ServicesModule.name,
])
    .constant("CoreConstants", coreConstants());