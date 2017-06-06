import {Point} from '../../../../planimetryts/geometry-objects/point';
import {Strategy, GeometryObjectController} from '../geometry-object-controller';

export class PointController extends GeometryObjectController {

    private point: Point;

    private cartesianDestructStrategy(): {x: number, y: number} {
        return this.point.getCartesianCoordinates();
    }

    private cartesianReconstructStrategy(obj: {x: number, y: number}): Point {
        const {x, y} = obj;
        return Point.FromCartesianCoordinates(x, y).copyViewDataFrom(this.point);
    }

    private polarDeconstructStrategy(): {r: number, φ: number} {
        return this.point.getPolarCoordinates();
    }

    private polarReconstructStrategy(obj: {r: number, φ: number}): Point {
        const {r, φ} = obj;
        return Point.FromPolarCoordinates(r, φ).copyViewDataFrom(this.point);
    }

    private cartesianStrategy: Strategy = {
        destruct: this.cartesianDestructStrategy.bind(this),
        reconstruct: this.cartesianReconstructStrategy.bind(this),
    };

    private polarStrategy: Strategy = {
        destruct: this.polarDeconstructStrategy.bind(this),
        reconstruct: this.polarReconstructStrategy.bind(this),
    };

    constructor(point: Point) {
        super();
        this.point = point.clone();
        this.strategies
            .set('cartesian', this.cartesianStrategy)
            .set('polar', this.polarStrategy);
    }

    public getGeometryObject(): Point {
        return this.point;
    }

}
