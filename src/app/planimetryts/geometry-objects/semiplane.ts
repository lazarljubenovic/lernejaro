import {GeometryObject} from './geometry-object';
import {Line} from './line';
import {Point} from './point';

export class SemiPlane extends GeometryObject {

    protected _line: Line;
    protected _vector: Point;

    constructor(line: Line, _vector: Point) {
        super('semiplane');
    }

    protected applyNonHomogeneousMatrixWithRespectToCenter(matrix: number[][]): this {
        throw "TODO SemiPlane#applyMatrix";
    }

    public radialSymmetry(point: Point): this[] {
        throw "TODO SemiPlane#radialSymmetry";
    }

    public reflectOverLine(line: Line): this {
        throw "TODO SemiPlane#reflectOverLine";
    }

}
