import {Point} from './point';
import {GeometryObject} from './geometry-object';
import {Line} from './line';
import {Equation, areEqualFloats, isZero} from '../util';
import {Segment} from './segment';

export class Circle extends GeometryObject {

    public static AreEqual(circle1: Circle, circle2: Circle): boolean {
        const equalRadii = areEqualFloats(circle1._radius, circle2._radius);
        const equalCenters = Point.AreEqual(circle1._center, circle2._center);
        return equalRadii && equalCenters;
    }

    public static FromGeneralForm(p: number, q: number, r: number): Circle {
        const center = Point.FromCartesianCoordinates(p, q);
        return Circle.FromCenterAndRadius(center, r);
    }

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

    public static FromCenterAndLine(center: Point, line: Line): Circle {
        const radius = Point.GetDistanceBetweenLineAndPoint(line, center);
        return Circle.FromCenterAndRadius(center, radius);
    }

    public static GetIntersectionsWithLine(circle: Circle, line: Line): Point[] {
        const c = circle._center.getCartesianCoordinates();
        const r = circle._radius;
        if (line.isVertical()) {
            const l = line.getGeneralForm();

            const x: number = -l.C / l.A;

            const A = 1;
            const B = -2 * c.y;
            const C = (x - c.x) ** 2 - r ** 2 + c.y ** 2;
            const y: number[] = Equation.Quadratic.solve(A, B, C);

            return y.map(y => Point.FromCartesianCoordinates(x, y));
        } else {
            const l = line.getExplicitForm();

            const A = l.k ** 2 + 1;
            const B = 2 * l.k * l.n - 2 * c.x - 2 * c.y * l.k;
            const C = c.x ** 2 + l.n ** 2 + c.y ** 2 - 2 * l.n * c. y - r ** 2;
            const x: number[] = Equation.Quadratic.solve(A, B, C);

            return x.map(x => {
                const y = l.k * x + l.n;
                return Point.FromCartesianCoordinates(x, y);
            });
        }
    }

    public static GetIntersectionsWithCircle(c1: Circle, c2: Circle): Point[] {
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

    public writeJson() {
        return {
            kind: 'circle',
            label: this.label(),
            color: this.strokeColor(),
            defaultValue: 'general',
            value: {
                'general': this.getGeneralForm(),
            }
        };
    }

    public readJson(json): this {
        this.label(json.label);
        this.strokeColor(json.strokeColor);
        const x = json.value['general'].p;
        const y = json.value['general'].q;
        this._center = Point.FromCartesianCoordinates(x, y);
        this._radius = json.value['general'].r;
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

    protected copyFrom(circle: Circle): this {
        this.radius(circle.radius());
        this._center = circle.center();
        this._label = circle.label();
        this._strokeColor = circle.strokeColor();
        return this;
    }

    public clone(): Circle {
        const {p, q, r} = this.getGeneralForm();
        return Circle.FromGeneralForm(p, q, r).label(this._label).strokeColor(this._strokeColor);
    }

    public getGeneralForm(): {p: number, q: number, r: number} {
        const p = this._center.x();
        const q = this._center.y();
        const r = this._radius;
        return {p, q, r};
    }

    public getRightPoint(): Point {
        return Point.Add(this._center, Point.FromPolarCoordinates(this._radius, 0));
    }

    protected destructToPoints(): Point[] {
        const center = this._center.clone();
        const point = this.getRightPoint();
        return [center, point];
    }

    protected reconstructFromPoints(...points: Point[]): this {
        const [center, point] = points;
        const circle = Circle.FromCenterAndPoint(center, point);
        this._radius = circle._radius;
        this._center = circle._center;
        return this;
    }

    public reflectOverLine(line: Line): this {
        throw "TODO Circle#reflectOverLine";
    }

    public radialSymmetry(point: Point, count: number): this[] {
        throw "TODO Circle#radialSymmetry";
    }

    private getPointPositionalSign(point: Point): number {
        const c = this.getGeneralForm();
        const p = point.getCartesianCoordinates();
        const result = (p.x - c.p) ** 2 + (p.y - c.q) ** 2 - c.r ** 2;
        if (isZero(result)) {
            return 0;
        } else {
            return result > 0 ? 1 : -1;
        }
    }

    public containsPoint(point: Point): boolean {
        return this.getPointPositionalSign(point) == 0;
    }

    public isPointInside(point: Point): boolean {
        return this.getPointPositionalSign(point) == -1;
    }

    public isPointOutside(point: Point): boolean {
        return !this.containsPoint(point) && !this.isPointInside(point);
    }

    public pointsAreOnSameSide(point1: Point, point2: Point): boolean {
        if (this.containsPoint(point1) || this.containsPoint(point2)) {
            return false;
        }
        const sidePoint1: number = this.getPointPositionalSign(point1);
        const sidePoint2: number = this.getPointPositionalSign(point2);
        return sidePoint1 == sidePoint2;
    }

    public getTangentsThroughPoint(point: Point): Line[] {
        throw "TODO Circle#getTangentThroughPoint";
    }

}
