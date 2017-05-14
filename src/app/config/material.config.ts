/** This is a description of the foo function. */
export const materialConfig = ($mdThemingProvider: ng.material.IThemingProvider, $mdIconProvider: ng.material.IIconProvider) => {
    $mdThemingProvider.theme("default")
        .primaryPalette("blue")
        .accentPalette("red");

    $mdIconProvider.icon("menu-white", require("../assets/svg/nav/menu-white.svg"), 24);
    $mdIconProvider.icon("account-white", require("../assets/svg/user/account-white.svg"), 24);
    $mdIconProvider.icon("cancel-white", require("../assets/svg/user/cancel-white.svg"), 24);
    $mdIconProvider.icon("settings-white", require("../assets/svg/user/settings-white.svg"), 24);
    $mdIconProvider.icon("room-white", require("../assets/svg/user/room-white.svg"), 24);
    $mdIconProvider.icon("add-white", require("../assets/svg/functionality/add-white.svg"), 24);
};