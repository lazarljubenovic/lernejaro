import {degreeToRadian, radianToDegree} from '../util';
import {GeometryObject} from './geometry-object';
import {Point} from './point';
import {Line} from './line';

export enum AngleDecoration {
    NONE,
    LINE,
    DOUBLE_LINE,
    TRIPLE_LINE,
    WAVE,
    DOUBLE_WAVE,
    TRIPLE_WAVE,
}

export class Angle extends GeometryObject {

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

    private _displayLines: boolean = false;
    private _decoration: AngleDecoration = AngleDecoration.NONE;

    constructor(angleDegrees: number) {
        super('angle');
        this._angleDegrees = angleDegrees;
    }

    protected copyFrom(angle: Angle): this {
        this._angleDegrees = angle.degrees;
        this._color = angle.color();
        this._label = angle.label();
        return this;
    }

    public clone(): Angle {
        return Angle.Degrees(this.degrees)
            .displayLines(this._displayLines)
            .decoration(this._decoration);
    }

    public decoration(): AngleDecoration;
    public decoration(decoration: AngleDecoration): this;
    public decoration(decoration?: AngleDecoration): this | AngleDecoration {
        if (arguments.length == 0) {
            return this._decoration;
        } else {
            this._decoration = decoration;
            return this;
        }
    }

    public get degrees(): number {
        return this._angleDegrees;
    }

    public get radians(): number {
        return degreeToRadian(this._angleDegrees);
    }

    public displayLines(value?: boolean): this {
        if (arguments.length == 0) {
            this._displayLines = true;
        } else {
            this._displayLines = value;
        }
        return this;
    }

    public hideLines(): this {
        this._displayLines = false;
        return this;
    }

    public applyHomogeneousMatrix(matrix: number[][]): this {
        throw 'TODO';
    }

    public applyMatrix(matrix: number[][]): this {
        throw 'TODO';
    }

    public radialSymmetry(point: Point): this[] {
        throw 'TODO';
    }

    public reflectOverLine(line: Line): this {
        throw 'TDOO';
    }

    public reflectOverPoint(point: Point): this {
        throw 'TODO';
    }

}
