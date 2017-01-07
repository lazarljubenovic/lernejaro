import {Point} from './point';
import {isZero, areEqualFloats} from './util';


export class Line {

    public static X_AXIS: Line = Line.HorizontalThroughPoint(0);
    public static Y_AXIS: Line = Line.VerticalThroughPoint(0);
    public static Y_EQUALS_X: Line = Line.FromExplicitForm(1, 0);

    public static AreEqual(line1: Line, line2: Line): boolean {
        if (!Line.AreParallel(line1, line2)) {
            return false;
        }
        if (line1.isVertical() && line2.isVertical()) {
            const l1 = line1.getGeneralForm();
            const l2 = line2.getGeneralForm();
            return areEqualFloats(l1.C / l1.A, l2.C / l2.A);
        }
        const l1 = line1.getGeneralForm();
        const l2 = line2.getGeneralForm();
        return areEqualFloats(l1.C / l1.B, l2.C / l2.B);
    }

    public static FromSegmentForm(m: number, n: number): Line {
        const A = n;
        const B = m;
        const C = -(n * m);
        return new Line(A, B, C);
    }

    public static FromExplicitForm(k: number, n: number): Line {
        const A = k;
        const B = -1;
        const C = n;
        return new Line(A, B, C);
    }

    public static FromGeneralForm(A: number, B: number, C: number): Line {
        return new Line(A, B, C);
    }

    public static FromNormalForm(φ: number, p: number): Line {
        const A = Math.cos(φ);
        const B = Math.sin(φ);
        const C = -p;
        return new Line(A, B, C);
    }

    public static FromPointAndCoefficient(point: Point, k: number): Line {
        const n = point.y() - k * point.x();
        return Line.FromExplicitForm(k, n);
    }

    public static FromPointAndAngle(point: Point, angleRad: number): Line {
        if (areEqualFloats(angleRad, Math.PI /2)) {
            return Line.VerticalThroughPoint(point);
        }
        const k = Math.tan(angleRad);
        return Line.FromPointAndCoefficient(point, k);
    }

    public static FromTwoPoints(point1: Point, point2: Point): Line {
        const dy = point2.y() - point1.y();
        const dx = point2.x() - point1.x();
        if (isZero(dx)) {
            return Line.VerticalThroughPoint(point1);
        }
        const k = dy / dx;
        return Line.FromPointAndCoefficient(point1, k);
    }

    public static HorizontalThroughPoint(point: Point | number): Line {
        let y: number;
        if (typeof point == 'number') {
            y = point;
        } else {
            y = point.getCartesianCoordinates().y;
        }
        return Line.FromExplicitForm(0, y);
    }

    public static VerticalThroughPoint(point: Point | number): Line {
        let x: number;
        if (typeof point == 'number') {
            x = point;
        } else {
            x = point.getCartesianCoordinates().x;
        }
        return Line.FromGeneralForm(1, 0, -x);
    }

    public static GetAnglesBetween(line1: Line, line2: Line): number[] {
        debugger;
        if ((line1.isVertical() && line2.isVertical())
            || (line1.isHorizontal() && line2.isHorizontal())) {
            return [0, Math.PI];
        }
        if ((line1.isVertical() && line2.isHorizontal())
            || (line1.isHorizontal() && line2.isVertical())) {
            return [Math.PI / 2, Math.PI / 2];
        }
        let k1, k2;
        if (!line1.isVertical()) {
            k1 = line1.getExplicitForm().k;
        } else {
            k1 = Infinity;
        }
        if (!line2.isVertical()) {
            k2 = line2.getExplicitForm().k;
        } else {
            k2 = Infinity;
        }
        return [
            Math.atan2((k2 - k1), (1 + k1 * k2)),
            Math.atan2((k1 - k2), (1 + k1 * k2)),
        ].sort();
    }

    public static GetDistanceBetweenLineAndPoint(line: Line, point: Point): number {
        const l = line.getGeneralForm();
        const num = l.A * point.x() + l.B * point.y() + l.C;
        const den = Math.sqrt(l.A * l.A + l.B * l.B);
        return Math.abs(num / den);
    }

    public static GetBisectors(line1: Line, line2: Line): Line[] {
        const l1 = line1.getGeneralForm();
        const l2 = line2.getGeneralForm();
        const sgn1 = Math.sign(l1.C) == 0 ? -1 : Math.sign(l1.C);
        const sgn2 = Math.sign(l2.C) == 0 ? -1 : Math.sign(l2.C);
        const sqrt1 = -sgn1 * Math.sqrt(l1.A * l1.A + l1.B * l1.B);
        const sqrt2 = -sgn2 * Math.sqrt(l2.A * l2.A + l2.B * l2.B);
        const A1 = (l1.A / sqrt1 + l2.A / sqrt2);
        const A2 = (l1.A / sqrt1 - l2.A / sqrt2);
        const B1 = (l1.B / sqrt1 + l2.B / sqrt2);
        const B2 = (l1.B / sqrt1 - l2.B / sqrt2);
        const C1 = (l1.C / sqrt1 + l2.C / sqrt2);
        const C2 = (l1.C / sqrt1 - l2.C / sqrt2);
        return [new Line(A1, B1, C1), new Line(A2, B2, C2)];
    }

    public static AreParallel(line1: Line, line2: Line): boolean {
        if (line1.isVertical() && line2.isVertical()) {
            return true;
        }
        if (line1.isVertical() || line2.isVertical()) {
            // Only one is vertical
            return false;
        }
        const k1 = line1.getExplicitForm().k;
        const k2 = line2.getExplicitForm().k;
        return areEqualFloats(k1, k2);
    }

    public static AreOrthogonal(line1: Line, line2: Line): boolean {
        if (line1.isVertical() && line2.isHorizontal()) {
            return true;
        }
        if (line1.isHorizontal() && line2.isVertical()) {
            return true;
        }
        if (line1.isVertical() || line2.isVertical()) {
            // One is vertical and the other is not horizontal
            return false;
        }
        const k1 = line1.getExplicitForm().k;
        const k2 = line2.getExplicitForm().k;
        return areEqualFloats(k1 * k2, -1);
    }

    private _A: number;
    private _B: number;
    private _C: number;
    public kind: string;

    constructor(A: number, B: number, C: number) {
        this._A = A;
        this._B = B;
        this._C = C;
        this.kind = 'line';
        return this;
    }

    private aIsZero(): boolean {
        return isZero(this._A);
    }

    private bIsZero(): boolean {
        return isZero(this._B);
    }

    private cIsZero(): boolean {
        return isZero(this._C);
    }

    public isHorizontal(): boolean {
        return this.aIsZero();
    }

    public isVertical(): boolean {
        return this.bIsZero();
    }

    public getGeneralForm(): {A: number, B: number, C: number} {
        return {A: this._A, B: this._B, C: this._C};
    }

    public getExplicitForm(): {k: number, n: number} {
        if (this.bIsZero()) {
            return null;
        }
        const k = -this._A / this._B;
        const n = -this._C / this._B;
        return {k, n};
    }

    public getSegmentForm(): {m: number, n: number} {
        if (this.aIsZero() || this.bIsZero() || this.cIsZero()) {
            return null;
        }
        const m = -this._C / this._A;
        const n = -this._C / this._B;
        return {m, n};
    }

    // public getNormalForm(): {φ: number, p: number} {
    //
    // }

}
