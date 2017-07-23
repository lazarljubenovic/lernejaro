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
