import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputComponent} from './input/input.component';
import {FormsModule} from '@angular/forms';
import { GetColorNamePipe } from './get-color-name.pipe';
import { CardComponent } from './card/card.component';
import { ButtonComponent } from './button/button.component';

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
    ],
    exports: [
        InputComponent,
        GetColorNamePipe,
        CardComponent,
        ButtonComponent,
    ],
})
export class UiModule {
}
