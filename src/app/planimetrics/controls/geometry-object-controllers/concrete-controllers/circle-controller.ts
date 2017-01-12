import {GeometryObjectController, Strategy} from '../geometry-object-controller';
import {Circle} from '../../../../planimetryts/geometry-objects/circle';

export class CircleController extends GeometryObjectController {

    private circle: Circle;

    private generalDestructStrategy(): {p: number, q: number, r: number} {
        return this.circle.getGeneralForm();
    }

    private generalReconstructStrategy(obj: {p: number, q: number, r: number}): Circle {
        const {p, q, r} = obj;
        return Circle.FromGeneralForm(p, q, r);
    }

    private generalStrategy: Strategy = {
        destruct: this.generalDestructStrategy.bind(this),
        reconstruct: this.generalReconstructStrategy,
    };

    constructor(circle: Circle) {
        super();
        this.circle = circle.clone();
        this.strategies
            .set('general', this.generalStrategy);
    }

    public getGeometryObject(): Circle {
        return this.circle;
    }

}
