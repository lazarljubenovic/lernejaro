import {Point} from './point';
export class Line {

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
        const k = Math.tan(angleRad);
        return Line.FromPointAndCoefficient(point, k);
    }

    public static FromTwoPoints(point1: Point, point2: Point): Line {
        const dy = point2.y() - point1.y();
        const dx = point2.x() - point1.x();
        const k = dy / dx; // TODO What if they are equal?
        return Line.FromPointAndCoefficient(point1, k);
    }

    public static GetAngleBetween(line1: Line, line2: Line): number {
        const k1 = line1.getExplicitForm().k;
        const k2 = line2.getExplicitForm().k;
        const k = (k2 - k1) / (1 + k1 * k2); // TODO
        return Math.atan(k);
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
        const sqrt1 = Math.sign(l1.C) * Math.sqrt(l1.A * l1.A + l1.B * l1.B);
        const sqrt2 = Math.sign(l2.C) * Math.sqrt(l2.A * l2.A + l2.B * l2.B);
        const A1 = (l1.A / sqrt1 + l2.A / sqrt2);
        const A2 = (l1.A / sqrt1 - l2.A / sqrt2);
        const B1 = (l1.B / sqrt1 + l2.B / sqrt2);
        const B2 = (l1.B / sqrt1 - l2.B / sqrt2);
        const C1 = (l1.C / sqrt1 + l2.C / sqrt2);
        const C2 = (l1.C / sqrt1 - l2.C / sqrt2);
        return [new Line(A1, B1, C1), new Line(A2, B2, C2)];
    }

    private _A: number;
    private _B: number;
    private _C: number;

    constructor(A: number, B: number, C: number) {
        this._A = A;
        this._B = B;
        this._C = C;
        return this;
    }

    private aIsZero(): boolean {
        return this._A == 0;
    }

    private bIsZero(): boolean {
        return this._B == 0;
    }

    private cIsZero(): boolean {
        return this._C == 0;
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
