import {Component, OnInit, Input, ChangeDetectionStrategy, OnChanges} from '@angular/core'

@Component({
    selector: 'lrn-flowchart-line',
    templateUrl: './flowchart-line.component.html',
    styleUrls: ['./flowchart-line.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlowchartLineComponent implements OnInit, OnChanges {

    @Input() x1: number
    @Input() y1: number
    @Input() x2: number
    @Input() y2: number

    constructor() {
    }

    ngOnInit() {
    }

    ngOnChanges() {
    }

}
