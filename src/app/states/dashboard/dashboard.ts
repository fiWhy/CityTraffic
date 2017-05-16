import { DashboardService } from "./dashboard.service";
import { IAuthProvider } from "../../core/providers";
import { Contribution } from "../../core/entities";

export class Dashboard {
    static $inject = ["DashboardService", "AuthProvider", "$rootScope"];
    private cityPoints: any[];
    private directions: Contribution[] = [];
    private selectedDirection: Contribution;
    constructor(private DashboardService: DashboardService,
        private AuthProvider: IAuthProvider,
        private $rootScope: ng.IRootScopeService) {
        this.getCityPoints();
        console.log("Initiating controller");
    }

    private getCityPoints() {
        if (this.AuthProvider.currentUser) {
            this.pointsRequest();
        } else {
            this.$rootScope.$on("$userAuthorized", () => {
                this.pointsRequest();
            })
        }
    }

    private pointsRequest() {
        this.DashboardService.getCityPoints()
            .then((directions) => {
                this.directions = directions;
                this.selectedDirection = this.directions[0];
            });
    }

    private directionSelected(direction: Contribution) {
        console.log(direction);
    }
}