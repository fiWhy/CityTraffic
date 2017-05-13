import * as angular from "angular";

import { MdGoogleAutocomplete, MdGoogleAutocompleteName } from "./md-google-autocomplete.component";
import { MdGoogleAutocompleteService } from "./md-google-autocomplete.service";

export const MdGoogleAutocompleteModule: ng.IModule = angular.module("app.shared.components.form-elements.md-google-autocomplete", [
    
])
    .service(MdGoogleAutocompleteService.name, MdGoogleAutocompleteService)
    .component(MdGoogleAutocompleteName, MdGoogleAutocomplete);

