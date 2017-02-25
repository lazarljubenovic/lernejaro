import {MaterialColor} from '../planimetryts/geometry-objects/material-colors';
import {Point3D} from './objects/point-3d';
import {Matrix} from '../planimetryts/geometry-objects/matrix';

function ViewData() {
    return function (target: StereometryObject, key: string) {
        const targetAny = target as any;
        if (!targetAny.$$viewData) {
            targetAny.$$viewData = [];
        }
        targetAny.$$viewData.push(key);
    };
}

export abstract class StereometryObject {

    public $$viewData: string[]; // Populated by the decorator

    @ViewData() protected _strokeColor: MaterialColor;
    @ViewData() protected _label: string;

    protected constructor(public kind: string) {
    }

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

    public copyViewDataFrom(object: StereometryObject): this {
        object.$$viewData.forEach(key => {
            this[key] = object[key];
        });
        return this;
    }

    public abstract copyValuesFrom(object: StereometryObject): this;

    public copyFrom(object: StereometryObject): this {
        return this.copyViewDataFrom(object).copyValuesFrom(object);
    }

    protected abstract cloneValues(): this;

    public clone(): this {
        const valueClone: this = this.cloneValues();
        valueClone.copyViewDataFrom(this);
        return valueClone;
    }

    protected abstract destructToPoints(): Point3D[];

    protected abstract reconstructFromPoints(...points: Point3D[]): this;

    protected applyMatrixWithRespectToCenter(matrix: number[][]): this {
        const points = this.destructToPoints();
        points.forEach(point => point.applyMatrix(matrix));
        return this.reconstructFromPoints(...points);
    }

    protected applyMatrixWithRespectTo(matrix: number[][], point: Point3D): this {
        const {x, y, z} = point.getCartesianCoordinates();
        return this
            .translate(-x, -y, -z)
            .applyMatrixWithRespectToCenter(matrix)
            .translate(x, y, z);
    }

    public applyMatrix(matrix: number[][], point?: Point3D): this {
        if (arguments.length == 1 || point == null) {
            return this.applyMatrixWithRespectToCenter(matrix);
        } else if (arguments.length == 2) {
            return this.applyMatrixWithRespectTo(matrix, point);
        } else {
            throw `Invalid number of arguments for function applyHomogeneousMatrix.
Expected 1 or 2 but given ${arguments.length}`;
        }
    }

    public translateX(dx: number): this {
        return this.applyMatrix(Matrix.ThreeD.Homogeneous.TranslateX(dx));
    }

    public translateY(dy: number): this {
        return this.applyMatrix(Matrix.ThreeD.Homogeneous.TranslateY(dy));
    }

    public translateZ(dz: number): this {
        return this.applyMatrix(Matrix.ThreeD.Homogeneous.TranslateZ(dz));
    }

    public translate(dx: number, dy: number, dz: number): this {
        return this.applyMatrix(Matrix.ThreeD.Homogeneous.Translate(dx, dy, dz));
    }

    public stretchX(k: number, point?: Point3D): this {
        return this.applyMatrix(Matrix.ThreeD.Homogeneous.ScaleX(k), point);
    }

    public stretchY(k: number, point?: Point3D): this {
        return this.applyMatrix(Matrix.ThreeD.Homogeneous.ScaleY(k), point);
    }

    public stretchZ(k: number, point?: Point3D): this {
        return this.applyMatrix(Matrix.ThreeD.Homogeneous.ScaleZ(k), point);
    }

    public stretch(k: number, point?: Point3D): this {
        return this.applyMatrix(Matrix.ThreeD.Homogeneous.Scale(k), point);
    }

    public rotateX(θ: number, point?: Point3D): this {
        return this.applyMatrix(Matrix.ThreeD.Homogeneous.RotateX(θ), point);
    }

    public rotateY(θ: number, point?: Point3D): this {
        return this.applyMatrix(Matrix.ThreeD.Homogeneous.RotateY(θ), point);
    }

    public rotateZ(θ: number, point?: Point3D): this {
        return this.applyMatrix(Matrix.ThreeD.Homogeneous.RotateZ(θ), point);
    }

}
