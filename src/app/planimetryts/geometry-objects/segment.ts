import {GeometryObject} from './geometry-object';
import {Point} from './point';
import {Line} from './line';

export class Segment extends GeometryObject {

    public static FromTwoPoints(point1: Point, point2: Point): Segment {
        return new Segment(point1, point2);
    }

    private _point1: Point;
    private _point2: Point;
    private _label: string;
    private _isDirected: boolean;

    constructor(point1: Point, point2: Point, label?: string, isDirected: boolean = false) {
        super('segment');
        this._point1 = point1;
        this._point2 = point2;
        this._label = label;
        this._isDirected = isDirected;
    }

    public getPoints(): Point[] {
        return [this._point1, this._point2];
    }

    public applyMatrix(matrix: number[][]): this {
        const points = this.getPoints();
        const newPoints = points.map(point => point.applyMatrix(matrix));
        return <this>Segment.FromTwoPoints(newPoints[1], newPoints[2]);
    }

    public reflectOverPoint(point: Point): this {
        throw "TODO";
    }

    public reflectOverLine(line: Line): this {
        throw "TODO";
    }

    public radialSymmetry(point: Point, count: number): this[] {
        throw "TODO";
    }

}
