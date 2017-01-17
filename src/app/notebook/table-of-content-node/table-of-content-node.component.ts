import {Component, OnInit, Input} from '@angular/core';
import {TreeNode} from '../tree/tree-node';

@Component({
    selector: 'lrn-table-of-content-node',
    templateUrl: './table-of-content-node.component.html',
    styleUrls: ['./table-of-content-node.component.scss']
})
export class TableOfContentNodeComponent implements OnInit {

    @Input() node: TreeNode<string>;

    constructor() {
    }

    ngOnInit() {
    }

}
