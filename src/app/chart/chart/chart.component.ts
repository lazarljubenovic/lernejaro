import {
    Component,
    OnInit,
    Input,
    ElementRef,
    Renderer,
    ViewChild,
    ViewEncapsulation,
    Self
} from '@angular/core';
import {ChartService} from '../chart.service';
import {ChartDirective} from '../internal/chart/chart.directive';
import {ChartStrategyBase} from '../directives/chart-strategy-base';

@Component({
    selector: 'lrn-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [ChartService],
})
export class ChartComponent implements OnInit {

    @Input() public title: string;
    @Input() public displayLegend: boolean = false;
    @Input() public titlePosition: 'above' | 'below' = 'above';
    @Input() public legendPosition: 'left' | 'right' = 'right';

    @ViewChild(ChartDirective)
    public chartDirective: ChartDirective;

    @ViewChild('chart')
    public chartDiv: ElementRef;

    private canvas: HTMLCanvasElement;

    protected prepare(): void {
        const element = this.chartDirective.elRef.nativeElement;
        // create canvas if it doesn't exist
        let canvas: HTMLCanvasElement = element.getElementsByTagName('canvas')[0];
        if (!canvas) {
            canvas = document.createElement('canvas');
        }
        this.canvas = canvas;
        const rect = this.chartDiv.nativeElement.getBoundingClientRect();
        const {width, height} = {width: rect.right - rect.left, height: rect.bottom - rect.top};
        this.canvas.width = width;
        this.canvas.height = height;
        element.appendChild(this.canvas);
    }

    constructor(private chartService: ChartService,
                private elRef: ElementRef,
                @Self() private strategy: ChartStrategyBase) {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.prepare();
            this.strategy.canvas = this.canvas;
            this.strategy.render();
            this.strategy.isReady = true;

            this.chartService.reRender$.subscribe(() => {
                this.strategy.render()
            });

            this.chartService.sizeChange$.subscribe(() => {
                this.prepare();
                this.strategy.render();
            });
        });
    }

}
