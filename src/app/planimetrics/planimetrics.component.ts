import {
    Component,
    OnInit,
    AfterViewInit,
    ViewChild,
    ElementRef,
    Input,
    ChangeDetectionStrategy,
    OnChanges
} from '@angular/core';
import {CanvasRenderer} from '../planimetryts/renderers/canvas-renderer';
import {RendererService} from './renderer.service';
import {GeometryObject} from '../planimetryts/geometry-objects/geometry-object';
import {Point} from '../planimetryts/geometry-objects/point';
import {areEqualFloats} from '../planimetryts/util';

function getCursorPosition(canvas, event): {x: number, y: number} {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    return {x, y};
}

@Component({
    selector: 'lrn-planimetrics',
    templateUrl: './planimetrics.component.html',
    styleUrls: ['./planimetrics.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanimetricsComponent implements OnInit, AfterViewInit, OnChanges {

    @Input() public objects: Set<GeometryObject>;

    public getPointAt(x: number, y: number, eps: number = 6): Point {
        return <Point>Array.from(this.objects)
            .filter(object => object.kind == 'point')
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
        this.renderer.render(this.objects);
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.canvas = this.canvasRef.nativeElement;
        this.canvas.width = 600;
        this.canvas.height = 600; // TODO
        this.context = this.canvas.getContext('2d');
        this.renderer.setRenderer(new CanvasRenderer(this.context));
        this.render();
    }

    ngOnChanges() {
        if (this.context) {
            this.render();
        }
    }

    public isMouseDown: boolean = false;
    public currentPoint: Point = null;

    public onMouseUp(event: MouseEvent) {
        this.isMouseDown = false;
        this.currentPoint = null;
    }

    public onMouseLeave(event: MouseEvent) {
        this.onMouseUp(event);
    }

    public onMouseDown(event: MouseEvent) {
        this.isMouseDown = true;
        const clickPosition = getCursorPosition(this.canvas, event);
        this.currentPoint = this.getPointAt(clickPosition.x, clickPosition.y);
        console.log('click on', clickPosition.x, clickPosition.y, 'selected', this.currentPoint);
    }

    public onMouseMove(event: MouseEvent) {
        if (this.isMouseDown) {
            if (this.currentPoint) {
                // Drag a point
                this.currentPoint
                    .x(x => x + event.movementX)
                    .y(y => y + event.movementY);
                this.render();
            } else {
                // Move around
                // TODO
            }
        }
    }

}
