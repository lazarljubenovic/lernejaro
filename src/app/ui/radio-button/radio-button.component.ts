import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'lrn-radio-button',
    templateUrl: './radio-button.component.html',
    styleUrls: ['./radio-button.component.scss']
})
export class RadioButtonComponent implements OnInit {

    @Input() public label: string;

    @Input() public name: string;

    @Input() public value: string;

    @Output() public currentValueChange = new EventEmitter<void>();

    @Input() public currentValue: string;

    constructor() {
    }

    ngOnInit() {
    }

}
