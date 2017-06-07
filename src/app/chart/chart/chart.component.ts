import {
    Component,
    OnInit,
    Input,
    ElementRef,
    ViewChild,
    ViewEncapsulation,
    Self,
    ContentChildren,
    QueryList,
    AfterViewInit,
    Optional
} from '@angular/core'
import {ChartService} from '../chart.service'
import {ChartDirective} from '../internal/chart/chart.directive'
import {ChartStrategyBase} from '../directives/chart-strategy-base'
import {ChartDataDirective} from '../chart-data.directive'

@Component({
    selector: 'lrn-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [ChartService],
})
export class ChartComponent implements OnInit, AfterViewInit {

    @Input() public title: string
    @Input() public displayLegend: boolean = false
    @Input() public titlePosition: 'above' | 'below' = 'above'
    @Input() public legendPosition: 'left' | 'right' = 'right'

    // We need this for the legend
    @ContentChildren(ChartDataDirective)
    public data: QueryList<ChartDataDirective>

    @ViewChild(ChartDirective)
    public chartDirective: ChartDirective

    @ViewChild('chart')
    public chartDiv: ElementRef

    private canvas: HTMLCanvasElement

    protected prepare(): void {
        const element = this.chartDirective.elRef.nativeElement
        // create canvas if it doesn't exist
        let canvas: HTMLCanvasElement = element.getElementsByTagName('canvas')[0]
        if (!canvas) {
            canvas = document.createElement('canvas')
        }
        this.canvas = canvas
        const rect = this.chartDiv.nativeElement.getBoundingClientRect()
        const {width, height} = {width: rect.right - rect.left, height: rect.bottom - rect.top}
        this.canvas.width = width
        this.canvas.height = height
        element.appendChild(this.canvas)
    }

    constructor(private chartService: ChartService,
                private elRef: ElementRef,
                // TODO No idea why AOT fails without optional
                @Self() @Optional() private strategy: ChartStrategyBase) {
        if (!strategy) {
            throw new Error(`You have to specify what kind of chart you want to render.`)
        }
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.prepare()
            this.strategy.canvas = this.canvas
            this.strategy.render()
            this.strategy.isReady = true

            this.chartService.reRender$.subscribe(() => {
                this.strategy.render()
            })

            this.chartService.sizeChange$.subscribe(() => {
                this.prepare()
                this.strategy.render()
            })
        })
    }

}
