import {StereometryObject} from '../stereometry-object'
import {areEqualFloats, isZero} from '../../planimetryts/util'
import {Matrix} from '../../planimetryts/geometry-objects/matrix'


export class Point3D extends StereometryObject {

    public static AreEqual(point1: Point3D, point2: Point3D): boolean {
        return areEqualFloats(point1._x, point2._x)
            && areEqualFloats(point1._y, point2._y)
            && areEqualFloats(point1._z, point2._z)
    }

    public static FromCartesianCoordinates(x: number, y: number, z: number): Point3D {
        return new Point3D(x, y, z)
    }

    public static FromSphericalCoordinates(ρ: number, θ: number, φ: number): Point3D {
        throw 'todo' // TODO
    }

    /**
     * Works for both regular and homogeneous matrix coordinates.
     * @param matrix
     * @param label
     * @returns {Point}
     * @constructor
     */
    public static FromMatrix(matrix: number[][]): Point3D {
        const x = matrix[0][0]
        const y = matrix[1][0]
        const z = matrix[2][0]
        let w
        if (matrix.length == 3) {
            w = 1
        } else {
            w = matrix[3][0]
        }
        return Point3D.FromCartesianCoordinates(x / w, y / w, z / w)
    }

    public static Negative(point: Point3D): Point3D {
        return new Point3D(-point._x, -point._y, -point._z)
    }

    public static Add(point1: Point3D, point2: Point3D): Point3D {
        return new Point3D(point1._x + point2._x, point1._y + point2._y, point1._z + point2._z)
    }

    public static Subtract(point1: Point3D, point2: Point3D): Point3D {
        return Point3D.Add(point1, Point3D.Negative(point2))
    }

    public static DotProduct(vector1: Point3D, vector2: Point3D): number {
        return vector1._x * vector2._x + vector1._y * vector2._y + vector1._z * vector2._z
    }

    public static ScalarProduct(vector1: Point3D, vector2: Point3D): number {
        return Point3D.DotProduct(vector1, vector2)
    }

    public static CrossProduct(vector1: Point3D, vector2: Point3D): Point3D {
        const u = vector1.getCartesianCoordinates()
        const v = vector2.getCartesianCoordinates()
        const i = u.y * v.z - u.z * v.y
        const j = u.x * v.z - u.z * v.x
        const k = u.x * v.y - u.y * v.x
        return Point3D.FromCartesianCoordinates(i, j, k)
    }

    public static VectorProduct(vector1: Point3D, vector2: Point3D): Point3D {
        return Point3D.CrossProduct(vector1, vector2)
    }


    public static GetDistanceBetween(point1: Point3D, point2: Point3D): number {
        const dx = point1._x - point2._x
        const dy = point1._y - point2._y
        const dz = point1._z - point2._z
        return Math.sqrt(dx * dx + dy * dy + dz * dz)
    }

    public static GetPointAtRatio(point1: Point3D, point2: Point3D,
                                  m: number, n: number = 1): Point3D {
        const x = (n * point1._x + m * point2._x) / (m + n)
        const y = (n * point1._y + m * point2._y) / (m + n)
        const z = (n * point1._z + m * point2._z) / (m + n)
        return Point3D.FromCartesianCoordinates(x, y, z)
    }

    public static GetPointBetween(point1: Point3D, point2: Point3D): Point3D {
        throw 'todo' // TODO
        // return Point.GetPointAtRatio(point1, point2, 1, 1);
    }

    // TODO
    // public static GetDistanceBetweenLineAndPoint(line: Line, point: Point3D): number {
    // return Line.GetDistanceBetweenLineAndPoint(line, point);
    // }

    public static AreCollinearVectors(vector1: Point3D, vector2: Point3D): boolean {
        // const dx = vector1._x / vector2._x;
        // const dy = vector1._y / vector2._y;
        // const dz = vector1._z / vector2._z;
        // return areEqualFloats(dx, dy) && areEqualFloats(dy, dz);
        return isZero(Point3D.VectorProduct(vector1, vector2).norm())
    }

    public static AreOrthogonalVectors(vector1: Point3D, vector2: Point3D): boolean {
        return isZero(Point3D.ScalarProduct(vector1, vector2))
    }

    public static AsVectorFromTwoPoints(start: Point3D, end: Point3D): Point3D {
        return Point3D.Subtract(end, start)
    }

    public static CENTER: Point3D = Point3D.FromCartesianCoordinates(0, 0, 0)

    protected _x: number
    protected _y: number
    protected _z: number

    protected constructor(x: number, y: number, z: number) {
        super('point')
        this._x = x
        this._y = y
        this._z = z
        return this
    }

    public x(): number;
    public x(x: number): this;
    public x(fn: (x: number) => number): this;
    public x(x?: number | ((x: number) => number)): this | number {
        if (x == null) {
            return this._x
        } else {
            if (typeof x == 'number') {
                this._x = x
            } else {
                this._x = x(this._x)
            }
            return this
        }
    }

    public y(): number;
    public y(y: number): this;
    public y(fn: (y: number) => number): this;
    public y(y?: number | ((y: number) => number)): this | number {
        if (y == null) {
            return this._y
        } else {
            if (typeof y == 'number') {
                this._y = y
            } else {
                this._y = y(this._y)
            }
            return this
        }
    }

    public z(): number;
    public z(z: number): this;
    public z(fn: (z: number) => number): this;
    public z(z?: number | ((z: number) => number)): this | number {
        if (z == null) {
            return this._z
        } else {
            if (typeof z == 'number') {
                this._z = z
            } else {
                this._z = z(this._z)
            }
            return this
        }
    }

    public copyValuesFrom(point: Point3D): this {
        this._x = point._x
        this._y = point._y
        this._z = point._z
        return this
    }

    protected cloneValues(): this {
        const {x, y, z} = this.getCartesianCoordinates()
        return <this>Point3D.FromCartesianCoordinates(x, y, z)
    }

    public getCartesianCoordinates(): {x: number, y: number, z: number} {
        return {
            x: this._x,
            y: this._y,
            z: this._z,
        }
    }

    public getNonHomogeneousMatrixCoordinates(): [[number], [number], [number]] {
        return [[this._x], [this._y], [this._z]]
    }

    public getHomogeneousMatrixCoordinates(): [[number], [number], [number], [number]] {
        return [[this._x], [this._y], [this._z], [1]]
    }

    public getMatrixCoordinates(homogeneous: boolean = true): number[][] {
        if (homogeneous) {
            return this.getHomogeneousMatrixCoordinates()
        } else {
            return this.getNonHomogeneousMatrixCoordinates()
        }
    }

    protected destructToPoints(): Point3D[] {
        return [this.cloneValues()]
    }

    protected reconstructFromPoints(...points: Point3D[]): this {
        const point = points[0]
        this._x = point._x
        this._y = point._y
        this._z = point._z
        return this
    }

    protected applyMatrixWithRespectToCenter(matrix: number[][]): this {
        const [n, m] = Matrix.GetDimensions(matrix)
        let isHomogeneous: boolean
        if (n == 3 && m == 3) {
            isHomogeneous = false
        } else if (n == 4 && m == 4) {
            isHomogeneous = true
        } else {
            throw `Matrix needs to be 3×3 or 4×4 Given matrix is ${n}×${m} and equals ${matrix}`
        }
        const matrixCoordinates = this.getMatrixCoordinates(isHomogeneous)
        const newMatrix = Matrix.Multiply(matrix, matrixCoordinates)
        const newPoint = Point3D.FromMatrix(newMatrix)
        return this.copyFrom(newPoint)
    }

    public norm(): number {
        return Point3D.GetDistanceBetween(Point3D.CENTER, this)
    }

}
