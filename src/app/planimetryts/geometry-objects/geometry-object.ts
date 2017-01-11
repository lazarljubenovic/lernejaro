import {Line} from './line';
import {Point} from './point';
import {Matrix} from './matrix';
import {MaterialColor} from './material-colors';

export abstract class GeometryObject {

    protected _color: MaterialColor;
    protected _label: string;

    constructor(public kind: string) {
    }

    public abstract readJson(json): this;

    public abstract writeJson();

    public label(): string;
    public label(label: string): this;
    public label(label?: string): string | this {
        if (arguments.length == 0) {
            return this._label;
        } else {
            this._label = label;
            return this;
        }
    }

    public color(): MaterialColor;
    public color(color: MaterialColor): this;
    public color(color?: MaterialColor): this | MaterialColor {
        if (arguments.length == 0) {
            return this._color;
        } else {
            this._color = color;
            return this;
        }
    }

    protected abstract copyFrom(object: GeometryObject): this;

    public abstract clone(): GeometryObject;

    public abstract applyMatrix(matrix: number[][]): this;

    protected abstract applyHomogeneousMatrixWithRespectToCenter(matrix: number[][]): this;

    protected applyHomogeneousMatrixWithRespectTo(matrix: number[][], center: Point): this {
        const {x, y} = center.getCartesianCoordinates();
        return this.translate(-x, -y).applyHomogeneousMatrix(matrix).translate(x, y);
    }

    public applyHomogeneousMatrix(matrix: number[][], center?: Point): this {
        if (arguments.length == 1 || center == null) {
            return this.applyHomogeneousMatrixWithRespectToCenter(matrix)
        } else if (arguments.length == 2) {
            return this.applyHomogeneousMatrixWithRespectTo(matrix, center);
        } else {
            throw `Invalid number of arguments for function applyHomogeneousMatrix.
Expected 1 or 2 but given ${arguments.length}`;
        }
    }

    public translateX(dx: number): this {
        return this.applyHomogeneousMatrix(Matrix.Homogeneous.TranslateX(dx));
    }

    public translateY(dy: number): this {
        return this.applyHomogeneousMatrix(Matrix.Homogeneous.TranslateY(dy));
    }

    public translate(dx: number, dy: number): this {
        return this.applyHomogeneousMatrix(Matrix.Homogeneous.Translate(dx, dy));
    }

    public stretchX(k: number, point?: Point): this {
        return this.applyHomogeneousMatrix(Matrix.Homogeneous.StretchX(k), point);
    }

    public stretchY(k: number, point?: Point): this {
        return this.applyHomogeneousMatrix(Matrix.Homogeneous.StretchY(k), point);
    }

    public stretch(k: number, point?: Point): this {
        return this.applyHomogeneousMatrix(Matrix.Homogeneous.Stretch(k), point);
    }

    public rotate(θ: number, point?: Point): this {
        return this.applyHomogeneousMatrix(Matrix.Homogeneous.Rotate(θ), point);
    }

    public shearX(k: number, point?: Point): this {
        return this.applyHomogeneousMatrix(Matrix.Homogeneous.ShearX(k), point);
    }

    public shearY(k: number, point?: Point): this {
        return this.applyHomogeneousMatrix(Matrix.Homogeneous.ShearY(k), point);
    }

    public abstract reflectOverPoint(point: Point): this;

    public abstract reflectOverLine(line: Line): this;

    public abstract radialSymmetry(point: Point, count: number): this[];

}
