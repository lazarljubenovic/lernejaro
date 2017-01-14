import {GeometryObject} from './geometry-object';
import {Line} from './line';
import {Point} from './point';

export class SemiPlane extends GeometryObject {

    protected _line: Line;
    protected _vector: Point;

    protected constructor(line: Line, vector: Point) {
        super('semiplane');
    }

}
