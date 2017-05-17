import { DashboardService } from "./dashboard.service";
import { IAuthProvider } from "../../core/providers";
import { Contribution } from "../../core/entities";

export class Dashboard {
    static $inject = ["DashboardService", "AuthProvider", "$rootScope", "NgMap"];
    private cityPoints: any[];
    private directions: Contribution[] = [];
    private selectedDirection: Contribution;
    private selectedDirectionObject: any;
    constructor(private DashboardService: DashboardService,
        private AuthProvider: IAuthProvider,
        private $rootScope: ng.IRootScopeService,
        private NgMap) { }

    private directionSelected(direction: Contribution) {
        this.selectedDirection = new Contribution(direction)
    }
}