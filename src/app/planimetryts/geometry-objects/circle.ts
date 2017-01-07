import {Point} from './point';
import {GeometryObject} from './geometry-object';
import {Line} from './line';

export class Circle extends GeometryObject {

    public static FromCenterAndRadius(center: Point, radius: number): Circle {
        return new Circle(center, radius);
    }

    public static FromBoundingBox(topLeft: Point, bottomRight: Point): Circle {
        const center = Point.GetPointBetween(topLeft, bottomRight);
        const d = Point.GetDistanceBetween(topLeft, bottomRight);
        const radius = d / (2 * Math.sqrt(2));
        return Circle.FromCenterAndRadius(center, radius);
    }

    public static FromCenterAndPoint(center: Point, point: Point): Circle {
        const radius = Point.GetDistanceBetween(center, point);
        return Circle.FromCenterAndRadius(center, radius);
    }

    public static GetIntersectionsWithLine(line: Line): Point[] {
        throw "TODO Circle.GetIntersectionsWithLine";
    }

    public static GetIntersectionsWithCircle(circle: Circle): Point[] {
        throw "TODO Circle.GetIntersectionsWithCircle";
    }

    private _center: Point;
    private _radius: number;

    constructor(center: Point, radius: number) {
        super('circle');
        this._center = center;
        this._radius = radius;
        return this;
    }

    public center(): Point {
        return this._center;
    }

    public radius(): number;
    public radius(radius: number): this;
    public radius(fn: ((radius: number) => number)): this;
    public radius(radius?: number | ((radius: number) => number)): number | this {
        if (radius == null) {
            return this._radius;
        } else {
            if (typeof radius == 'number') {
                this._radius = radius;
            } else {
                this._radius = radius(this._radius);
            }
            return this;
        }
    }

    public applyMatrix(matrix: number[][]): this {
        throw "TODO Circle#applyMatrix";
    }

    public reflectOverPoint(point: Point): this {
        throw "TODO Circle#reflectOverPoint";
    }

    public reflectOverLine(line: Line): this {
        throw "TODO Circle#reflectOverLine";
    }

    public radialSymmetry(point: Point, count: number): this[] {
        throw "TODO Circle#radialSymmetry";
    }

    public getTangentThroughPoint(point: Point): Line[] {
        throw "TODO Circle#getTangentThroughPoint";
    }

}
