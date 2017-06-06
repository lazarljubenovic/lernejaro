import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'lrn-latex-input-number',
    templateUrl: './latex-input-number.component.html',
    styleUrls: ['./latex-input-number.component.scss']
})
export class LatexInputNumberComponent implements OnInit {

    @Input() public value: number;
    @Output() public valueChange = new EventEmitter<number>();

    @Input() public name: number;
    @Input() public label: string;
    @Input() public decimals: number;

    constructor() {
    }

    ngOnInit() {
    }

}
