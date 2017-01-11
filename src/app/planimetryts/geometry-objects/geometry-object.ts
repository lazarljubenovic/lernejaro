import {Line} from './line';
import {Point} from './point';
import {Matrix} from './matrix';
import {MaterialColor} from './material-colors';

export abstract class GeometryObject {

    protected _strokeColor: MaterialColor;
    protected _fillColor: MaterialColor;
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

    public strokeColor(): MaterialColor;
    public strokeColor(color: MaterialColor): this;
    public strokeColor(color?: MaterialColor): this | MaterialColor {
        if (arguments.length == 0) {
            return this._strokeColor;
        } else {
            this._strokeColor = color;
            return this;
        }
    }

    public fillColor(): MaterialColor;
    public fillColor(fillColor: MaterialColor): this;
    public fillColor(fillColor?: MaterialColor): MaterialColor | this {
        if (arguments.length == 0) {
            return this._fillColor;
        } else {
            this._fillColor = fillColor;
            return this;
        }
    }

    protected abstract copyFrom(object: GeometryObject): this;

    public abstract clone(): GeometryObject;

    // region Non Homogeneous

    protected abstract applyNonHomogeneousMatrixWithRespectToCenter(matrix: number[][]): this;

    protected applyNonHomogeneousMatrixWithRespectTo(matrix: number[][], point: Point): this {
        const {x, y} = point.getCartesianCoordinates();
        return this
            .translate(-x, -y)
            .applyNonHomogeneousMatrixWithRespectToCenter(matrix)
            .translate(x, y);
    }

    protected applyNonHomogeneousMatrix(matrix, point?: Point): this {
        if (arguments.length == 1 || point == null) {
            return this.applyNonHomogeneousMatrixWithRespectToCenter(matrix)
        } else if (arguments.length == 2) {
            return this.applyNonHomogeneousMatrixWithRespectTo(matrix, point);
        } else {
            throw `Invalid number of arguments for function applyHomogeneousMatrix.
Expected 1 or 2 but given ${arguments.length}`;
        }
    }

    // endregion

    // region Homogeneous

    protected abstract applyHomogeneousMatrixWithRespectToCenter(matrix: number[][]): this;

    protected applyHomogeneousMatrixWithRespectTo(matrix: number[][], point: Point): this {
        const {x, y} = point.getCartesianCoordinates();
        return this
            .translate(-x, -y)
            .applyHomogeneousMatrixWithRespectToCenter(matrix)
            .translate(x, y);
    }

    protected applyHomogeneousMatrix(matrix: number[][], point?: Point): this {
        if (arguments.length == 1 || point == null) {
            return this.applyHomogeneousMatrixWithRespectToCenter(matrix)
        } else if (arguments.length == 2) {
            return this.applyHomogeneousMatrixWithRespectTo(matrix, point);
        } else {
            throw `Invalid number of arguments for function applyHomogeneousMatrix.
Expected 1 or 2 but given ${arguments.length}`;
        }
    }

    // endregion

    public applyMatrix(matrix: number[][], point?: Point): this {
        const [n, m] = Matrix.GetDimensions(matrix);
        if (n == 2 && m == 2) {
            return this.applyNonHomogeneousMatrix(matrix, point);
        } else if (n == 3 && m == 3) {
            return this.applyHomogeneousMatrix(matrix, point);
        } else {
            throw `Matrix needs to be 2×2 or 3×3. Given matrix is ${matrix}`;
        }
    }

    public translateX(dx: number): this {
        return this.applyMatrix(Matrix.Homogeneous.TranslateX(dx));
    }

    public translateY(dy: number): this {
        return this.applyMatrix(Matrix.Homogeneous.TranslateY(dy));
    }

    public translate(dx: number, dy: number): this {
        return this.applyMatrix(Matrix.Homogeneous.Translate(dx, dy));
    }

    public stretchX(k: number, point?: Point): this {
        return this.applyMatrix(Matrix.Homogeneous.StretchX(k), point);
    }

    public stretchY(k: number, point?: Point): this {
        return this.applyMatrix(Matrix.Homogeneous.StretchY(k), point);
    }

    public stretch(k: number, point?: Point): this {
        return this.applyMatrix(Matrix.Homogeneous.Stretch(k), point);
    }

    public rotate(θ: number, point?: Point): this {
        return this.applyMatrix(Matrix.Homogeneous.Rotate(θ), point);
    }

    public shearX(k: number, point?: Point): this {
        return this.applyMatrix(Matrix.Homogeneous.ShearX(k), point);
    }

    public shearY(k: number, point?: Point): this {
        return this.applyMatrix(Matrix.Homogeneous.ShearY(k), point);
    }

    public reflectOverPoint(point: Point): this {
        return this.stretch(-1, point);
    }

    public abstract reflectOverLine(line: Line): this;

    public abstract radialSymmetry(point: Point, count: number): this[];

}
