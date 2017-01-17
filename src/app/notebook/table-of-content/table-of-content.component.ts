import {Component, OnInit, Input, ViewEncapsulation} from '@angular/core';
import {Tree} from '../tree/tree';

@Component({
    selector: 'lrn-table-of-content',
    templateUrl: './table-of-content.component.html',
    styleUrls: ['./table-of-content.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class TableOfContentComponent implements OnInit {

    @Input() public tree: Tree<string>;

    constructor() {
    }

    ngOnInit() {
    }

}
