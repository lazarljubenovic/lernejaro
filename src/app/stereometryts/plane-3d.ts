import {StereometryObject} from './stereometry-object';
import {Point3D} from './point-3d';
import {isZero} from '../planimetryts/util';

export class Plane3D extends StereometryObject {

    public static FromGeneralForm(A: number, B: number, C: number, D: number): Plane3D {
        return new Plane3D(A, B, C, D);
    }

    public static FromPointAndNormal(point: Point3D, normal: Point3D): Plane3D {
        throw 'todo';
    }

    public static FromThreePoints(point1: Point3D, point2: Point3D, point3: Point3D): Plane3D {
        throw 'todo';
    }

    protected _A: number;
    protected _B: number;
    protected _C: number;
    protected _D: number;

    protected constructor(A: number, B: number, C: number, D: number) {
        super('plane');
        this._A = A;
        this._B = B;
        this._C = C;
        this._D = D;
    }

    public isParallelToYZ(): boolean {
        // x = -D / A
        return isZero(this._B) && isZero(this._C);
    }

    public isParallelToXY(): boolean {
        return isZero(this._A) && isZero(this._B);
    }

    public isParallelToXZ(): boolean {
        return isZero(this._A) && isZero(this._C);
    }

    public isHorizontal(): boolean {
        return this.isParallelToXZ();
    }

    public isVertical(): boolean {
        return this.isParallelToXY() || this.isParallelToYZ();
    }

    copyValuesFrom(plane: Plane3D): this {
        this._A = plane._A;
        this._B = plane._B;
        this._C = plane._C;
        this._D = plane._D;
        return this;
    }

    protected cloneValues(): this {
        const {A, B, C, D} = this.getGeneralForm();
        return <this>Plane3D.FromGeneralForm(A, B, C, D);
    }

    // TODO
    protected destructToPoints(): Point3D[] {
        return undefined;
    }

    // TODO
    protected reconstructFromPoints(...points: Point3D[]): this {
        return undefined;
    }

    public getGeneralForm(): {A: number, B: number, C: number, D: number} {
        const [A, B, C, D] = [this._A, this._B, this._C, this._D];
        return {A, B, C, D};
    }

}
