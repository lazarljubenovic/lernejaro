import {polarToCartesian, cartesianToPolar, areEqualFloats} from '../util';
import {Matrix} from './matrix';
import {Line} from './line';
import {GeometryObject} from './geometry-object';

export class Point extends GeometryObject {

    public static CENTER: Point = Point.FromCartesianCoordinates(0, 0);

    public static AreEqual(point1: Point, point2: Point): boolean {
        return areEqualFloats(point1.x(), point2.x())
            && areEqualFloats(point1.y(), point2.y());
    }

    public static FromPolarCoordinates(r: number, φ: number, label?: string): Point {
        const cartesian = polarToCartesian(r, φ);
        return new Point(cartesian.x, cartesian.y, label);
    }

    public static FromCartesianCoordinates(x: number, y: number, label?: string): Point {
        return new Point(x, y, label);
    }

    public static FromMatrix(matrix: number[][], label?: string): Point {
        const x = matrix[0][0];
        const y = matrix[1][0];
        return new Point(x, y, label);
    }

    public static Negative(point: Point): Point {
        return new Point(-point.x(), -point.y());
    }

    public static Add(point1: Point, point2: Point): Point {
        return new Point(point1.x() + point2.x(), point1.y() + point2.y());
    }

    public static Subtract(point1: Point, point2: Point): Point {
        return Point.Add(point1, Point.Negative(point2));
    }

    public static DotProduct(point1: Point, point2: Point): number {
        return point1.x() * point2.x() + point1.y() * point2.y();
    }

    // public static CrossProductLength(point1: Point, point2: Point): number {
    //
    // }

    public static GetDistanceBetween(point1: Point, point2: Point): number {
        const dx = point1.x() - point2.x();
        const dy = point1.y() - point2.y();
        return Math.sqrt(dx * dx + dy * dy);
    }

    public static GetPointAtRatio(point1: Point, point2: Point, m: number, n: number = 1): Point {
        const x = (n * point1.x() + m * point2.x()) / (m + n);
        const y = (n * point1.y() + m * point2.y()) / (m + n);
        return new Point(x, y);
    }

    public static GetPointBetween(point1: Point, point2: Point): Point {
        return Point.GetPointAtRatio(point1, point2, 1, 1);
    }

    public static GetDistanceBetweenLineAndPoint(line: Line, point: Point): number {
        return Line.GetDistanceBetweenLineAndPoint(line, point);
    }

    protected _x: number;
    protected _y: number;

    constructor(x: number, y: number, label?: string) {
        super('point');
        this._x = x;
        this._y = y;
        this._label = label;
        return this;
    }

    private copyFrom(point: Point): this {
        this.x(point.x()).y(point.y()).label(point.label());
        return this;
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

    public clone(): Point {
        let clone: Point;
        return clone.copyFrom(this);
    }

    public getMatrixCoordinates(): [[number], [number]] {
        return [[this._x], [this._y]];
    }

    public getPolarCoordinates(): {r: number, φ: number} {
        return cartesianToPolar(this._x, this._y);
    }

    public getCartesianCoordinates(): {x: number, y: number} {
        return {x: this._x, y: this._y};
    }

    public translate(point: Point): this {
        return this.copyFrom(Point.Add(this, point));
    }

    public distanceTo(point: Point) {
        return Point.GetDistanceBetween(this, point);
    }

    public applyMatrix(matrix: number[][]): this {
        const newMatrix = Matrix.Multiply(matrix, this.getMatrixCoordinates());
        return this.copyFrom(Point.FromMatrix(newMatrix));
    }

    public reflectOverPoint(point: Point): this {
        throw "TODO";
    }

    public reflectOverLine(line: Line): this {
        if (line.isVertical()) {
            const d = Line.GetDistanceBetweenLineAndPoint(line, this);
            const l = line.getGeneralForm();
            const isPointAboveLine: boolean = (- l.C / l.A) > this.y();
            return this.x(x => x - 2 * d * (isPointAboveLine ? -1 : +1));
        }
        const l = line.getExplicitForm();
        const d = (this.x() + (this.y() - l.n) * l.k) / (1 + l.k ** 2);
        return this.x(x => 2 * d - x).y(y => 2 * d * l.k - y + 2 * l.n);
    }

    public radialSymmetry(point: Point, count: number): this[] {
        throw "TODO";
    }

}
