import {Component, OnInit, Input, Output, EventEmitter, Optional} from '@angular/core';
import {RadioButtonGroupComponent} from '../radio-button-group/radio-button-group.component';
import {UniqueIdService} from '../../unique-id.service';

@Component({
    selector: 'lrn-radio-button',
    templateUrl: './radio-button.component.html',
    styleUrls: ['./radio-button.component.scss']
})
export class RadioButtonComponent implements OnInit {

    private _value: string;

    @Input() public name: string;

    @Input()
    public set value(newValue: string) {
        this._value = newValue;
    };

    public get value(): string {
        return this._value;
    }

    @Input() public currentValue: string;
    @Output() public currentValueChange = new EventEmitter<string>();

    public radioButtonGroup: RadioButtonGroupComponent;

    public emitCurrentValueChange() {
        this.currentValueChange.emit(this.currentValue);
        if (this.radioButtonGroup) {
            this.radioButtonGroup.value = this.value;
        }
    }

    constructor(@Optional() radioButtonGroup: RadioButtonGroupComponent,
                private _uniqueIdService: UniqueIdService) {
        this.radioButtonGroup = radioButtonGroup;
    }

    ngOnInit() {
        // If no value is given, create unique
        if (this.value == null) {
            this.value = this._uniqueIdService.getUniqueId('radio-button-');
        }
    }

}
