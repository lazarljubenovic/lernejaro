import {
    Component,
    OnInit,
    AfterViewInit,
    ViewChild,
    ElementRef,
    Input,
    ChangeDetectionStrategy, OnChanges
} from '@angular/core';
import {CanvasRenderer} from '../planimetryts/renderers/canvas-renderer';
import {RendererService} from './renderer.service';
import {GeometryObject} from '../planimetryts/geometry-objects/geometry-object';

@Component({
    selector: 'lrn-planimetrics',
    templateUrl: './planimetrics.component.html',
    styleUrls: ['./planimetrics.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanimetricsComponent implements OnInit, AfterViewInit, OnChanges {

    @Input() public objects: Set<GeometryObject>;

    @ViewChild('canvas') public canvas: ElementRef;

    public context: CanvasRenderingContext2D;

    constructor(private renderer: RendererService) {
    }

    private render() {
        this.renderer.render(this.objects);
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.context = this.canvas.nativeElement.getContext('2d');
        this.renderer.setRenderer(new CanvasRenderer(this.context));
        // this.renderer.setRenderer(new ConsoleRenderer());
        this.render();
    }

    ngOnChanges() {
        if (this.context) {
            this.render();
        }
    }

}
