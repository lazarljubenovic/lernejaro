import {Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit} from '@angular/core'
import {FlowchartConditionComponent} from '../flowchart-condition/flowchart-condition.component'
import {FlowchartArrow} from '../flowchart-arrow.interface'

@Component({
    selector: 'lrn-flowchart-while',
    templateUrl: './flowchart-while.component.html',
    styleUrls: ['./flowchart-while.component.scss'],
    // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlowchartWhileComponent implements OnInit, AfterViewInit {

    public margin: number = 24
    public noArrow: FlowchartArrow
    public yesArrow: FlowchartArrow

    @Input() public condition: string

    @ViewChild('block') public block: ElementRef
    @ViewChild('cond') public conditionComponent: FlowchartConditionComponent

    constructor(public thisBlock: ElementRef) {
    }

    ngOnInit() {

    }

    ngAfterViewInit() {
        setTimeout(() => {
            const blockWidth = this.block.nativeElement.getBoundingClientRect().width
            const conditionWidth = this.conditionComponent.elementRef
                .nativeElement.getBoundingClientRect().width
            const width = Math.max(blockWidth, conditionWidth)
            const topDistance = this.thisBlock.nativeElement.getBoundingClientRect().top
                + this.conditionComponent.elementRef.nativeElement
                    .getBoundingClientRect().height / 2
            const bottom = this.thisBlock.nativeElement.getBoundingClientRect().bottom
            this.noArrow = {
                begin: topDistance,
                end: bottom - 16, // 16 for next
                offset: width / 2 + this.margin,
            }
            this.yesArrow = {
                begin: bottom - 16 - 16 - 6, // next, next, half of a connector
                end: topDistance,
                offset: -width / 2 - this.margin,
            }
        })
    }

}
