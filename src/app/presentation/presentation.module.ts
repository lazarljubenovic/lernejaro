import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {SlideComponent} from './slide/slide.component'
import {PresentationComponent} from './presentation.component'
import {SlideColumnComponent} from './slide-column/slide-column.component'
import {TitleSlideComponent} from './title-slide/title-slide.component'
import {KatexModule} from '../katex/katex.module'
import {FitTextModule} from '../fit-text/fit-text.module'
import {UiModule} from '../ui/ui.module'
import {RouterModule} from '@angular/router'
import {QuestionsSlideComponent} from './questions-slide/questions-slide.component'
import {ThankYouSlideComponent} from './thank-you-slide/thank-you-slide.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    KatexModule,
    FitTextModule,
    UiModule,
  ],
  declarations: [
    PresentationComponent,
    SlideComponent,
    SlideColumnComponent,
    TitleSlideComponent,
    QuestionsSlideComponent,
    ThankYouSlideComponent,
  ],
  exports: [
    PresentationComponent,
    SlideComponent,
    SlideColumnComponent,
  ],
  entryComponents: [
    TitleSlideComponent,
  ],
})
export class PresentationModule {
}
