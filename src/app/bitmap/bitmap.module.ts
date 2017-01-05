import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BitmapComponent} from './bitmap.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        BitmapComponent,
    ],
    exports: [
        BitmapComponent,
    ],
})
export class BitmapModule {
}
