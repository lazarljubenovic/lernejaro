import {
    Component,
    OnInit,
    ViewEncapsulation,
    ContentChildren,
    QueryList,
    AfterContentInit
} from '@angular/core';
import {
    H1Directive,
    H2Directive,
    H3Directive,
    H4Directive,
    H5Directive,
    H6Directive,
    HDirective
} from './directives/heading-directives';

@Component({
    selector: 'lrn-notebook',
    templateUrl: './notebook.component.html',
    styleUrls: ['./notebook.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class NotebookComponent implements OnInit, AfterContentInit {

    @ContentChildren(H1Directive) public heading1: QueryList<H1Directive>;
    @ContentChildren(H2Directive) public heading2: QueryList<H2Directive>;
    @ContentChildren(H3Directive) public heading3: QueryList<H3Directive>;
    @ContentChildren(H4Directive) public heading4: QueryList<H4Directive>;
    @ContentChildren(H5Directive) public heading5: QueryList<H5Directive>;
    @ContentChildren(H6Directive) public heading6: QueryList<H6Directive>;

    public headings: HDirective[][];

    constructor() {
    }

    ngOnInit() {
    }

    ngAfterContentInit() {
        this.headings = [
            this.heading1, this.heading2, this.heading3, this.heading4, this.heading5, this.heading6]
            .map(queryList => queryList.toArray());
    }

}
