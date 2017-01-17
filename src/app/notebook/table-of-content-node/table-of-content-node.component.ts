import {Component, OnInit, Input, ViewEncapsulation} from '@angular/core';
import {TreeNodeTableOfContent} from '../table-of-content/table-of-content-tree-node.interface';

@Component({
    selector: '[lrnTableOfContentNode]',
    templateUrl: './table-of-content-node.component.html',
    styleUrls: ['./table-of-content-node.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class TableOfContentNodeComponent implements OnInit {

    @Input() node: TreeNodeTableOfContent;

    constructor() {
    }

    ngOnInit() {
    }

}
