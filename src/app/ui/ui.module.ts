import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputComponent} from './input/input.component';
import {FormsModule} from '@angular/forms';
import { GetColorNamePipe } from './get-color-name.pipe';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
    ],
    declarations: [
        InputComponent,
        GetColorNamePipe,
    ],
    exports: [
        InputComponent,
        GetColorNamePipe,
    ],
})
export class UiModule {
}
