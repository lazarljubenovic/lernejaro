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
            color: this.strokeColor(),
            defaultValue: 'two-points',
            value: {
                'two-points': {x1, y1, x2, y2},
            }
        }
    }

    public readJson(json): this {
        this.label(json.label);
        this.strokeColor(json.strokeColor);
        const x1 = json.value['two-points'].x1;
        const x2 = json.value['two-points'].x2;
        const y1 = json.value['two-points'].y1;
        const y2 = json.value['two-points'].y2;
        this._point1 = Point.FromCartesianCoordinates(x1, y1);
        this._point2 = Point.FromCartesianCoordinates(x2, y2);
        return this;
    }

    public copyFrom(segment: Segment): this {
        [this._point1, this._point2] = segment.getPoints();
        this._label = segment._label;
        this._strokeColor = segment._strokeColor;
        return this;
    }

    public clone(): Segment {
        const point1 = this._point1.clone();
        const point2 = this._point2.clone();
        return Segment.FromTwoPoints(point1, point2)
            .label(this._label).strokeColor(this._strokeColor);
    }

    public getPoints(): Point[] {
        return [this._point1, this._point2];
    }

    protected destructToPoints(): Point[] {
        return this.getPoints().map(p => p.clone());
    }

    protected reconstructFromPoints(...points: Point[]): this {
        const [point1, point2] = points;
        this._point1 = point1;
        this._point2 = point2;
        return this;
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
