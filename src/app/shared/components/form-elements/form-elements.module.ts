import * as angular from "angular";

import { MdGoogleAutocompleteModule } from "./components";

export const FormElementsModule: ng.IModule = angular.module("app.shared.components.form-elements", [
    MdGoogleAutocompleteModule.name
]);

