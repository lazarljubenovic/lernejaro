import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputComponent} from './input/input.component';
import {FormsModule} from '@angular/forms';
import { GetColorNamePipe } from './get-color-name.pipe';
import { CardComponent } from './card/card.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
    ],
    declarations: [
        InputComponent,
        GetColorNamePipe,
        CardComponent,
    ],
    exports: [
        InputComponent,
        GetColorNamePipe,
        CardComponent,
    ],
})
export class UiModule {
}
