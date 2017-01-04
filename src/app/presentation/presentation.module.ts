import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SlideComponent} from './slide/slide.component';
import {PresentationComponent} from "./presentation.component";
import { SlideColumnComponent } from './slide-column/slide-column.component';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        PresentationComponent,
        SlideComponent,
        SlideColumnComponent,
    ],
    exports: [
        PresentationComponent,
        SlideComponent,
        SlideColumnComponent,
    ],
})
export class PresentationModule {
}
