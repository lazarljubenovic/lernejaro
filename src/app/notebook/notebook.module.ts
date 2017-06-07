import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {NotebookComponent} from './notebook.component'
import {
    H1Directive,
    H6Directive,
    H5Directive,
    H4Directive,
    H3Directive,
    H2Directive
} from './directives/heading-directives'
import {UiModule} from '../ui/ui.module'
import {TableOfContentComponent} from './table-of-content/table-of-content.component'
import {TableOfContentNodeComponent} from './table-of-content-node/table-of-content-node.component'

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
        TableOfContentComponent,
        TableOfContentNodeComponent,
    ],
    exports: [
        NotebookComponent,
        H1Directive,
        H2Directive,
        H3Directive,
        H4Directive,
        H5Directive,
        H6Directive,
    ]
})
export class NotebookModule {
}
