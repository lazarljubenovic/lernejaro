import {Component, OnInit, Input, EventEmitter, Output, HostBinding} from '@angular/core';

@Component({
    selector: 'lrn-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

    @Input() public label: string;
    @Input() public type: string;
    @Input() public value: any;
    @Output() public valueChange = new EventEmitter<any>();

    public focus: boolean = false;

    public onFocus() {
        this.focus = true;
    }

    public onBlur() {
        this.focus = false;
    }

    public onChange(newValue) {
        // TODO: Why do we need this?
        if (this.type == 'number') {
            newValue = Number.parseFloat(newValue);
        }
        this.value = newValue;
        this.valueChange.emit(newValue);
    }

    constructor() {
    }

    ngOnInit() {
    }

}
