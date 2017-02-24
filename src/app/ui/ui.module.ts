import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputComponent} from './input/input.component';
import {FormsModule} from '@angular/forms';
import {GetColorNamePipe} from './get-color-name.pipe';
import {CardComponent} from './card/card.component';
import {ButtonComponent} from './button/button.component';
import {RadioButtonComponent} from './radio-button/radio-button.component';
import {OptionPickerComponent} from './option-picker/option-picker.component';
import {OptionComponent} from './option-picker/option/option.component';
import { RadioButtonGroupComponent } from './radio-button-group/radio-button-group.component';
import { ExpandingFabComponent } from './expanding-fab/expanding-fab.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
    ],
    declarations: [
        InputComponent,
        GetColorNamePipe,
        CardComponent,
        ButtonComponent,
        RadioButtonComponent,
        OptionPickerComponent,
        OptionComponent,
        RadioButtonGroupComponent,
        ExpandingFabComponent,
    ],
    exports: [
        InputComponent,
        GetColorNamePipe,
        CardComponent,
        ButtonComponent,
        OptionPickerComponent,
        OptionComponent,
        RadioButtonComponent,
        RadioButtonGroupComponent,
        ExpandingFabComponent,
    ],
})
export class UiModule {
}
