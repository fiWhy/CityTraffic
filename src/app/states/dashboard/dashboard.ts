import { DashboardService } from "./dashboard.service";
import { IAuthProvider } from "../../core/providers";
import { Contribution } from "../../core/entities";

export class Dashboard {
    static $inject = ["DashboardService", "AuthProvider", "$rootScope", "NgMap"];
    private cityPoints: any[];
    private directions: Contribution[] = [];
    private selectedDirection: Contribution;
    constructor(private DashboardService: DashboardService,
        private AuthProvider: IAuthProvider,
        private $rootScope: ng.IRootScopeService,
        private NgMap) {
        this.getCityPoints();
    }

    private getCityPoints() {
        this.NgMap.getMap().then((map) => {
            google.maps.event.trigger(map, 'resize');
            if (this.AuthProvider.currentUser) {
                this.pointsRequest();
            } else {
                this.$rootScope.$on("$userAuthorized", () => {
                    this.pointsRequest();
                })
            }
        })
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