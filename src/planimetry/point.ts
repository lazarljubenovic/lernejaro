import {polarToCartesian, cartesianToPolar} from './util';

class Point {

    public static FromPolarCoordinates(r: number, φ: number, label?: string): Point {
        const cartesian = polarToCartesian(r, φ);
        return new Point(cartesian.x, cartesian.y, label);
    }

    public static FromCartesianCoordinates(x: number, y: number, label?: string): Point {
        return new Point(x, y, label);
    }

    public static Add(point1: Point, point2: Point): Point {
        return new Point(point1.x() + point2.x(), point1.y() + point2.y());
    }

    public static Subtract(point1: Point, point2: Point): Point {
        return new Point(point1.x() - point2.x(), point1.y() - point2.y());
    }

    public static DotProduct(point1: Point, point2: Point): number {
        return point1.x() * point2.x() + point1.y() * point2.y();
    }

    // public static CrossProductLength(point1: Point, point2: Point): number {
    //
    // }

    public static DistanceBetween(point1: Point, point2: Point): number {
        const dx = point1.x() - point2.x();
        const dy = point1.y() - point2.y();
        return Math.sqrt(dx * dx + dy * dy);
    }

    protected _x: number;
    protected _y: number;
    protected _label: string;

    constructor(x: number, y: number, label?: string) {
        this._x = x;
        this._y = y;
        this._label = label;
        return this;
    }

    private copyFrom(point: Point) {
        this.x(point.x()).y(point.y()).label(point.label());
    }

    public x(): number;
    public x(x: number): this;
    public x(fn: (x: number) => number): this;
    public x(x?: number | ((x: number) => number)): this | number {
        if (x == null) {
            return this._x;
        } else {
            if (typeof x == 'number') {
                this._x = x;
            } else {
                this._x = x(this._x);
            }
            return this;
        }
    }

    public y(): number;
    public y(y: number): this;
    public y(fn: (y: number) => number): this;
    public y(y?: number | ((y: number) => number)): this | number {
        if (y == null) {
            return this._y;
        } else {
            if (typeof y == 'number') {
                this._y = y;
            } else {
                this._y = y(this._y);
            }
            return this;
        }
    }

    public label(): string;
    public label(label: string): this;
    public label(label?: string): string | this {
        if (label == null) {
            return this._label;
        } else {
            this._label = label;
            return this;
        }
    }

    public matrixCoordinates(): [[number], [number]] {
        return [[this._x], [this._y]];
    }

    public getPolarCoordinates(): {r: number, φ: number} {
        return cartesianToPolar(this._x, this._y);
    }

    public translate(point: Point): this {
        this.copyFrom(Point.Add(this, point));
        return this;
    }

    public distanceTo(point: Point) {
        return Point.DistanceBetween(this, point);
    }

    // public applyMatrix(matrix: Matrix | number[][]) {
    //     matrix = (<Matrix>matrix).data ? (<Matrix>matrix).data : matrix;
    //
    // }

}
