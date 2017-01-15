import {StereometryObject} from '../stereometry-object';
import {Point3D} from './point-3d';

export class Line3D extends StereometryObject {

    public static AreEqual(line1: Line3D, line2: Line3D): boolean {
        return line1.contains(line2._point) && Line3D.AreParallel(line1, line2);
    }

    public static AreParallel(line1: Line3D, line2: Line3D): boolean {
        return Point3D.AreCollinearVectors(line1._vector, line2._vector);
    }

    public static FromPointAndVector(point: Point3D, vector: Point3D): Line3D {
        return new Line3D(point, vector);
    }

    public static GetIntersection(line1: Line3D, line2: Line3D): Point3D {
        throw 'todo';
    }

    protected _point: Point3D;
    protected _vector: Point3D;

    protected constructor(point: Point3D, vector: Point3D) {
        super('line');
        this._point = point;
        this._vector = vector;
    }

    public copyValuesFrom(line: Line3D): this {
        this._point = line._point.clone();
        this._vector = line._vector.clone();
        return this;
    }

    protected cloneValues(): this {
        const [point, vector] = [this._point.clone(), this._vector.clone()];
        return <this>Line3D.FromPointAndVector(point, vector);
    }

    protected destructToPoints(): Point3D[] {
        const start = this._point.clone();
        const end = Point3D.Add(start, this._vector);
        return [start, end];
    }

    protected reconstructFromPoints(...points: Point3D[]): this {
        const [start, end] = points;
        const vector = Point3D.AsVectorFromTwoPoints(start, end);
        this._point = start;
        this._vector = vector;
        return this;
    }

    public contains(point: Point3D): boolean {
        const start = this._point;
        const end = point;
        const vector1 = this._vector;
        const vector2 = Point3D.AsVectorFromTwoPoints(start, end);
        return Point3D.AreCollinearVectors(vector1, vector2);
    }

}
