import * as angular from "angular";
import { Contribution } from "../../../../core/entities";

export class RightSideNavController {
    private selectedDirection: Contribution;

    directionSelected(direction: { direction: Contribution }) { }

    changeDirection(direction: Contribution) {
        this.selectedDirection = direction;
        this.directionSelected({ direction });
    }
}

export const RightSideNav = {
    selector: "rightSideNav",
    controller: RightSideNavController,
    controllerAs: "RightSideNav",
    template: require("./right-side-nav.html"),
    bindings: {
        directions: "<",
        selectedDirection: "=",
        directionSelected: "&",
        currentUser: "<",
    },
};