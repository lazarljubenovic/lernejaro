import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FitTextDirective} from './fit-text.directive';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        FitTextDirective,
    ],
    exports: [
        FitTextDirective,
    ],
})
export class FitTextModule {
}
