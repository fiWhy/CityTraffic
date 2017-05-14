import { MdGoogleAutocomplete as MdGoogleAutocompleteController } from "./md-google-autocomplete";

export const MdGoogleAutocompleteName = "mdGoogleAutocomplete";
export const MdGoogleAutocomplete: ng.IComponentOptions = {
    controller: MdGoogleAutocompleteController,
    controllerAs: MdGoogleAutocompleteController.name,
    template: require("./md-google-autocomplete.html"),
    bindings: {
        label: "@",
        placeholder: "@",
        isDisabled: "<",
        noCache: "<",
        visibleModel: "=",
        ngModel: "=",
        placeChange: "&",
        required: "=",
    }
}