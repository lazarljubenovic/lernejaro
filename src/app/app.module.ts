import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'
import {FormsModule} from '@angular/forms'
import {AppComponent} from './app.component'
import {MarkdownParserService} from './markdown/markdown-parser.service'
import {RouterModule, Routes} from '@angular/router'
import {UiModule} from './ui/ui.module'
import {PlanimetricsModule} from './planimetrics/planimetrics.module'
import {NotebookModule} from './notebook/notebook.module'
import {KatexModule} from './katex/katex.module'
import {QuizModule} from './quiz/quiz.module'
import {UniqueIdService} from './unique-id.service'
import {LayoutModule} from './layout/layout.module'
import {LoggerService} from './logger/logger.service'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {PresentationModule} from './presentation/presentation.module'
import {LoggerModule} from './logger/logger.module'

export const ROUTES: Routes = [
  {
    path: 'courses',
    children: [
      {
        path: 'lernejaro',
        loadChildren: './course-lernejaro/course-lernejaro.module#CourseLernejaroModule',
      },
    ],
  },
]

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    UiModule.forRoot({theme: 'light', color: 'yellow'}),
    PlanimetricsModule,
    NotebookModule,
    PresentationModule,
    KatexModule,
    QuizModule,
    LayoutModule,
    LoggerModule,
    RouterModule.forRoot(ROUTES),
    BrowserAnimationsModule,
  ],
  providers: [
    MarkdownParserService,
    UniqueIdService,
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule {
}
