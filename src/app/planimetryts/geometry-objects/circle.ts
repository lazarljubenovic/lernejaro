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
        throw "TODO";
    }

    public static GetIntersectionsWithCircle(circle: Circle): Point[] {
        throw "TODO";
    }

    private _center: Point;
    private _radius: number;

    constructor(center: Point, radius: number) {
        super('circle');
        this._center = center;
        this._radius = radius;
        return this;
    }

    public applyMatrix(matrix: number[][]): this {
        throw "TODO";
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

    public getTangentThroughPoint(point: Point): Line[] {
        throw "TODO";
    }

}
