import {Line} from './line';
import {Point} from './point';
import {Matrix} from './matrix';
import {MaterialColor} from './material-colors';

export abstract class GeometryObject {

    protected _color: MaterialColor;
    protected _label: string;

    constructor(public kind: string) {
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

    public color(): MaterialColor;
    public color(color: MaterialColor): this;
    public color(color?: MaterialColor): this | MaterialColor {
        if (this.color == null) {
            return this._color;
        } else {
            this._color = color;
            return this;
        }
    }

    protected abstract copyFrom(object: GeometryObject): this;

    public abstract clone(): GeometryObject;

    public abstract applyMatrix(matrix: number[][]): this;

    public abstract applyHomogeneousMatrix(matrix: number[][]): this;

    public translateX(dx: number): this {
        return this.applyHomogeneousMatrix(Matrix.Homogeneous.TranslateX(dx));
    }

    public translateY(dy: number): this {
        return this.applyHomogeneousMatrix(Matrix.Homogeneous.TranslateY(dy));
    }

    public translate(dx: number, dy: number): this {
        return this.applyHomogeneousMatrix(Matrix.Homogeneous.Translate(dx, dy));
    }

    public stretchX(k: number): this {
        return this.applyMatrix(Matrix.StretchX(k));
    }

    public stretchY(k: number): this {
        return this.applyMatrix(Matrix.StretchY(k));
    }

    public stretch(k: number): this {
        return this.applyMatrix(Matrix.Stretch(k));
    }

    public rotate(θ: number): this {
        return this.applyMatrix(Matrix.Rotate(θ));
    }

    public shearX(k: number): this {
        return this.applyMatrix(Matrix.ShearX(k));
    }

    public shearY(k: number): this {
        return this.applyMatrix(Matrix.ShearY(k));
    }

    public abstract reflectOverPoint(point: Point): this;

    public abstract reflectOverLine(line: Line): this;

    public abstract radialSymmetry(point: Point, count: number): this[];

}
