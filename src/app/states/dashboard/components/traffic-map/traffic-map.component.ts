import { TrafficMap as TrafficMapController } from "./traffic-map";

import "./traffic-map.scss";

export const TrafficMapComponentName = "trafficMap";
export const TrafficMap: ng.IComponentOptions = {
    controller: TrafficMapController,
    controllerAs: TrafficMapController.name,
    template: require("./traffic-map.html"),
    bindings: {
        zoom: "<",
        center: "<",
        direction: "<",
    },
};