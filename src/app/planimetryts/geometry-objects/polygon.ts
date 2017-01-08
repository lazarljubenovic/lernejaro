import {GeometryObject} from './geometry-object';
import {Point} from './point';
import Color = Chroma.Color;
import {Line} from './line';
import {Angle} from './angle';

export class Polygon extends GeometryObject {

    public static FromVertices(...points: Point[]): Polygon {
        return new Polygon(...points);
    }

    protected _vertices: Point[];

    constructor(...points: Point[]) {
        super('polygon');
        this._vertices = points;
    }

    public getArea(): number {
        // http://stackoverflow.com/a/717367
        let area = 0;
        const N = this._vertices.length;
        for (let i = 0; i < N; i += 2) {
            const u = this._vertices[i % N].getCartesianCoordinates();
            const v = this._vertices[(i + 1) % N].getCartesianCoordinates();
            const t = this._vertices[(i + 2) % N].getCartesianCoordinates();
            area += v.x * (t.y - u.y) + v.y * (u.x - t.x);
        }
        return area / 2;
    }

    public getAngleAt(vertexIndex: number): Angle {
        throw "TODO";
    }

    public applyMatrix(matrix: number[][]): this {
        throw "TODO Polygon#applyMatrix";
    }

    public radialSymmetry(point: Point): this[] {
        throw "TODO Polygon#radialSymmetry";
    }

    public reflectOverLine(line: Line): this {
        throw "TODO Polygon#reflectOverLine";
    }

    public reflectOverPoint(point: Point): this {
        throw "TODO Polygon#reflectOverPoint";
    }

}
