import {Component, OnInit, ElementRef} from '@angular/core';

@Component({
    selector: 'lrn-flowchart-condition',
    templateUrl: './flowchart-condition.component.html',
    styleUrls: ['./flowchart-condition.component.scss']
})
export class FlowchartConditionComponent implements OnInit {

    constructor(public elementRef: ElementRef) {
    }

    ngOnInit() {
    }

}
