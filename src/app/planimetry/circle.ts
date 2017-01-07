import {Point} from './point';

export class Circle {

    public static FromCenterAndRadius(center: Point, radius: number): Circle {
        return new Circle(center, radius);
    }

    public static FromBoundingBox(topLeft: Point, bottomRight: Point): Circle {
        const center = Point.GetPointBetween(topLeft, bottomRight);
        const d = Point.GetDistanceBetween(topLeft, bottomRight);
        const radius = d / (2 * Math.sqrt(2));
        return Circle.FromCenterAndRadius(center, radius);
    }

    private _center: Point;
    private _radius: number;

    constructor(center: Point, radius: number) {
        this._center = center;
        this._radius = radius;
        return this;
    }

}
