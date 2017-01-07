import {Renderer} from './renderer';
import {Point} from '../geometry-objects/point';
import {Segment} from '../geometry-objects/segment';
import {Circle} from '../geometry-objects/circle';
import {Line} from '../geometry-objects/line';

type Coordinate = {x: number, y: number};

export class CanvasRenderer extends Renderer {

    private ctx: CanvasRenderingContext2D;

    private circlePath: Path2D;
    private topLeft: Coordinate;
    private width: number;
    private height: number;

    constructor(context: CanvasRenderingContext2D) {
        super();
        this.ctx = context;
    }

    public renderPoint(point: Point) {

    }

    public renderLine(line: Line) {

    }

    public renderSegment(segment: Segment) {

    }

    public renderCircle(circle: Circle) {

    }

}
