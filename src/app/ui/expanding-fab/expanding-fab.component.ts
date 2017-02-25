import {Component, OnInit, Input} from '@angular/core';

@Component({
    selector: 'lrn-expanding-fab',
    templateUrl: './expanding-fab.component.html',
    styleUrls: ['./expanding-fab.component.scss'],
})
export class ExpandingFabComponent implements OnInit {

    @Input() public color: string = 'yellow';

    public isExpanded: boolean = false;

    public toggle() {
        this.isExpanded = !this.isExpanded;
    }

    constructor() {
    }

    ngOnInit() {
    }

}
