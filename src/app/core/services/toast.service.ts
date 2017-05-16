export class ToastService {
    static $inject = ["$mdToast", "CoreConstants"];
    private toastPosition: string;
    constructor(private $mdToast: ng.material.IToastService, private CoreConstants) {
        this.toastPosition = CoreConstants.MAIN_TOAST_POSITION || "bottom left";
    }

    public showSimple(data: string) {
        this.$mdToast.show(
            this.$mdToast.simple()
                .position(this.toastPosition)
                .textContent(data)
        );
    }
}