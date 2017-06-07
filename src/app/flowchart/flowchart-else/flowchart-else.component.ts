import {Component, OnInit, ElementRef} from '@angular/core'

@Component({
    selector: 'lrn-flowchart-else',
    templateUrl: './flowchart-else.component.html',
    styleUrls: ['./flowchart-else.component.scss']
})
export class FlowchartElseComponent implements OnInit {

    constructor(public elRef: ElementRef) {
    }

    ngOnInit() {
    }

}
