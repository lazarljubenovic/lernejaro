import {Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit} from '@angular/core'
import {FlowchartArrow} from '../flowchart-arrow.interface'
import {FlowchartConditionComponent} from '../flowchart-condition/flowchart-condition.component'

@Component({
    selector: 'lrn-flowchart-repeat',
    templateUrl: './flowchart-repeat.component.html',
    styleUrls: ['./flowchart-repeat.component.scss']
})
export class FlowchartRepeatComponent implements OnInit, AfterViewInit {

    public margin: number = 24
    public noArrow: FlowchartArrow

    @Input() public condition: string

    @ViewChild('block') public block: ElementRef
    @ViewChild('cond') public conditionComponent: FlowchartConditionComponent

    constructor(public thisBlock: ElementRef) {
    }

    ngOnInit() {

    }

    ngAfterViewInit() {
        const blockWidth = this.block.nativeElement.getBoundingClientRect().width
        const condition = this.conditionComponent.elementRef.nativeElement.getBoundingClientRect()
        const width = Math.max(blockWidth, condition.width)
        const topDistance =
            this.thisBlock.nativeElement.getBoundingClientRect().top + 6 // half of a connector
        const bottom =
            this.thisBlock.nativeElement.getBoundingClientRect().bottom
            - condition.height / 2 - 16 // 16 for next
        this.noArrow = {
            begin: topDistance,
            end: bottom,
            offset: -width / 2 - this.margin,
        }
    }

}
