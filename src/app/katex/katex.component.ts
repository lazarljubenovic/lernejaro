import {
    Component,
    OnInit,
    ViewEncapsulation,
    Input,
    ChangeDetectionStrategy,
    OnChanges, ViewChild, ElementRef, ContentChild, ContentChildren
} from '@angular/core';
import * as KaTeX from 'katex';

@Component({
    selector: 'lrn-katex',
    templateUrl: './katex.component.html',
    // styleUrls: ['./katex.component.scss'],
    // styleUrls: ['../node_modules/katex/dist/katex.css'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KatexComponent implements OnChanges {

    @Input() public math: string;
    @Input() public display: 'block' | 'inline' = 'inline';

    @ViewChild('result') public result: ElementRef;

    constructor() {
    }

    ngOnChanges() {
        const options: KaTeX.KatexOptions = {
            displayMode: this.display == 'block',
        };
        KaTeX.render(this.math, this.result.nativeElement, options);
    }

}
