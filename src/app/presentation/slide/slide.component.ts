import {
    Component,
    OnInit,
    ElementRef,
    ViewEncapsulation,
    Input, ContentChildren, QueryList
} from "@angular/core";
import {SlideColumnComponent} from "../slide-column/slide-column.component";

export interface ColumnOptions {
    verticalCenter?: boolean;
}

@Component({
    selector: 'lrn-slide',
    templateUrl: './slide.component.html',
    styleUrls: ['./slide.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class SlideComponent implements OnInit {

    @Input() public title: string = 'Untitled';
    @Input() public subtitle: string;

    @ContentChildren(SlideColumnComponent)
    public slideColumnComponents: QueryList<SlideColumnComponent>;

    constructor(public elementRef: ElementRef) {
    }

    ngOnInit() {
    }

}
