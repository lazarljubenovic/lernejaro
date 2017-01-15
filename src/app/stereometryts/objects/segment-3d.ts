import {StereometryObject} from '../stereometry-object';
import {Point3D} from './point-3d';

export class Segment3D extends StereometryObject {

    public static FromTwoPoints(point1: Point3D, point2: Point3D): Segment3D {
        return new Segment3D(point1, point2);
    }

    protected _point1: Point3D;
    protected _point2: Point3D;

    protected constructor(point1: Point3D, point2: Point3D) {
        super('segment');
        this._point1 = point1;
        this._point2 = point2;
    }

    copyValuesFrom(segment: Segment3D): this {
        this._point1 = segment._point1.clone();
        this._point2 = segment._point2.clone();
        return this;
    }

    protected cloneValues(): this {
        const [point1, point2] = [this._point1.clone(), this._point2.clone()];
        return <this>Segment3D.FromTwoPoints(point1, point2);
    }

    protected destructToPoints(): Point3D[] {
        return [this._point1.clone(), this._point2.clone()];
    }

    protected reconstructFromPoints(...points: Point3D[]): this {
        const [point1, point2] = points;
        this._point1 = point1.clone();
        this._point2 = point2.clone();
        return this;
    }

}
