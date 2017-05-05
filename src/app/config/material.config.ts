/** This is a description of the foo function. */
export const materialConfig = ($mdThemingProvider: ng.material.IThemingProvider, $mdIconProvider: ng.material.IIconProvider) => {
    $mdThemingProvider.theme("default")
        .primaryPalette("teal");

    $mdIconProvider.iconSet("content", "node_modules/material-design-icons/content/svg/design", 24);
};