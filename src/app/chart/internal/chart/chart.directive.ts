import {
    Directive,
    ElementRef,
    OnInit,
    AfterViewInit,
    Renderer,
    OnChanges,
    HostListener
} from '@angular/core';
import {ChartService} from '../../chart.service';

@Directive({selector: 'lrn-chart-directive-internal'})
export class ChartDirective implements OnInit, AfterViewInit, OnChanges {

    // private canvas: HTMLCanvasElement;

    constructor(private chartService: ChartService,
                public elRef: ElementRef,
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
    }

}
