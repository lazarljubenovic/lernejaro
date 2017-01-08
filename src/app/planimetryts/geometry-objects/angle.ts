import {degreeToRadian, radianToDegree} from '../util';

export class Angle {

    public static Degrees(angleDegrees: number): Angle {
        return new Angle(angleDegrees);
    }

    public static Radians(angleRadians: number): Angle {
        return new Angle(radianToDegree(angleRadians));
    }

    public static Add(angle1: Angle, angle2: Angle): Angle {
        return Angle.Degrees(angle1.degrees + angle2.degrees);
    }

    private _angleDegrees: number;

    constructor(angleDegrees: number) {
        this._angleDegrees = angleDegrees;
    }

    public get degrees(): number {
        return this._angleDegrees;
    }

    public get radians(): number {
        return degreeToRadian(this._angleDegrees);
    }

}
