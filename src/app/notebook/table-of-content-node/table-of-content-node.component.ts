import {Component, OnInit, Input, ViewEncapsulation} from '@angular/core';
import {TreeNode} from '../tree/tree-node';

@Component({
    selector: '[lrnTableOfContentNode]',
    templateUrl: './table-of-content-node.component.html',
    styleUrls: ['./table-of-content-node.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class TableOfContentNodeComponent implements OnInit {

    @Input() node: TreeNode<string>;

    constructor() {
    }

    ngOnInit() {
    }

}
