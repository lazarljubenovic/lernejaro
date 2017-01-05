import {Component, OnInit, ViewEncapsulation, Input, OnChanges, HostBinding} from '@angular/core';

@Component({
    selector: 'lrn-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class TableComponent implements OnInit, OnChanges {

    @Input() public hAlign: string = 'center';
    @Input() public dAlign: string = 'center';

    constructor() {
    }

    ngOnInit() {
    }

    ngOnChanges() {

    }

}
