import {Renderer} from './renderer';
import {Point} from '../geometry-objects/point';
import {Segment} from '../geometry-objects/segment';
import {Circle} from '../geometry-objects/circle';
import {Line} from '../geometry-objects/line';
import {ConsoleRenderer} from './console-renderer';
import {GeometryObject} from '../geometry-objects/geometry-object';
import {Matrix} from '../geometry-objects/matrix';
import {Subject} from 'rxjs';
import {Polygon} from '../geometry-objects/polygon';
import {MaterialColor} from './color';
import {MaterialColor as MaterialColorEnum} from '../geometry-objects/material-colors';


function getCursorPosition(canvas, event): Coordinate {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    return {x, y};
}

export class CanvasRenderer extends Renderer {

    private secondaryRenderer: Renderer = new ConsoleRenderer();
    private getColor = MaterialColor;

    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    private topLeft: Coordinate;
    private width: number = 600;
    private height: number = 600;

    private _drawAxis: boolean = false;
    private _drawGrid: boolean = false;

    private _gridLines: Set<Line>;

    private _appliedMatrix: number[][];
    private _inverseMatrix: number[][];

    public get appliedMatrix(): number[][] {
        return [...this._appliedMatrix.map(el => [...el])];
    }

    public get inverseMatrix(): number[][] {
        return [...this._inverseMatrix.map(el => [...el])];
    }

    private setIdentityMatrix() {
        this._appliedMatrix = this._inverseMatrix = Matrix.GetIdentity(3);
    }

    public applyMatrix(matrix: number[][], leftMul: boolean = true): this {
        const inverse = Matrix.HomogeneousInverse(matrix);
        if (leftMul) {
            this._appliedMatrix = Matrix.Multiply(matrix, this._appliedMatrix);
            this._inverseMatrix = Matrix.Multiply(this._inverseMatrix, inverse);
        } else {
            this._appliedMatrix = Matrix.Multiply(this._appliedMatrix, matrix);
            this._inverseMatrix = Matrix.Multiply(inverse, this._inverseMatrix);
        }
        return this;
    }

    public move(dx: number, dy: number): this {
        return this.applyMatrix(Matrix.Homogeneous.Translate(dx, dy), true);
    }

    public zoom(value: number): this {
        return this.applyMatrix(Matrix.Homogeneous.Stretch(value), true);
    }

    constructor(canvas: HTMLCanvasElement) {
        super();
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.registerEvents();

        this.setIdentityMatrix();

        this.applyMatrix(Matrix.Homogeneous.StretchY(-1));
        this.applyMatrix(Matrix.Homogeneous.Translate(300, 300));

        this.createGrid();
    }

    // Call this every time user changes grid parameters
    protected createGrid(): void {
        const step = 100; // TODO: Make these parameters configurable
        this._gridLines = new Set<Line>();
        for (let x = -500; x < 500; x += step) {
            this._gridLines.add(Line.VerticalThroughPoint(x));
            this._gridLines.add(Line.HorizontalThroughPoint(x));
        }
    }

    protected drawGrid(): void {
        this._gridLines.forEach(gridLine => this.renderLine(gridLine));
    }

    protected drawAxis(): void {
    }

    protected clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    private viewToLogicCoordinates(point: Coordinate): Coordinate {
        const pointMatrix = [[point.x], [point.y], [1]];
        const newMatrix = Matrix.Multiply(this._inverseMatrix, pointMatrix);
        const x = newMatrix[0][0];
        const y = newMatrix[1][0];
        return {x, y};
    }

    protected beforeObjectsRender(objects: Set<GeometryObject>) {
        this.clear();
        this._drawGrid && this.drawGrid();
        this._drawAxis && this.drawAxis();
    }

    protected renderLabel(label: string, position: Coordinate) {
        if (label == null) {
            return;
        }
        const {x, y} = position;
        this.ctx.font = '12px monospace';
        this.ctx.textBaseline = 'center';
        this.ctx.fillStyle = 'black';
        this.ctx.fillText(label, x, y);
    }

    protected renderPoint(point: Point) {
        const clone = point.clone().applyHomogeneousMatrix(this._appliedMatrix);
        const {x, y} = clone.getCartesianCoordinates();
        this.ctx.save();
        let fillColor = point.color();
        if (!fillColor) {
            fillColor = MaterialColorEnum.BLUE_GREY; // should be class member
        }
        this.ctx.fillStyle = this.getColor(fillColor, 400);
        let strokeColor = point.color();
        if (!strokeColor) {
            strokeColor = MaterialColorEnum.BLUE_GREY; // should be class member
        }
        this.ctx.strokeStyle = this.getColor(strokeColor, 800);
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.arc(x, y, 3, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();
        this.renderLabel(point.label(), {x: x + 10, y: y + 10});
        this.ctx.restore();
    }

    protected renderLine(line: Line): void {
        let from, to;
        if (line.isVertical()) {
            from = Line.HorizontalThroughPoint(-1000);
            to = Line.HorizontalThroughPoint(1000);
        } else {
            from = Line.VerticalThroughPoint(-1000);
            to = Line.VerticalThroughPoint(1000);
        }
        const [start, end]: Point[] = [from, to]
            .map(bound => Line.GetIntersection(line, bound));
        this.renderSegment(Segment.FromTwoPoints(start, end));
    }

    protected renderSegment(segment: Segment): void {
        const clone = segment.clone().applyHomogeneousMatrix(this._appliedMatrix);
        const [start, end] = clone.getPoints().map(point => point.getCartesianCoordinates());
        this.ctx.save();
        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.moveTo(start.x, start.y);
        this.ctx.lineTo(end.x, end.y);
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.restore();
    }

    protected renderCircle(circle: Circle): void {
        const clone = circle.clone().applyHomogeneousMatrix(this._appliedMatrix);
        const c = clone.getGeneralForm();
        this.ctx.save();
        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.arc(c.p, c.q, c.r, 0, 2 * Math.PI);
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.restore();
    }

    protected renderPolygon(polygon: Polygon): void {
        const p = polygon.segments().forEach(segment => {
            this.renderSegment(segment);
        });
    }

    private isMouseDown;

    public mouseDown$ = new Subject<Coordinate>();
    public mouseDrag$ = new Subject<{logic: Offset, canvas: Offset}>();
    public mouseUp$ = new Subject<Coordinate>();

    private registerEvents() {
        this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
        this.canvas.addEventListener('mouseleave', this.onMouseLeave.bind(this));
        this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
        this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
    }

    private onMouseUp(event: MouseEvent): void {
        this.isMouseDown = false;
        const clickPosition = getCursorPosition(this.canvas, event);
        const {x, y} = this.viewToLogicCoordinates(clickPosition);
        this.mouseUp$.next({x, y});
    }

    private onMouseLeave(event: MouseEvent): void {
        this.onMouseUp(event);
    }

    private onMouseDown(event: MouseEvent): void {
        this.isMouseDown = true;
        const clickPosition = getCursorPosition(this.canvas, event);
        const {x, y} = this.viewToLogicCoordinates(clickPosition);
        this.mouseDown$.next({x, y});
    }

    private onMouseMove(event: MouseEvent): void {
        const canvasOffset = {dx: event.movementX, dy: event.movementY};
        const movementStart = {x: event.offsetX, y: event.offsetY};
        const movementEnd = {
            x: movementStart.x + canvasOffset.dx,
            y: movementStart.y + canvasOffset.dy,
        };

        const logicStart = this.viewToLogicCoordinates(movementStart);
        const logicEnd = this.viewToLogicCoordinates(movementEnd);

        const logicOffset = {
            dx: logicEnd.x - logicStart.x,
            dy: logicEnd.y - logicStart.y,
        };
        if (this.isMouseDown) {
            this.mouseDrag$.next({logic: logicOffset, canvas: canvasOffset});
        }
    }

}
