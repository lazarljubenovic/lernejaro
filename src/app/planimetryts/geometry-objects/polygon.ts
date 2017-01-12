import {GeometryObject} from './geometry-object';
import {Point} from './point';
import * as Chroma from 'chroma-js';
import {Line} from './line';
import {Angle} from './angle';
import {Segment} from './segment';
import {MaterialColor} from './material-colors';
import Color = Chroma.Color;

export class Polygon extends GeometryObject {

    public static FromVertices(...points: Point[]): Polygon {
        return new Polygon(...points);
    }

    protected _vertices: Point[];

    constructor(...points: Point[]) {
        super('polygon');
        this._vertices = points;
    }

    public writeJson() {
        const vertices = this._vertices.map(v => v.getCartesianCoordinates());
        return {
            kind: 'polygon',
            color: this.strokeColor(),
            label: this.label(),
            defaultValue: 'list-of-vertices',
            values: {
                'list-of-vertices': vertices,
            },
        };
    }

    public readJson(json): this {
        this.label(json.label);
        this.strokeColor(json.strokeColor);
        this._vertices = json.values['list-of-vertices'].map(coord => {
            return Point.FromCartesianCoordinates(coord.x, coord.y);
        });
        return this;
    }

    public vertices(): Point[] {
        return this._vertices.map(point => point.clone());
    }

    public segments(): Segment[] {
        let vertices = this.vertices();
        vertices.push(vertices[0]);
        let segments: Segment[] = [];
        for (let i = 0; i < vertices.length - 1; i++) {
            const curr = vertices[i];
            const next = vertices[i + 1];
            const segment = Segment.FromTwoPoints(curr, next);
            segments.push(segment);
        }
        return segments;
    }

    protected copyFrom(polygon: Polygon): this {
        this._vertices = polygon._vertices;
        this._label = polygon._label;
        this._strokeColor = polygon._strokeColor;
        return this;
    }

    public clone(): Polygon {
        const clones = this._vertices.map(p => p.clone());
        return Polygon.FromVertices(...clones)
            .label(this._label)
            .strokeColor(this._strokeColor);
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

    protected destructToPoints(): Point[] {
        return this.vertices().map(v => v.clone());
    }

    protected reconstructFromPoints(...points: Point[]): this {
        this._vertices = points;
        return this;
    }

}
