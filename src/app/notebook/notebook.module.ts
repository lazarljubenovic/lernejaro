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
  H6Directive
} from './directives/heading-directives'
import {UiModule} from '../ui/ui.module'
import {TableOfContentComponent} from './table-of-content/table-of-content.component'
import {TableOfContentNodeComponent} from './table-of-content-node/table-of-content-node.component'
import {DigressionComponent} from './digression/digression.component'

@NgModule({
  imports: [
    CommonModule,
    UiModule,
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
})
export class NotebookModule {
}
