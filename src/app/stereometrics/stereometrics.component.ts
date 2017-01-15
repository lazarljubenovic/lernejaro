import {Component, OnInit, Input, EventEmitter, Output, ElementRef, ViewChild} from '@angular/core';
import {StereometryObject} from '../stereometryts/stereometry-object';
import {Point3D} from '../stereometryts/objects/point-3d';
import {RendererService} from './renderer.service';
import {CanvasRenderer3D} from '../stereometryts/renderers/canvas-renderer-3d';

@Component({
    selector: 'lrn-stereometrics',
    templateUrl: './stereometrics.component.html',
    styleUrls: ['./stereometrics.component.scss']
})
export class StereometricsComponent implements OnInit {

    @Input() public objects: StereometryObject[];
    @Input() public interactivePoints: Point3D[];

    @Output() public interactivePointsChange = new EventEmitter<Point3D[]>();

    @ViewChild('canvas') public canvasRef: ElementRef;

    public context: CanvasRenderingContext2D;

    constructor(private renderer: RendererService) {
    }

    private render() {
        this.objects = this.objects.concat(...this.interactivePoints);
        const set = new Set();
        this.objects.forEach(o => set.add(o));
        this.renderer.render(Array.from(set));
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        const canvas: HTMLCanvasElement = this.canvasRef.nativeElement;
        canvas.width = 600;
        canvas.height = 600;
        this.context = canvas.getContext('2d');
        this.renderer.setRenderer(new CanvasRenderer3D(canvas));
        // TODO: Register events here
        this.render();
    }

}
