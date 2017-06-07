import {
    Component,
    OnInit,
    Input,
    ContentChild,
    ViewChild,
    ElementRef,
    AfterViewInit
} from '@angular/core'
import {FlowchartThenComponent} from '../flowchart-then/flowchart-then.component'
import {FlowchartElseComponent} from '../flowchart-else/flowchart-else.component'
import {FlowchartConditionComponent} from '../flowchart-condition/flowchart-condition.component'

@Component({
    selector: 'lrn-flowchart-if',
    templateUrl: './flowchart-if.component.html',
    styleUrls: ['./flowchart-if.component.scss'],
    // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlowchartIfComponent implements OnInit, AfterViewInit {

    @Input() public condition: string

    @ContentChild(FlowchartThenComponent)
    public thenComponent: FlowchartThenComponent

    @ContentChild(FlowchartElseComponent)
    public elseComponent: FlowchartElseComponent

    @ViewChild(FlowchartConditionComponent)
    public conditionComponent: FlowchartConditionComponent

    public blockWidth: number
    public separatorWidth: number

    public lineThroughCondition: {y: number, x1: number, x2: number}
    public lineThroughConnector: {y: number, x1: number, x2: number}
    public lineThen: {x: number, y1: number, y2: number}
    public lineElse: {x: number; y1: number; y2: number}

    constructor(private elRef: ElementRef) {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        setTimeout(() => {
            const thenBlock = this.thenComponent.elRef.nativeElement.getBoundingClientRect()
            const elseBlock = this.elseComponent.elRef.nativeElement.getBoundingClientRect()
            const condBlock =
                this.conditionComponent.elementRef.nativeElement.getBoundingClientRect()
            const maxBlock = thenBlock.width > elseBlock.width ? thenBlock : elseBlock
            const minBlock = thenBlock.width < elseBlock.width ? thenBlock : elseBlock
            const middle = condBlock.left + condBlock.width / 2
            this.blockWidth = maxBlock.width

            const t = .5 * (maxBlock.width - condBlock.width)
            if (t < 0) {
                this.separatorWidth = -t
            } else {
                this.separatorWidth = 0
            }

            const thisRect = this.elRef.nativeElement.getBoundingClientRect()
            this.lineThroughCondition = {
                y: thisRect.top + condBlock.height / 2,
                x1: thenBlock.left + minBlock.width / 2 - this.separatorWidth / 2,
                x2: elseBlock.right - minBlock.width / 2 + this.separatorWidth / 2,
            }
            this.lineThroughConnector = {
                y: thisRect.bottom - 16 - 6,
                x1: thenBlock.left + minBlock.width / 2 - this.separatorWidth / 2,
                x2: elseBlock.right - minBlock.width / 2 + this.separatorWidth / 2,
            }
            this.lineThen = {
                x: middle - this.separatorWidth / 2 - maxBlock.width / 2 - 24,
                y1: thenBlock.top,
                y2: thenBlock.bottom,
            }
            this.lineElse = {
                x: middle + this.separatorWidth / 2 + maxBlock.width / 2 + 24,
                y1: elseBlock.top,
                y2: elseBlock.bottom,
            }
        })
    }

}
