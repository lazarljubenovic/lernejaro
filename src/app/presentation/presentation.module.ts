import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SlideComponent} from './slide/slide.component';
import {PresentationComponent} from './presentation.component';
import {SlideColumnComponent} from './slide-column/slide-column.component';
import {TitleSlideComponent} from './title-slide/title-slide.component';
import {KatexModule} from '../katex/katex.module';

@NgModule({
    imports: [
        CommonModule,
        KatexModule,
    ],
    declarations: [
        PresentationComponent,
        SlideComponent,
        SlideColumnComponent,
        TitleSlideComponent,
    ],
    exports: [
        PresentationComponent,
        SlideComponent,
        SlideColumnComponent,
    ],
})
export class PresentationModule {
}
