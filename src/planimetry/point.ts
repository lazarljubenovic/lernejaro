import {polarToCartesian, cartesianToPolar} from './util';
import {Matrix} from './matrix';
import {Line} from './line';

export class Point {

    public static FromPolarCoordinates(r: number, φ: number, label?: string): Point {
        const cartesian = polarToCartesian(r, φ);
        return new Point(cartesian.x, cartesian.y, label);
    }

    public static FromCartesianCoordinates(x: number, y: number, label?: string): Point {
        return new Point(x, y, label);
    }

    public static FromMatrix(matrix: number[][], label?: string): Point {
        const x = matrix[0][0];
        const y = matrix[0][1];
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
    protected _label: string;

    constructor(x: number, y: number, label?: string) {
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

    public stretchX(k: number): this {
        const transformationMatrix = [[k, 0], [0, 1]];
        return this.applyMatrix(transformationMatrix);
    }

    public stretchY(k: number): this {
        const transformationMatrix = [[1, 0], [0, k]];
        return this.applyMatrix(transformationMatrix);
    }

    public stretch(k: number): this {
        return this.stretchX(k).stretchY(k);
    }

    public rotation(θ: number): this {
        const c = Math.cos(θ);
        const s = Math.sin(θ);
        const rotationMatrix = [[c, -s], [s, c]];
        return this.applyMatrix(rotationMatrix);
    }

    public shearX(k: number): this {
        const shearMatrix = [[1, k], [0, 1]];
        return this.applyMatrix(shearMatrix);
    }

    public shearY(k: number): this {
        const shearMatrix = [[1, 0], [k, 1]];
        return this.applyMatrix(shearMatrix);
    }

}
