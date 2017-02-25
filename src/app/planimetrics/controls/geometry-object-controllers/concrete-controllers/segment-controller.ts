import {GeometryObjectController, Strategy} from '../geometry-object-controller';
import {Segment} from '../../../../planimetryts/geometry-objects/segment';
import {Point} from '../../../../planimetryts/geometry-objects/point';

interface TwoPoints {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}

export class SegmentController extends GeometryObjectController {

    private segment: Segment;

    private generalDestructStrategy(): TwoPoints {
        const [p1, p2] = this.segment.getPoints();
        const {x: x1, y: y1} = p1.getCartesianCoordinates();
        const {x: x2, y: y2} = p2.getCartesianCoordinates();
        return {x1, y1, x2, y2};
    }

    private generalReconstructStrategy(obj: TwoPoints): Segment {
        const {x1, y1, x2, y2} = obj;
        const p1 = Point.FromCartesianCoordinates(x1, y1);
        const p2 = Point.FromCartesianCoordinates(x2, y2);
        return Segment.FromTwoPoints(p1, p2);
    }

    private generalStrategy: Strategy = {
        destruct: this.generalDestructStrategy.bind(this),
        reconstruct: this.generalReconstructStrategy,
    };

    constructor(segment: Segment) {
        super();
        this.segment = segment.clone();
        this.strategies
            .set('general', this.generalStrategy);
    }

    public getGeometryObject(): Segment {
        return this.segment;
    }

}
