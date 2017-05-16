import { Contribution } from "../../../../core/entities";

export class RightSideNav {
    private selectedDirection: Contribution;

    directionSelected(direction: { direction: Contribution }) { }

    changeDirection(direction: Contribution) {
        this.selectedDirection = direction;
        this.directionSelected({ direction });
    }
}