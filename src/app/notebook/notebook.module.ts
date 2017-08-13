import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {NotebookComponent} from './notebook.component'
import {
  AnchorDirective,
  H1Directive,
  H2Directive,
  H3Directive,
  H4Directive,
  H5Directive,
  H6Directive,
} from './directives/heading-directives'
import {UiModule} from '../ui/ui.module'
import {TableOfContentComponent} from './table-of-content/table-of-content.component'
import {TableOfContentNodeComponent} from './table-of-content-node/table-of-content-node.component'
import {DigressionComponent} from './digression/digression.component'
import {MissingTitleComponent} from './errors/missing-title.component'
import {MarkdownModule} from '../markdown/markdown.module'
import {LoggerModule} from '../logger/logger.module'
import {CodeModule} from '../code/code.module'
import {NotebookTitleWithoutContentErrorComponent} from './errors'

const errors = [
  NotebookTitleWithoutContentErrorComponent,
]

@NgModule({
  imports: [
    CommonModule,
    UiModule,
    MarkdownModule,
    LoggerModule,
    CodeModule,
  ],
  declarations: [
    NotebookComponent,
    H1Directive,
    H2Directive,
    H3Directive,
    H4Directive,
    H5Directive,
    H6Directive,
    AnchorDirective,
    TableOfContentComponent,
    TableOfContentNodeComponent,
    DigressionComponent,
    MissingTitleComponent,
    ...errors,
  ],
  exports: [
    NotebookComponent,
    H1Directive,
    H2Directive,
    H3Directive,
    H4Directive,
    H5Directive,
    H6Directive,
    AnchorDirective,
    DigressionComponent,
  ],
  entryComponents: [
    MissingTitleComponent,
    ...errors,
  ],
})
export class NotebookModule {
}
