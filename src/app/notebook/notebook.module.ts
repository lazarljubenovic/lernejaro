import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NotebookComponent} from './notebook.component';
import {
    H1Directive,
    H6Directive,
    H5Directive,
    H4Directive,
    H3Directive,
    H2Directive
} from './directives/heading-directives';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        NotebookComponent,
        H1Directive,
        H2Directive,
        H3Directive,
        H4Directive,
        H5Directive,
        H6Directive,
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
