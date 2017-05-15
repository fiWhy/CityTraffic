import { DashboardService } from "./dashboard.service";
import { IAuthProvider } from "../../core/providers";
import { Contribution } from "../../core/entities";

export class Dashboard {
    static $inject = ["DashboardService", "AuthProvider", "$rootScope"];
    private cityPoints: any[];
    private directions: Contribution[] = [];
    private chosenDirection: Contribution;
    constructor(private DashboardService: DashboardService,
        private AuthProvider: IAuthProvider,
        private $rootScope: ng.IRootScopeService) {
        this.getCityPoints();
    }

    private getCityPoints() {
        this.$rootScope.$on("$userAuthorized", () => {
            this.DashboardService.getCityPoints()
                .then((directions) => {
                    this.directions = directions;
                    this.chosenDirection = this.directions[0];
                });
        })
    }
}