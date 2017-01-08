import {GeometryObject} from './geometry-object';
import {Point} from './point';
import {Line} from './line';

export class Segment extends GeometryObject {

    public static FromTwoPoints(point1: Point, point2: Point): Segment {
        return new Segment(point1, point2);
    }

    protected _point1: Point;
    protected _point2: Point;
    protected _isDirected: boolean;

    constructor(point1: Point, point2: Point, label?: string, isDirected: boolean = false) {
        super('segment');
        this._point1 = point1;
        this._point2 = point2;
        this._label = label;
        this._isDirected = isDirected;
    }

    protected copyFrom(segment: Segment): this {
        [this._point1, this._point2] = segment.getPoints();
        return this;
    }

    public clone(): Segment {
        const point1 = this._point1.clone();
        const point2 = this._point2.clone();
        return Segment.FromTwoPoints(point1, point2);
    }

    public getPoints(): Point[] {
        return [this._point1, this._point2];
    }

    // TODO: Why does this return enw instead of mutate? also below
    public applyMatrix(matrix: number[][]): this {
        const points = this.getPoints();
        const newPoints = points.map(point => point.applyMatrix(matrix));
        return <this>Segment.FromTwoPoints(newPoints[1], newPoints[2]);
    }

    public applyHomogeneousMatrix(matrix: number[][]): this {
        const points = this.getPoints();
        const newPoints = points.map(point => point.applyHomogeneousMatrix(matrix));
        return <this>Segment.FromTwoPoints(newPoints[0], newPoints[1]);
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

    public getMiddle(): Point {
        return Point.GetPointBetween(this._point1, this._point2);
    }

    public getLine(): Line {
        const points = this.getPoints();
        return Line.FromTwoPoints(points[0], points[1]);
    }

    public getBisector(): Line {
        return Line.OrthogonalThroughPoint(this.getLine(), this.getMiddle());
    }

}
