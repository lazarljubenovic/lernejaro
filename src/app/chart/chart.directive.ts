import {
    Directive,
    Input,
    ElementRef,
    OnInit,
    AfterViewInit,
    Renderer,
    OnChanges, HostListener
} from '@angular/core';
import {ChartService} from './chart.service';

@Directive({
    selector: 'lrn-chart',
    providers: [
        ChartService,
    ],
})
export class ChartDirective implements OnInit, AfterViewInit, OnChanges {

    @Input() public displayLegend: boolean = false;
    @Input() public titlePosition: 'above' | 'below' = 'above';
    @Input() public legendPosition: 'left' | 'right' = 'right';

    private canvas: HTMLCanvasElement;

    constructor(private chartService: ChartService,
                private elRef: ElementRef,
                private renderer: Renderer) {
    }

    @HostListener('window:resize')
    public onWindowResize() {
        this.chartService.onSizeChange();
    }

    ngOnInit() {
        const el = this.elRef.nativeElement;
        this.renderer.setElementStyle(el, 'display', 'block');
        this.renderer.setElementStyle(el, 'width', '100%');
        this.renderer.setElementStyle(el, 'height', '100%');
    }

    ngOnChanges() {

    }

    ngAfterViewInit() {
        this.canvas = this.elRef.nativeElement.getElementsByTagName('canvas')[0];

    }

}
