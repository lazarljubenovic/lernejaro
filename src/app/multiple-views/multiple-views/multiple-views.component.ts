import {AfterContentInit, Component, ContentChildren, OnInit, QueryList} from '@angular/core';
import {ViewComponent} from '../view/view.component';

@Component({
    selector: 'lrn-multiple-views',
    templateUrl: './multiple-views.component.html',
    styleUrls: ['./multiple-views.component.scss']
})
export class MultipleViewsComponent implements OnInit, AfterContentInit {

    @ContentChildren(ViewComponent)
    public views: QueryList<ViewComponent>;

    constructor() {
    }

    ngOnInit() {
    }

    ngAfterContentInit() {

    }

}
