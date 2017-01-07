import {Renderer} from './renderer';
import {Point} from '../geometry-objects/point';
import {Segment} from '../geometry-objects/segment';
import {Circle} from '../geometry-objects/circle';
import {Line} from '../geometry-objects/line';
import {ConsoleRenderer} from './console-renderer';
import {GeometryObject} from '../geometry-objects/geometry-object';

type Coordinate = {x: number, y: number};

export class CanvasRenderer extends Renderer {

    private secondaryRenderer: Renderer = new ConsoleRenderer();

    private ctx: CanvasRenderingContext2D;

    private topLeft: Coordinate;
    private width: number = 600;
    private height: number = 600;

    constructor(context: CanvasRenderingContext2D) {
        super();
        this.ctx = context;
    }

    protected clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    protected beforeObjectsRender(objects: Set<GeometryObject>) {
        this.clear();
    }

    protected afterObjectsRender(objects: Set<GeometryObject>) {
        //this.secondaryRenderer.render(objects);
    }

    protected renderPoint(point: Point) {
        const x = point.getCartesianCoordinates().x;
        const y = point.getCartesianCoordinates().y;
        this.ctx.save();
        this.ctx.fillStyle = 'white';
        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.arc(x, y, 2, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.restore();
    }

    protected renderLine(line: Line) {
        const top = Line.HorizontalThroughPoint(-1000);
        const bottom = Line.HorizontalThroughPoint(1000);
        const [start, end] = [top, bottom].map(bound => Line.GetIntersection(line, bound));
        this.renderSegment(Segment.FromTwoPoints(start, end));
    }

    protected renderSegment(segment: Segment) {
        const [start, end] = segment.getPoints().map(p => p.getCartesianCoordinates());
        this.ctx.save();
        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.moveTo(start.x, start.y);
        this.ctx.lineTo(end.x, end.y);
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.restore();
        segment.getPoints().forEach(point => this.renderPoint(point));
    }

    protected renderCircle(circle: Circle) {
        const center = circle.center();
        const c = center.getCartesianCoordinates();
        const radius = circle.radius();
        this.ctx.save();
        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.arc(c.x, c.y, radius, 0, 2 * Math.PI);
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.restore();
    }

}
