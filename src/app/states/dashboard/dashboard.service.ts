import { IRequestProvider, IAuthProvider } from "../../core/providers";
import { Contribution } from "../../core/entities";

interface IUserContribution {

}

export class DashboardService {
    static $inject = ["RequestProvider", "AuthProvider", "CoreConstants"];
    constructor(private RequestProvider: IRequestProvider<any>,
        private AuthProvider: IAuthProvider,
        private CoreConstants) { }

    public testMethod() {
        return 2;
    }

    public getCityPoints() {
        this.AuthProvider.getUser();
        const url = `${this.CoreConstants.REQUEST.ROUTES.CONTRIBUTION}/${this.AuthProvider.currentUser.placeId}`;
        
        return this.RequestProvider.get(url, { asArray: true })
            .then((data) => {
                return data.map((location) => new Contribution(location))
            });
    }
}