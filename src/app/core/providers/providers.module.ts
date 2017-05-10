import * as angular from "angular";

import { AuthProvidersModule } from "./auth-providers/auth-providers.module";

export const ProvidersModule = angular.module("app.core.providers", [
    AuthProvidersModule.name
]);