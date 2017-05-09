/** This is a description of the foo function. */
export const materialConfig = ($mdThemingProvider: ng.material.IThemingProvider, $mdIconProvider: ng.material.IIconProvider) => {
    $mdThemingProvider.theme("default")
        .primaryPalette("blue")
        .accentPalette("red");

    $mdIconProvider.icon("menu-white", require("../assets/svg/nav/menu-white.svg"), 24);
    $mdIconProvider.icon("account-white", require("../assets/svg/user/account-white.svg"), 24);
};