import { DashboardService } from "./dashboard.service";
import { IAuthProvider } from "../../core/providers";

export class Dashboard {
    static $inject = ["DashboardService", "AuthProvider"];
    constructor(private DashboardService: DashboardService, private AuthProvider: IAuthProvider) { }
}