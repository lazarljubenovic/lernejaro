import {Renderer} from './renderer';
import {Point} from '../geometry-objects/point';
import {Segment} from '../geometry-objects/segment';
import {Circle} from '../geometry-objects/circle';
import {Line} from '../geometry-objects/line';

type Coordinate = {x: number, y: number};

export class ConsoleRenderer extends Renderer {

    private ctx: CanvasRenderingContext2D;

    public renderPoint(point: Point) {
        const p = point.getCartesianCoordinates();
        console.log(`Point ${point.label()} (${p.x}, ${p.y})`);
    }

    public renderLine(line: Line) {
        const l = line.getGeneralForm();
        console.log(`Line ${l.A}x + ${l.B}y + ${l.C} = 0`);
    }

    public renderSegment(segment: Segment) {
        const s = segment.getPoints().map(p => p.getCartesianCoordinates());
        console.log(`Segment from (${s[0].x}, ${s[0].y}) to (${s[1].x}, ${s[1].y})`);
    }

    public renderCircle(circle: Circle) {
        const c = circle.center().getCartesianCoordinates();
        const r = circle.radius();
        console.log(`Circle with center at (${c.x}, ${c.y}) and radius of ${r}`);
    }

}
