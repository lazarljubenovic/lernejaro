import {
    Component,
    OnInit,
    AfterViewInit,
    ViewChild,
    ElementRef,
    Input,
    ChangeDetectionStrategy,
    OnChanges,
    Output,
    EventEmitter
} from '@angular/core';
import {CanvasRenderer} from '../planimetryts/renderers/canvas-renderer';
import {RendererService} from './renderer.service';
import {GeometryObject} from '../planimetryts/geometry-objects/geometry-object';
import {Point} from '../planimetryts/geometry-objects/point';
import {areEqualFloats} from '../planimetryts/util';

@Component({
    selector: 'lrn-planimetrics',
    templateUrl: './planimetrics.component.html',
    styleUrls: ['./planimetrics.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanimetricsComponent implements OnInit, AfterViewInit, OnChanges {

    @Input() public objects: Set<GeometryObject>;
    @Input() public interactivePoints: Point[];

    @Output() public interactivePointsChange = new EventEmitter<Point[]>();

    public getPointAt(x: number, y: number, eps: number = 6): Point {
        return this.interactivePoints
            .filter((point: Point) => {
                return areEqualFloats(point.x(), x, eps)
                    && areEqualFloats(point.y(), y, eps);
            })
            .slice(-1)[0];
    }

    @ViewChild('canvas') public canvasRef: ElementRef;

    public context: CanvasRenderingContext2D;
    public canvas: HTMLCanvasElement;

    constructor(private renderer: RendererService) {
    }

    private render() {
        this.interactivePoints.forEach(point => this.objects.add(point));
        this.renderer.render(this.objects);
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.canvas = this.canvasRef.nativeElement;
        this.canvas.width = 600;
        this.canvas.height = 600; // TODO
        this.context = this.canvas.getContext('2d');
        this.renderer.setRenderer(new CanvasRenderer(this.canvas));
        this.renderer.mouseDown$.subscribe(this.onMouseDown.bind(this));
        this.renderer.mouseDrag$.subscribe(this.onMouseDrag.bind(this));
        this.renderer.mouseUp$.subscribe(this.onMouseUp.bind(this));
        this.render();
    }

    ngOnChanges() {
        if (this.context) {
            this.render();
        }
    }

    private currentPoint: Point = null;

    private onMouseUp(position: Coordinate) {
        this.currentPoint = null;
    }

    private onMouseDown(position: Coordinate) {
        const {x, y} = position;
        console.log('click', position.x, position.y);
        this.currentPoint = this.getPointAt(x, y);
    }

    private onMouseDrag(offset: {logic: Offset, canvas: Offset}) {
        if (this.currentPoint != null) {
            const {dx, dy} = offset.logic;
            this.currentPoint.x(x => x + dx).y(y => y + dy);
            this.interactivePointsChange.emit(this.interactivePoints);
        } else {
            const {dx, dy} = offset.canvas;
            this.renderer.move(dx, dy);
            this.render();
        }
    }

}
