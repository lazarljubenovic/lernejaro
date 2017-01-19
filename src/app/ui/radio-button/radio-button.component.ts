import {Component, OnInit, Input, Output, EventEmitter, Optional} from '@angular/core';
import {RadioButtonGroupComponent} from '../radio-button-group/radio-button-group.component';

@Component({
    selector: 'lrn-radio-button',
    templateUrl: './radio-button.component.html',
    styleUrls: ['./radio-button.component.scss']
})
export class RadioButtonComponent implements OnInit {

    @Input() public name: string;
    @Input() public value: string;
    @Input() public currentValue: string;
    @Output() public currentValueChange = new EventEmitter<string>();

    public radioButtonGroup: RadioButtonGroupComponent;

    public emitCurrentValueChange() {
        this.currentValueChange.emit(this.currentValue);
        if (this.radioButtonGroup) {
            this.radioButtonGroup.value = this.value;
        }
    }

    constructor(@Optional() radioButtonGroup: RadioButtonGroupComponent) {
        this.radioButtonGroup = radioButtonGroup;
    }

    ngOnInit() {
    }

}
