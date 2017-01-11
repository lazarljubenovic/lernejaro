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

    public writeJson() {
        const [p1, p2] = this.getPoints();
        const {x1, y1, x2, y2} = {x1: p1.x(), y1: p1.y(), x2: p2.x(), y2: p2.y()};
        return {
            kind: 'segment',
            label: this.label(),
            color: this.color(),
            defaultValue: 'two-points',
            value: {
                'two-points': {x1, y1, x2, y2},
            }
        }
    }

    public readJson(json): this {
        this.label(json.label);
        this.color(json.color);
        const x1 = json.value['two-points'].x1;
        const x2 = json.value['two-points'].x2;
        const y1 = json.value['two-points'].y1;
        const y2 = json.value['two-points'].y2;
        this._point1 = Point.FromCartesianCoordinates(x1, y1);
        this._point2 = Point.FromCartesianCoordinates(x2, y2);
        return this;
    }

    protected copyFrom(segment: Segment): this {
        [this._point1, this._point2] = segment.getPoints();
        this._label = segment._label;
        this._color = segment._color;
        return this;
    }

    public clone(): Segment {
        const point1 = this._point1.clone();
        const point2 = this._point2.clone();
        return Segment.FromTwoPoints(point1, point2)
            .label(this._label).color(this._color);
    }

    public getPoints(): Point[] {
        return [this._point1, this._point2];
    }

    public applyMatrix(matrix: number[][]): this {
        const points = this.getPoints();
        const newPoints = points.map(point => point.applyMatrix(matrix));
        const newSegment = Segment.FromTwoPoints(newPoints[0], newPoints[1])
                .label(this._label).color(this._color);
        return <this>this.copyFrom(newSegment);
    }

    protected applyHomogeneousMatrixWithRespectToCenter(matrix: number[][]): this {
        const points = this.getPoints();
        const newPoints = points.map(point => point.applyHomogeneousMatrix(matrix));
        const newSegment = Segment.FromTwoPoints(newPoints[0], newPoints[1])
            .label(this._label).color(this._color);
        return <this>this.copyFrom(newSegment);
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
