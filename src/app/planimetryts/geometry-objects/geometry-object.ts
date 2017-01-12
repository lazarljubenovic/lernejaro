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

    protected abstract destructToPoints(): Point[];

    protected abstract reconstructFromPoints(...points: Point[]): this;

    protected applyMatrixWithRespectToCenter(matrix: number[][]): this {
        const points = this.destructToPoints();
        points.forEach(point => point.applyMatrix(matrix));
        return this.reconstructFromPoints(...points);
    }

    protected applyMatrixWithRespectTo(matrix: number[][], point: Point): this {
        const {x, y} = point.getCartesianCoordinates();
        return this
            .translate(-x, -y)
            .applyMatrixWithRespectToCenter(matrix)
            .translate(x, y);
    }

    public applyMatrix(matrix: number[][], point?: Point): this {
        if (arguments.length == 1 || point == null) {
            return this.applyMatrixWithRespectToCenter(matrix)
        } else if (arguments.length == 2) {
            return this.applyMatrixWithRespectTo(matrix, point);
        } else {
            throw `Invalid number of arguments for function applyHomogeneousMatrix.
Expected 1 or 2 but given ${arguments.length}`;
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

    public reflectOverLine(line: Line): this {
        if (line.isVertical()) {
            const {A, C} = line.getGeneralForm();
            const x = -C / A;
            return this
                .translateX(-x)
                .stretchX(-1)
                .translateX(x);
        } else {
            const {k, n} = line.getExplicitForm();
            const angle = Math.atan(k);
            return this.translateY(-n)
                .rotate(-angle)
                .stretchY(-1)
                .rotate(angle)
                .translateY(n);
        }
    }

    public radialSymmetry(point: Point, count: number): GeometryObject[] {
        const angle = 2 * Math.PI / count;
        return Array(count).fill(0).map((_, i) => i * angle).map(angle => {
            return this.clone().rotate(angle, point);
        });
    }

}
