import {Component, OnInit, Input, HostBinding} from '@angular/core'

@Component({
    selector: 'lrn-flowchart-next',
    templateUrl: './flowchart-next.component.html',
    styleUrls: ['./flowchart-next.component.scss']
})
export class FlowchartNextComponent implements OnInit {

    @HostBinding('class.invisible')
    @Input() public invisible: boolean

    constructor() {
    }

    ngOnInit() {
    }

}
